/**
 * Author: Axel Ariel Saravia
 */

#ifndef ARRAY_QUEUE_CIRCULAR_H
# define ARRAY_QUEUE_CIRCULAR_H
# include <stdlib.h>

# ifndef struct(T)
#  define struct(T) typedef struct T T; struct T
# endif

typedef signed T;

struct (circularQueue) {
    T* content;
    size_t capacity;
    size_t length;
    size_t head;
};

/*
typedef struct circularQueue circularQueue;
struct circularQueue {
    T* content;
    size_t capacity;
    size_t length;
    size_t head;
};
*/

circularQueue circular_queue_init(size_t const capacity, T arr[capacity]);

unsigned circular_queue_remove(circularQueue[static 1]);

circularQueue* circular_queue_add(circularQueue[static 1], unsigned);

#endif