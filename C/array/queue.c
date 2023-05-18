/**
 * Author: Axel Ariel Saravia
 */

/*
    IMPORTANT

    the T type is the signed type

    queue struct is {
        T* content;
        size_t capacity;
        size_t length;
        size_t head;
    }
*/

# include "queue.h"

queue queue_create() {
    T* content = calloc(8, sizeof(T));
    return (
        !content
        ? (queue){0}
        : (queue) {
            .content = content,
            .capacity = 8,
            .head = 0,
            .length = 0,
        }
    );
}

size_t queue_size(queue const q) {
    return q.length;
}

T queue_get(queue const q) {
    return q.content[q.head];
}

queue queue_add(queue q, T const x) {
    if (q.length + 1 > q.capacity) {
        q = queue_resize(q);
    }
    size_t index = (q.head + q.length) % q.capacity;
    q.content[index] = x;
    q.length += 1;
    return q;
}

queue queue_remove(queue q) {
    T x = q.content[q.head];
    q.head = (q.head + 1) % q.capacity;
    q.length -= 1;

    if (8 < q.capacity && 3 * q.length <= q.capacity) {
        queue_resize(q);
    }

    return q;
}


queue queue_resize(queue q) {
    size_t const length = q.length;
    size_t const new_capacity = (
        8 < 2 * length
        ? 2 * length
        : 8
    );
    // this is never true when resize is called from add or remove methods
    if (new_capacity < length) {
        return q;
    }
    T* new_content = 0;
    size_t const old_capacity = q.capacity;
    size_t old_head = q.head;
    size_t new_head = old_head;
    if (old_capacity < new_capacity) {

        do {
            new_content = realloc(q.content, sizeof(T[new_capacity]));
        } while (!new_content);

        if (old_capacity < old_head + length) {
    // fstLength represents the first part of the q
    // that is in the bottom of the array
            size_t const fst_length = old_capacity - old_head;
    // lstLength represents the last part of the q
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
    // fstLength represent the first part of the q
    //that is in the bottom of the array
            fst_length = old_capacity - old_head;
            new_head = new_capacity - fst_length;
        } else {
            new_head = 0;
        }
        memmove(
            q.content + new_head,
            q.content + old_head,
            fst_length * sizeof(unsigned)
        );
         do {
            new_content = realloc(q.content, sizeof(T[new_capacity]));
        } while (!new_content);
    }
    q.content = new_content;
    q.capacity = new_capacity;
    q.head = new_head;
    return q;
}

void queue_free(queue pq[static 1]) {
    free(pq->content);
    *pq = (queue){0};
}