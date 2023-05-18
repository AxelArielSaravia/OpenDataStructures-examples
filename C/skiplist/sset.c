/**
 * Author: Axel Ariel Saravia
 */

/*
    IMPORTANT

    the T type is the signed type

    skiplinkSSet struct is {
        size_t height;
        skiplinkSSet** next;
        T value;
    }

    skiplistSSet struct is {
        size_t height;
        size_t length;
        skiplinkSSet* sentinel;
        skiplinkSSet* stack[32];
    }
*/

# include "sset.h"

skiplinkSSet* skipLink_create(T const value, size_t const height) {
    skiplinkSSet* n = malloc(sizeof(skiplinkSSet));
    skiplinkSSet** next =  malloc(sizeof(skiplinkSSet*[height + 1]));
    if (!n || !next) {
        return 0;
    }
    *n = (skiplinkSSet){
        .height = height,
        .next = next,
        .value = value,
    };
    return n;
}

skiplistSSet* skiplistSSet_init(skiplistSSet list[static 1]) {
    skiplinkSSet* sentinel = skipLink_create(0, MAX_HEIGHT);
    if (!sentinel) {
        return 0;
    }
    *list = (skiplistSSet){
        .sentinel = sentinel,
    };
    return list;
}

skiplinkSSet* skiplistSSet_get_pred_node(skiplistSSet const list[static 1], T const value) {
    skiplinkSSet* node = list->sentinel;
    size_t r = list->height;
    while (r >= 0) {
        while (node->next[r] && node->next[r]->value < value) {
            node = node->next[r];
        }
        r -= 1;
    }
    return node;
}

size_t skiplistSSet_size(skiplistSSet list[static 1]) {
    return list->length;
}

T skiplistSSet_find(skiplistSSet const* list, T const value) {
    skiplinkSSet* node = skiplistSSet_get_pred_node(list, value);
    return (
        !node || !node->next[0]
        ? 0
        : node->next[0]->value
    );
}

bool skiplistSSet_remove(skiplistSSet list[static 1], T const value) {
    bool removed = false;
    skiplinkSSet* node = list->sentinel;
    skiplinkSSet* temp = {0};
    signed r = list->height;
    while (r >= 0) {
        while (node->next[r] && node->next[r]->value < value) {
            node = node->next[r];
        }
        if (node->next[r] && node->next[r]->value == value) {
            temp = node->next[r];
            removed = true;
            node->next[r] = node->next[r]->next[r];
            if (node == list->sentinel && !node->next[r]) {
                list->height -= 1;
            }
        }
        r -= 1;
    }
    if (removed) {
        list->length -= 1;
        free(temp->next);
        free(temp);
    }
    return removed;
}

size_t skiplistSSet_pick_height(void) {
    srand(time(0));
    size_t const z = rand();
    size_t k = 0;
    size_t m = 1;
    while (z & m) {
        k += 1;
        m <<= 1;
    }
    return k;
}

bool skiplistSSet_add(skiplistSSet list[static 1], T const value) {
    skiplinkSSet* node = list->sentinel;
    signed r = list->height;
    while (r >= 0) {
        while (node->next[r] && node->next[r]->value < value) {
            node = node->next[r];
        }
        if (node->next[r] && node->next[r]->value == value) {
           return false;
        }
        list->stack[r] = node;
        r -= 1;
    }

    size_t const height = skiplistSSet_pick_height();
    skiplinkSSet* new_node = skipLink_create(value, height);
    if (!new_node) {
        return false;
    }

    while (list->height < height) {
        list->height += 1;
        list->stack[list->height] = list->sentinel;
    }
    for (size_t i = 0; i <= height; i += 1) {
        new_node->next[i] = list->stack[i]->next[i];
        list->stack[i]->next[i] = new_node;
    }
    list->length += 1;
    return true;
}

void skiplistSSet_reset(skiplistSSet list[static 1]) {
    skiplinkSSet* node = list->sentinel->next[0];
    while (node) {
        skiplinkSSet* temp = node;
        node = node->next[0];
        free(temp->next);
        free(temp);
    }
    signed r = list->height;
    while (r >= 0) {
        list->sentinel->next[r] = 0;
        r -= 1;
    }
    list->height = 0;
    list->length = 0;
}

void skiplistSSet_free(skiplistSSet list[static 1]) {
    skiplinkSSet* node = list->sentinel;
    while (node) {
        skiplinkSSet* temp = node;
        node = node->next[0];
        free(temp->next);
        free(temp);
    }
    *list = (skiplistSSet){0};
}