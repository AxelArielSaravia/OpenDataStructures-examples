/**
 * Author: Axel Ariel Saravia
 */

#ifndef SKIPLIST_SSET_H
# define SKIPLIST_SSET_H
# include <stdlib.h>
# include <stdbool.h>
# include <stdint.h>
# include <time.h>


typedef int32_t T;


# ifndef _MAX_HEIGHT_
#  define _MAX_HEIGHT_

unsigned const MAX_HEIGHT = sizeof(T) * 8U;

# endif

typedef struct skiplistSSet skiplistSSet;
typedef struct skiplinkSSet skiplinkSSet;

struct skiplistSSet {
    size_t height;
    size_t length;
    skiplinkSSet* sentinel;
    skiplinkSSet* stack[];
};

struct skiplinkSSet {
    size_t height;
    skiplinkSSet** next;
    T value;
};


/*
 Return 0 if the allocation of skiplinkSSet fails or the allocation
 of next failt, otherwise a skiplinkSSet ref
*/
skiplinkSSet* skiplinkSSet_create(T const, size_t const);

/*
 Return 0 if the skiplinkSSet_create return 0, otherwise a skiplistSSet ref
*/
skiplistSSet* skiplistSSet_init(skiplistSSet[static 1]);

size_t skiplistSSet_size(skiplistSSet[static 1]);

/*
 Return the value of that skiplinkSSet if find it, otherwise 0
*/
T skiplistSSet_find(skiplistSSet const[static 1], T const);

/*
 Return false if that skiplinkSSet doesnt exist, otherwise true
*/
bool skiplistSSet_remove(skiplistSSet[static 1], T const);

/*
 Return false if that skiplinkSSet allready exist
 or skiplinkSSet_create returns 0, otherwise true
*/
bool skiplistSSet_add(skiplistSSet[static 1], T const);

/*
 Free all memory, but not the sentinel, and clean the skiplistSSet struct
 You can reuse the struct, becose the sentinal is not free
*/
void skiplistSSet_reset(skiplistSSet[static 1]);


/*
 Free all memory, the  sentinel too, and clean the skiplistSSet struct
*/
void skiplistSSet_free(skiplistSSet[static 1]);

#endif