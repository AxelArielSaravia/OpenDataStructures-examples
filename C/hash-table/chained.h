/**
 * Author: Axel Ariel Saravia
 */

/**
 * This Chained Hash Table implements an Array of ArrayStacks
 * 
 * In this case an integer hash code is associated with
 * data item and is used in the hash table
 */


#ifndef HASHTABLE_CHAINED_H
# define HASHTABLE_CHAINED_H
# include <stdlib.h>
# include <stdbool.h>
# include <stdint.h>
# include <time.h>

# ifndef ARRAY_STACK_H
#  include "../array/stack.c"
# endif


typedef int32_t T;


# ifndef _WORD_
#  define _WORD_

uint32_t const WORD = 32;
uint32_t const MAX_N = UINT32_MAX;

# endif

typedef struct hashTableChained hashTableChained;

struct hashTableChained {
    size_t capacity;
    size_t length;
    size_t tword;
    stack* table;
    uint32_t rand_n;
};

/*
 Return 0 if allocation of table fails,
 otherwise hashTableChained struct
*/
hashTableChained* hashTableChained_init(hashTableChained htable[static 1]);

/*
 Return the hash code corresponds to value
*/
uint32_t hashTableChained_hash(hashTableChained const htable[static 1], T const value);

/*
 Internal function
 WARNING Must return 0 if the dllist_init return 0, but does not
*/
hashTableChained* hashTableChained_resize(hashTableChained htable[static 1]);

/*
 Return true if find the value in the hash table, otherwise false
*/
bool hashTableChained_find(hashTableChained const htable[static 1], T const value);

/*
 Return false if the value already exist, the allocation of dllist fails
 or the resize fails, otherwise true
*/
bool hashTableChained_add(hashTableChained htable[static 1], T const value);

/*
 Return false if the value does not exist, otherwise true
*/
bool hashTableChained_remove(hashTableChained htable[static 1], T const value);

/*
 Free all memory in dllist table
*/
void hashTableChained_freeTable(size_t const length, stack table[length]);

/*
 Free htable and made it unusable
*/
void hashTableChained_free(hashTableChained htable[static 1]);

#endif