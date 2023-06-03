/**
 * Author: Axel Ariel Saravia
 */

#ifndef LIST_SINGLE_LINKED_H
# define LIST_SINGLE_LINKED_H
# include <stdlib.h>

typedef signed T;

typedef struct slnode slnode;
typedef struct sllist sllist;

struct slnode {
    slnode* next;
    T value;
};

struct sllist {
    slnode* head;
    size_t length;
    slnode* tail;
};



/* 
 Add at the head of the list
 Return 0 if allocation fails
*/
sllist* sllist_add_head(sllist[static 1], T const);

/*
  Add at the tail of the list
 Return 0 if allocation fails
*/
sllist* sllist_add_tail(sllist[static 1], T const);

/*
 Remove the head of the list
 Return 0 if the lenght of sllist struct is 0
*/
T sllist_remove_head(sllist[static 1]);

/*
 Remove the tail of the list
 Return 0 if the lenght of sllist struct is 0
*/
T sllist_remove_tail(sllist[static 1]);

/*
 Free the memory and return a clean sllist struct ref
*/
sllist* sllist_reset(sllist[static 1]);

#endif