/**
 * Author: Axel Ariel Saravia
 */

# ifndef ARRAY_DEQUE_H
# define ARRAY_DEQUE_H
# include <stdbool.h>
# include <stdlib.h>

typedef signed T;

typedef struct deque deque;
struct deque {
    T* content;
    size_t capacity;
    size_t head;
    size_t length;
};

/*
 Return a empty deque struct if allocation of the content fails,
 otherwise deque struct
*/
deque deque_create();

/*
 Return the value in the size_t position if the position
 is minor than the deque length, otherwise 0
*/
T deque_get(deque const, size_t const);

/*
 Return the previous value in the size_t position if the position
 is minor than the deque length, otherwise 0
*/
T deque_set(deque[static 1], size_t const, T const);

/*
 Adds a T value at the size_t position, if the position is
 greater than deque length then add to the end
 Return the changed deque
*/
deque deque_add(deque, size_t const, T const);

/*
 Remove the value at the size_t position, if the position is
 greater than deque length then remove the last value
 Return the changed deque
*/
deque deque_remove(deque, size_t const);

/*
 Return the changed deque
*/
deque deque_resize(deque);

/*
 Free the content memory and clean the deque struct
*/
void deque_free(deque[static 1]);

# endif