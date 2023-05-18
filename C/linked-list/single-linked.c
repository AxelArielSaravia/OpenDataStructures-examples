/**
 * Author: Axel Ariel Saravia
 */

/*
    IMPORTANT

    the T type is the signed type

    slnode struct is {
        slnode* next;
        T value;
    }

    sllist struct is {
        slnode* head;
        size_t length;
        slnode* tail;
    }
*/

# include "single-linked.h"

sllist* sllist_push(sllist* l, T const x) {
    if (l) {
        slnode* n = malloc(sizeof(slnode));
        if (!n) {
            return 0;
        }
        *n = (slnode){
            .next = l->head,
            .value = x,
        };
        l->head = n;
        if (l->length == 0) {
            l->tail = n;
        }
        l->length += 1;
        return l;
    }
}

sllist* sllist_add(sllist l[static 1], T const x) {
    slnode* n = malloc(sizeof(slnode));
    if (!n) {
        return 0;
    }
    *n = (slnode){
        .next = 0,
        .value = x,
    };
    if (l->length == 0) {
        l->head = n;
    } else {
        l->tail->next = n;
    }
    l->tail = n;
    l->length += 1;

    return l;
}

T sllist_pop(sllist l[static 1]) {
    T res = 0;
    if (l->length != 0) {
        slnode* head = l->head;
        res = l->head->value;
        l->head = l->head->next;
        l->length -= 1;
        if (l->length == 0) {
            l->tail = 0;
        }
        free(head);
    }
    return res;
};

T sllist_remove(sllist l[static 1]) {
    return sllist_pop(l);
}

T sllist_removeFromTail(sllist l[static 1]) {
    T res = 0;
    if (l->length != 0) {
        res = l->tail->value;
        if (l->length == 1) {
            sllist_reset(l);
        } else {
            slnode* newTail = l->head;
            slnode* oldTail = l->tail;
            for (size_t i = 2, last = l->length; i < last; i += 1) {
                newTail = newTail->next;
            }
            newTail->next = 0;
            l->tail = newTail;
            l->length -= 1;

            free(oldTail);
        }
    }
    return res;
}

sllist* sllist_reset(sllist l[static 1]) {
    slnode* head = l->head;
    while (head) {
        slnode* x = head;
        head = head->next;
        free(x);
    }
    *l = (sllist){0};

    return l;
}