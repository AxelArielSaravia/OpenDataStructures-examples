/**
 * Author: Axel Ariel Saravia
 */

# include "list.h"

skiplinkL* skiplinkL_create(T const value, size_t const height) {
    skiplinkL* link = malloc(sizeof(skiplinkL));
    signed* length = calloc(height + 1, sizeof(signed));
    skiplinkL** next = calloc(height + 1, sizeof(skiplinkL*));

    if (!link || !length || !next) {
        return 0;
    }
    *link = (skiplinkL){
        .height = height,
        .length = length,
        .next = next,
        .value = value,
    };
    return link;
}

skiplistList* skiplistList_int(skiplistList list[static 1]) {
    skiplinkL* sentinel = skiplinkL_create(0, MAX_HEIGHT);
    if (!sentinel) {
        return 0;
    }
    *list = (skiplistList){
        .height = 0,
        .length = 0,
        .sentinel = sentinel,
    };
    return list;
}

skiplinkL* skiplistList_get_node(skiplistList list[static 1], size_t const i) {
    if (list->length <= i) {
        return list->sentinel;
    }
    skiplinkL* node = list->sentinel;
    signed r = list->height;
    signed j = -1;
    while (r >= 0) {
        while (node->next[r] && j + node->length[r] < i) {
            j += node->length[r];
            node = node->next[r];
        }
        r -= 1;
    }
    return node->next[0];
}

T skiplistList_get(skiplistList list[static 1], size_t const i) {
    return skiplistList_get_node(list, i)->value;
}

T skiplistList_set(skiplistList list[static 1], size_t const i, T const value) {
    skiplinkL* node = skiplistList_get_node(list, i);
    T const y = node->value;
    if (node != list->sentinel) {
        node->value = value;
    }
    return y;
}

size_t skiplistList_pick_height(void) {
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

skiplistList* skiplistList_add(
    skiplistList list[static 1],
    size_t i,
    T const value
) {
    if (list->length < i) {
        i = list->length;
    }
    size_t const new_node_height = skiplistList_pick_height();
    skiplinkL* const new_node = skiplinkL_create(value, new_node_height);
    if (!new_node) {
        return 0;
    }
    if (list->height < new_node_height) {
        list->height = new_node_height;
    }
    skiplinkL* node = list->sentinel;
    signed r = list->height;
    signed j = -1;
    while (r >= 0) {
        while (node->next[r] && j + node->length[r] < i) {
            j += node->length[r];
            node = node->next[r];
        }
        node->length[r] += 1;
        if (r <= new_node_height) {
            new_node->next[r] =  node->next[r];
            node->next[r] = new_node;
            new_node->length[r] = node->length[r] - (i - j);
            node->length[r] = i - j;
        }
        r -= 1;
    }
    list->length += 1;
    return list;
}

T skiplistList_remove(skiplistList list[static 1], size_t i) {
    if (list->length == 0) {
        return 0;
    }
    if (list->length <= i) {
        i = list->length - 1;
    }
    skiplinkL* node = list->sentinel;
    signed r = list->height;
    signed j = -1;
    T value = 0;
    while (r >= 0) {
        while (node->next[r] && j + node->length[r] < i) {
            j += node->length[r];
            node = node->next[r];
        }
        node->length[r] -= 1;
        if (node->next[r] && j + node->length[r] + 1 == i) {
            value = node->next[r]->value;
            node->length[r] = node->length[r] + node->next[r]->length[r];
            node->next[r] = node->next[r]->next[r];
            if (node == list->sentinel && !node->next[r]) {
                list->height -= 1;
            }
        }
        r -= 1;
    }
    list->length -= 1;
    return value;
}

void skiplistList_free(skiplistList list[static 1]) {
    skiplinkL* node = list->sentinel;
    while (node) {
        skiplinkL* temp = node;
        node = node->next[0];
        free(temp->next);
        free(temp->length);
        free(temp);
    }
    *list = (skiplistList){0};
}