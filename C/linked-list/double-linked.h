/**
 * Author: Axel Ariel Saravia
 */

#ifndef LIST_DOUBLE_LINKED_H
# define LIST_DOUBLE_LINKED_H
# include <stdlib.h>

typedef signed T;

typedef struct dnode dnode;
typedef struct dllist dllist;

struct dnode {
    dnode* next;
    dnode* prev;
    T value;
};

struct dllist {
    dnode* dummy;
    size_t length;
};

/*
 Return a empty dllist struct if allocation of dummy fails,
 otherwise dllist struct
*/
dllist dllist_create(void);

/*
 Return a 0 if allocation of dummy fails,
 otherwise dllist struct ref
*/
dllist* dllist_init(dllist[static 1]);

/*
 Return 0 if the length of dllist struct is 0
*/
T dllist_get(dllist[static 1], size_t);

/*
 Return 0 if the length of dllist struct is 0,
 otherwise the previous value in that position
*/
T dllist_set(dllist[static 1], size_t, T const);

/*
 Return 0 if the allocation of the new dnode struct fails,
 othewise the dllist strict ref
*/
dllist* dllist_add(dllist[static 1], size_t, T const);

/*
 Return 0 if the length of dllist struct is 0,
 othewise the previous value in that position
*/
T dllist_remove(dllist[static 1], size_t );

/*
 Free memory and clean the dllist struct
*/
void dllist_reset(dllist[static 1]);

/*
 Free all memory, and dummy and set dllist struct as unused
*/
void dllist_free(dllist[static 1]);


#endif