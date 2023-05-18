/**
 * Author: Axel Ariel Saravia
 */

# include "chained.h"

hashTableChained* hashTableChained_init(hashTableChained htable[static 1]) {
    stack* table = calloc(8, sizeof(*table));
    if (!table) {
        return 0;
    }

    srand(time(0));
    uint32_t r = rand();
    if (!(r & 1)) {
        r += 1;
    }
    *htable = (hashTableChained) {
        .capacity = 8,
        .length = 0,
        .rand_n = r,
        .table = table,
        .tword = 3,
    };
    return htable;
}

uint32_t hashTableChained_hash(hashTableChained const htable[static 1], T const value) {
    return (
        (uint32_t)(htable->rand_n * value) >> (WORD - htable->tword)
    );
}

hashTableChained* hashTableChained_resize(hashTableChained htable[static 1]) {
    if (htable->length == htable->capacity) {
        htable->tword += 1;
    } else {
        htable->tword -= 1;
    }
    uint32_t new_capacity = 1U << htable->tword; // pow(2, htable->tword)

    stack* new_table = calloc(new_capacity, sizeof(*new_table));
    if (!new_table) {
        return 0;
    }

    //copy values
    for (size_t k = 0; k < htable->capacity; k += 1) {
        stack list = htable->table[k];
        if (list.content) {
            for (size_t j = 0; j < list.length; j += 1) {
                T list_val = list.content[j];
                uint32_t hash = hashTableChained_hash(htable, list_val);
                stack list = new_table[hash];
                if (!list.content) {
                    list = stack_create();
                    //we need to see if allocation succeed
                    if (!list.content) {
                        return 0;
                    }
                }
                new_table[hash] = stack_add(list, list.length, list_val);
            }
        }
    }
    //free prev table
    hashTableChained_freeTable(htable->capacity, htable->table);

    htable->table = new_table;
    htable->capacity = new_capacity;
    return htable;
}

bool hashTableChained_find(hashTableChained const htable[static 1], T const value) {
    uint32_t hash = hashTableChained_hash(htable, value);
    stack list = htable->table[hash];
    if (!list.content) {
        return false;
    }
    for (size_t y = 0; y < list.length; y += 1) {
        T list_val = list.content[y];
        if (list_val == value) {
            return true;
        }
    }
    return false;
}

bool hashTableChained_add(hashTableChained htable[static 1], T const value) {
    if (hashTableChained_find(htable, value)) {
        return false;
    }
    if (htable->capacity < htable->length + 1) {
        hashTableChained* p = hashTableChained_resize(htable);
        if (!p) {
            return false;
        }
    }
    uint32_t hash = hashTableChained_hash(htable, value);
    stack list = htable->table[hash];
    if (!list.content) {
        list = stack_create();
        if (!list.content) { 
            //allocation fails
            return false;
        }
    }
    htable->table[hash] = stack_add(list, list.length, value);
    htable->length += 1;
    return true;
}

bool hashTableChained_remove(hashTableChained htable[static 1], T const value) {
    uint32_t hash = hashTableChained_hash(htable, value);
    stack list = htable->table[hash];
    if (list.content && list.length > 0) {
        for (size_t y = 0; y < list.length; y += 1) {
            T list_val = list.content[y];
            if (list_val == value) {
                htable->table[hash] = stack_remove(list, y);
                htable->length -= 1;
                if (8 < htable->capacity
                    && (3 * htable->length) < htable->capacity
                ) {
                    //if the allocation fails do not care for now
                    hashTableChained_resize(htable);
                }
                return true;
            }
        }
    }
    return false;
}

void hashTableChained_freeTable(size_t const length, stack table[length]) {
    for (size_t i = 0; i < length; i += 1) {
        if (table->content) {
            stack_free(&(table[i]));
        }
    }
    free(table);
}

void hashTableChained_free(hashTableChained htable[static 1]) {
    hashTableChained_freeTable(htable->capacity, htable->table);
    *htable = (hashTableChained){0};
}