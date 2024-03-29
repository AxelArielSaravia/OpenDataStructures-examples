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
T stack_get(stack const s, size_t const index);

/*
 Return the previous value in the size_t position if the position
 is minor than the stack length, otherwise 0
*/
T stack_set(stack s[static 1], size_t const index, T const value);

/*
 Adds a T value at the size_t position, if the position is
 greater than stack length then add to the end of the stack
 Return the changed stack
*/
stack stack_add(stack s, size_t index, T const value);

/*
 Remove the value at the size_t position, if the position is
 greater than stack length then remove the last value
 Return the changed stack
*/
stack stack_remove(stack s, size_t index);

/*
 Return the changed stack
*/
stack stack_resize(stack s);

/*
 Ponter implementation of stack_add
*/
void stackRef_add(stack s[static 1], size_t const index, T const value);

/*
 Pointer implementation of stack_remove
*/
void stackRef_remove(stack s[static 1], size_t index);

/*
 Free the content memory and clean the stack struct
*/
void stack_free(stack s[static 1]);

#endif
