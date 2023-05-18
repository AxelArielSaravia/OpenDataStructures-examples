/**
 * Author: Axel Ariel Saravia
 */

/*
    IMPORTANT

    the T type is the signed type

    xornode struct is {
        xornode* nextprev;
        T value;
    }

    xorlist struct is {
        xornode* dummy;
        xornode* head;
        size_t length;
    }
*/

# include "xor-linked.h"

xorlist xorlist_create(void) {
    xornode* dummy =  malloc(sizeof(xornode));
    if (!dummy) {
        return (xorlist){0};
    }
    *dummy = (xornode){0};
    return (xorlist) {
        .dummy = dummy,
        .head = dummy,
        .length = 0,
    };
}

/*
    Define the CURR and NEXT xornodes
    Of that CURR and NEXT must never be 0 or a ref of 0
*/
void xorlist_get_pos(
    xorlist const list[static 1],
    size_t i,
    xornode* CURR[static 1],
    xornode* NEXT[static 1]
) {
    if (list->length && list->length < i) {
        i = (i - 1) %  list->length;
    }
    xornode* curr = list->dummy;
    xornode* next = list->head;
    xornode* temp = 0;
    if (i < list->length / 2) {
        do {
            temp = next;
            next = (xornode*)((uintptr_t)curr ^ (uintptr_t)next->nextprev);
            curr = temp;
            i -= 1;
        } while (i > 0);
    } else {
        size_t j = list->length - i;
        while (j > 0) {
            temp = curr;
            curr = (xornode*)((uintptr_t)next ^ (uintptr_t)curr->nextprev);
            next = temp;
            j -= 1;
        }
    }
    *CURR = curr;
    *NEXT = next;
}

xorlist* xorlist_add(xorlist list[static 1], size_t const i, T const value) {
    xornode* new_n = malloc(sizeof(xornode));
    if (!new_n) {
        return 0;
    }

    xornode* prev = 0;
    xornode* curr = 0;
    xorlist_get_pos(list, i, &prev, &curr);

    *new_n = (xornode){
        .value = value,
        .nextprev = (xornode*)((uintptr_t)curr ^ (uintptr_t)prev),
    };
    if (list->length == 0) {
        list->head = new_n;
    } else {
        uintptr_t prevprev = (uintptr_t)curr ^ (uintptr_t)prev->nextprev;
        uintptr_t currnext = (uintptr_t)prev ^ (uintptr_t)curr->nextprev;
        prev->nextprev = (xornode*)(prevprev ^ (uintptr_t)new_n);
        curr->nextprev = (xornode*)(currnext ^ (uintptr_t)new_n);
    }
    list->length += 1;
    return list;
}

T xorlist_remove(xorlist list[static 1], size_t i) {
    T res = 0;
    if (list->length == 0) {
        return res;
    }
    if (list->length == 1) {
        res = list->head->value;
        free(list->head);
        list->head = list->dummy;
    } else {
        xornode* curr = 0;
        xornode* next = 0;
        xorlist_get_pos(list, i, &curr, &next);
        xornode* prev = (xornode*)((uintptr_t)next ^ (uintptr_t)curr->nextprev);
        res = curr->value;
        next->nextprev = (xornode*)(
            //next_next ^ prev
            ((uintptr_t)curr ^ (uintptr_t)next->nextprev) ^ (uintptr_t)prev
        );
        prev->nextprev = (xornode*)(
            //prev_prev ^ next
            ((uintptr_t)curr ^ (uintptr_t)prev->nextprev) ^ (uintptr_t)next
        );
        free(curr);
    }
    list->length -= 1;
    return res;
}

void xorlist_reset(xorlist list[static 1]) {
    xornode* next = list->head;
    xornode* prev = (xornode*)((uintptr_t)next ^ (uintptr_t)list->dummy->nextprev);
    xornode* prev_next = list->dummy;
    xornode* next_prev = prev_next;
    while (next != prev) {
        xorlist* nextnext = (xornode*)(
            (uintptr_t)prev_next ^ (uintptr_t)next->nextprev
        );
        if (nextnext == prev) {
            free(next);
            free(prev);
            next = prev = 0;
        } else {
            xorlist* prevprev = (xornode*)(
                (uintptr_t)next_prev ^ (uintptr_t)prev->nextprev
            );
            prev_next = next;
            next_prev = prev;
            free(next);
            free(prev);
            next = nextnext;
            prev = prevprev;
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
    *(list->dummy) = (xornode){0};
}