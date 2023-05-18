/**
 * Author: Axel Ariel Saravia
 */

/*
    IMPORTANT

    the T type is the signed type

    deque struct is {
        T* content;
        size_t capacity;
        size_t head;
        size_t length;
    }
*/

# include "deque.h"

deque deque_create() {
    T* content = calloc(8, sizeof(T));
    return (
        !content
        ? (deque){0}
        : (deque){
            .content = content,
            .capacity = 8,
            .head = 0,
            .length = 0,
        }
    );
}

T deque_get(deque const dq, size_t const i) {
    if (i < dq.length) {
        size_t const idx = (i + dq.head) % dq.capacity;
        return dq.content[idx];
    }
    return 0;
}

T deque_set(deque dq[static 1], size_t const i, T const x) {
    if (i < dq->length) {
        size_t const idx = (i + dq->head) % dq->capacity; 
        T const y = dq->content[idx];
        dq->content[idx] = x;
        return y;
    }
    return 0;
}

deque deque_add(deque dq, size_t i, T const x) {
    size_t z1 = 0;
    size_t z2 = 0;
    if (dq.length < i) {
        i = dq.length;
    }
    if (dq.length == dq.capacity) {
        dq = deque_resize(dq);
    }
    if (i < dq.length / 2) {
        dq.head = (dq.head - 1) % dq.capacity;
        for (size_t k = 0; k < i; k += 1) {
            z1 = (dq.head + k) % dq.capacity;
            z2 = (dq.head + k + 1) % dq.capacity; 
            dq.content[z1] = dq.content[z2];
        }
    } else {
        for (size_t k = dq.length; k >= i + 1; k -= 1) {
            z1 = (dq.head + k) % dq.capacity;
            z2 = (dq.head + k - 1) % dq.capacity; 
            dq.content[z1] = dq.content[z2];
        }
    }
    z1 = (dq.head + i) % dq.capacity;
    dq.content[z1] = x;
    dq.length += 1;
    return dq;
}

deque deque_remove(deque dq, size_t i) {
    size_t z1 = (dq.head + i) % dq.capacity;
    size_t z2 = 0;
    if (dq.length <= i) {
        i = dq.length - i;
    }
    if (i < dq.length / 2) {
        for (size_t k = i; k; k -= 1) {
            z1 = (dq.head + k) % dq.capacity;
            z2 = (dq.head + k - 1) % dq.capacity; 
            dq.content[z1] = dq.content[z2];
        }
        dq.head = (dq.head + 1) % dq.capacity;
    } else {
        for (size_t k = i; k < dq.length - 1; k += 1) {
            z1 = (dq.head + k) % dq.capacity;
            z2 = (dq.head + k + 1) % dq.capacity; 
            dq.content[z1] = dq.content[z2];
        }
    }
    dq.length -= 1;

    if (8 < dq.capacity && 3 * dq.length <= dq.capacity) {
        dq = deque_resize(dq);
    }
    return dq;
}

deque deque_resize(deque dq) {
    size_t const length = dq.length;
    size_t const new_capacity = (
        8 < 2 * length
        ? 2 * length
        : 8
    );
    // this is never true when resize is called from add or remove methods
    if (new_capacity < length) {
        return dq;
    }
    T* new_content = 0;
    size_t const old_capacity = dq.capacity;
    size_t old_head = dq.head;
    size_t new_head = old_head;
    if (old_capacity < new_capacity) {

        do {
            new_content = realloc(dq.content, sizeof(T[new_capacity]));
        } while (!new_content);

        if (old_capacity < old_head + length) {
    // fstLength represents the first part of the dq
    // that is in the bottom of the array
            size_t const fst_length = old_capacity - old_head;
    // lstLength represents the last part of the dq
    // that is in the top of the array
            size_t const lst_length = length - fst_length;
            if (lst_length <= (new_capacity - old_capacity)) {
    // copy the values from the top of the array in to the bottom
                memcpy(
                    new_content + old_capacity,
                    new_content,
                    lst_length * sizeof(unsigned)
                );
            } else {
    // copy the values from the bottom of the array in to the top
                new_head = new_capacity - fst_length;
                memmove(
                    new_content + new_head,
                    new_content + old_head,
                    fst_length * sizeof(unsigned)
                );
            } 
        }
    // never can be newCapacity === oldCapacity
    } else {
        size_t fst_length = length;
        if (old_capacity < old_head + length) {
    // we must copy the bottom values at the end of the new array.
    // fstLength represent the first part of the dq
    //that is in the bottom of the array
            fst_length = old_capacity - old_head;
            new_head = new_capacity - fst_length;
        } else {
            new_head = 0;
        }
        memmove(
            dq.content + new_head,
            dq.content + old_head,
            fst_length * sizeof(unsigned)
        );
         do {
            new_content = realloc(dq.content, sizeof(T[new_capacity]));
        } while (!new_content);
    }
    dq.content = new_content;
    dq.capacity = new_capacity;
    dq.head = new_head;
    return dq;
}

void deque_free(deque* dq) {
    free(dq->content);
    *dq = (deque){0};
}