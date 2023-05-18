/**
 * Author: Axel Ariel Saravia
 */

#ifndef ARRAY_STACK_H
# define ARRAY_STACK_H
# include <stdbool.h>
# include <stdlib.h>

typedef signed T;

typedef struct stack stack;
struct stack {
    size_t capacity;
    size_t length;
    T* content;
};

/*
 Return a empty stack struct if allocation of the content fails,
 otherwise stack struct
*/
stack stack_create();

/*
 Return the value in the size_t position if the position
 is minor than the stack length, otherwise 0
*/
T stack_get(stack const, size_t const);

/*
 Return the previous value in the size_t position if the position
 is minor than the stack length, otherwise 0
*/
T stack_set(stack[static 1], size_t const, T const);

/*
 Adds a T value at the size_t position, if the position is
 greater than stack length then add to the end of the stack
 Return the changed stack
*/
stack stack_add(stack, size_t, T const);

/*
 Remove the value at the size_t position, if the position is
 greater than stack length then remove the last value
 Return the changed stack
*/
stack stack_remove(stack, size_t);

/*
 Return the changed stack
*/
stack stack_resize(stack);

/*
 Ponter implementation of stack_add
*/
void stackRef_add(stack[static 1], size_t const, T const);

/*
 Pointer implementation of stack_remove
*/
void stackRef_remove(stack[static 1], size_t);

/*
 Free the content memory and clean the stack struct
*/
void stack_free(stack[static 1]);

#endif
