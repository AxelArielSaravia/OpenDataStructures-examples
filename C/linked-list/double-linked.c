/**
 * Author: Axel Ariel Saravia
 */

/*
    IMPORTANT

    the T type is the signed type

    dnode struct is {
        dnode* next;
        T value;
        dnode* prev;
    }

    dllist struct is {
        dnode* dummy;
        size_t length;
    }
*/


# include "double-linked.h"

dllist dllist_create(void) {
    dnode* dummy = malloc(sizeof(dnode));
    if (!dummy) {
        return (dllist){0};
    }
    *dummy = (dnode){
        .next = dummy,
        .prev = dummy,
        .value = 0,
    };
    dummy->next = dummy;
    dummy->prev = dummy;
    return (dllist){
        .dummy = dummy,
        .length = 0,
    };
}

dllist* dllist_init(dllist list[static 1]) {
    dnode* dummy = malloc(sizeof(dnode));
    if (!dummy) {
        return 0;
    }
    *dummy = (dnode){
        .next = dummy,
        .prev = dummy,
        .value = 0,
    };
    dummy->next = dummy;
    dummy->prev = dummy;
    *list = (dllist){
        .dummy = dummy,
        .length = 0,
    };
    return list;
}

dnode* dllist_get_node(dllist list[static 1], size_t i) {
    dnode* n = list->dummy;
    if (list->length && list->length < i) {
        i = (i - 1) %  list->length;
    }
    if (i < list->length / 2) {
        n = n->next;
        while (i > 0) {
            n = n->next;
            i -= 1;
        }
    } else {
        size_t j = list->length - i;
        while (j > 0) {
            n = n->prev;
            j -= 1;
        }
    }
    return n;
}

signed dllist_get(dllist list[static 1], size_t i) {
    signed res = 0;
    if (list->length > 0) {
        dnode* n = dllist_get_node(list, i);
        res = n->value;
    }
    return res;
}

signed dllist_set(dllist list[static 1], size_t i, signed const x) {
    signed res = 0;
    if (list->length > 0) {
        dnode* n = dllist_get_node(list, i);
        res = n->value;
        n->value = x;
    }
    return res;
}

dllist* dllist_add(dllist list[static 1], size_t i, signed const x) {
    dnode* n = dllist_get_node(list, i);
    dnode* new_n = malloc(sizeof(dnode));
    if (!new_n) {
        return 0;
    }
    *new_n = (dnode){
        .value = x,
        .prev = n->prev,
        .next = n,
    };
    new_n->next->prev = new_n;
    new_n->prev->next = new_n;
    list->length += 1;
    return list;
}

signed dllist_remove(dllist list[static 1], size_t i) {
    signed res = 0;
    if (list->length > 0) {
        dnode* n = dllist_get_node(list, i);
        if (n) {
            res = n->value;
            n->prev->next = n->next;
            n->next->prev = n->prev;
            list->length -= 1;
            free(n);
        }
    }
    return res;
}

void dllist_reset(dllist list[static 1]) {
    if (list->dummy) {
        dnode* next = list->dummy->next;
        dnode* prev = list->dummy->prev;
        while (next != prev) { //this exclude when only exist the dummy node
            if (next->next == prev) {
                free(next);
                free(prev);
                next = prev = 0;
            } else {
                dnode* old_next = next;
                dnode* old_prev = prev;
                next = next->next;
                prev = prev->prev;
                free(old_next);
                free(old_prev);
                if (next == prev) {
                    free(next);
                    next = prev = 0;
                }
            }
        }
        if (list->length == 1) {
            free(next);
        }
        list->length = 0;
        list->dummy->next = list->dummy;
        list->dummy->prev = list->dummy;
    }
}

void dllist_free(dllist list[static 1]) {
    if (list->dummy) {
        dnode* next = list->dummy->next;
        dnode* prev = list->dummy->prev;
        while (next != prev) { //this exclude when only exist the dummy node
            if (next->next == prev) {
                free(next);
                free(prev);
                next = prev = 0;
            } else {
                dnode* old_next = next;
                dnode* old_prev = prev;
                next = next->next;
                prev = prev->prev;
                free(old_next);
                free(old_prev);
                if (next == prev) {
                    free(next);
                    next = prev = 0;
                }
            }
        }
        if (list->length == 1) {
            free(next);
        }
        free(list->dummy);
    }
}