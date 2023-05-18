/**
 * Author: Axel Ariel Saravia
 */

#ifndef QUEUE_H
# define QUEUE_H
# include <stdbool.h>
# include <stdlib.h>
# include <string.h>

typedef signed T;

typedef struct queue queue;
struct queue {
    T* content;
    size_t capacity;
    size_t length;
    size_t head;
};

/*
 Return a empty queue struct if allocation of the content fails,
 otherwise queue struct
*/
queue queue_create();

size_t queue_size(queue const);

/*
 Return the head value
*/
T queue_get(queue const);

/*
 Add at the tail
 Return the changed queue
*/
queue queue_add(queue, T const);

/*
 Remove the head
 Return the changed queue
*/
queue queue_remove(queue);

/*
 Return the changed queue
*/
queue queue_resize(queue);

void queue_free(queue[static 1]);

#endif