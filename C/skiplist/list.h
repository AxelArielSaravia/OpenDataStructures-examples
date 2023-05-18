/**
 * Author: Axel Ariel Saravia
 */

#ifndef SKIPLIST_LIST_H
# define SKIPLIST_LIST_H
# include <stdlib.h>
# include <stdbool.h>
# include <stdint.h>


typedef int32_t T;


# ifndef _MAX_HEIGHT_
#  define _MAX_HEIGHT_

unsigned const MAX_HEIGHT = sizeof(T) * 8U;

# endif

typedef struct skiplistList skiplistList;
typedef struct skiplinkL skiplinkL;

struct skiplistList {
    size_t height;
    size_t length;
    skiplinkL* sentinel;
};

struct skiplinkL {
    size_t height;
    signed* length;
    skiplinkL** next;
    T value;
};

/*
 Return 0 if the allocation of skiplinkL or length or next fails,
 otherwise a skiplinkSS ref
*/
skiplinkL* skiplinkL_create(T const, size_t const);


/*
 Return 0 if the skiplinkL_create return 0, otherwise a skiplistList ref
*/
skiplistList* skiplistList_int(skiplistList[static 1]);

/*
 Return sentinel if index out of range, otherwise the skiplinkL ref in that index
*/
skiplinkL* skiplistList_get_node(skiplistList[static 1], size_t const);

/*
 Return 0 (sentinel->value) if index out of range,
 otherwise the value of the skiplinkL in that position
*/
T skiplistList_get(skiplistList[static 1], size_t const);

/*
 Return 0 (sentinel->value) if index out of range,
 otherwise the previous value of the skiplinkL in that position
*/
T skiplistList_set(skiplistList[static 1], size_t const, T const);

/*
 Return 0 if skiplinkL_create returns 0, otherwise the skiplistList ref
*/
skiplistList* skiplistList_add(skiplistList[static 1], size_t, T const);

/*
 Return 0 if index is out of ranfe, otherwise the value of the removed skiplinkL
*/
T skiplistList_remove(skiplistList[static 1], size_t);

/*
 Free all memory, the skiplistList then is unuset 
*/
void skiplistList_free(skiplistList[static 1]);

#endif