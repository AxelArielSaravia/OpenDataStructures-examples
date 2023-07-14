/**
 * Author: Axel Ariel Saravia
 */

#ifndef DUAL_ARRAY_DEQUE_H
# define DUAL_ARRAY_DEQUE_H
# include <stdbool.h>
# include <stdlib.h>

# ifndef ARRAY_STACK_H
#   include "./stack.c"
# endif

typedef signed T;

typedef struct dualDeque dualDeque;
struct dualDeque {
    stack front;
    stack back;
};

/*
 Return a empty dualDeque struct if allocation of the front content
 or the back content fails, otherwise dualDeque struct
*/
dualDeque dual_deque_create();

size_t dual_deque_size(dualDeque const);

/*
 Return the value in the size_t position
*/
T dual_deque_get(dualDeque , size_t const);

/*
 Return the previous value in the size_t position
*/
T dual_deque_set(dualDeque[static 1], size_t const, T const);

/*
 Return the changed dualDeque
*/
dualDeque dual_deque_add(dualDeque, size_t const, T const);

/*
 Return the changed dualDeque
*/
dualDeque dual_deque_remove(dualDeque, size_t const);


/*
 Free the front content memory and  the back content memory. and clean the dualDeque struct
*/
void dual_deque_free(dualDeque[static 1]);

#endif
