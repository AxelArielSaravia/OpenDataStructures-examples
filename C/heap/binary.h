/**
 * Author: Axel Ariel Saravia
 */


#ifndef HEAP_BINARY_H
# define HEAP_BINARY_H

# include <stdlib.h>
# include <stdbool.h>

typedef signed T;
typedef struct tResult tResult;
struct tResult {
    char const* err;
    T res;
};

typedef struct binaryHeap binaryHeap;
/*
 struct {
    T content[cap];
    size_t cap;
    size_t len;
 };
*/

bool add(binaryHeap[static 1], T);

tResult remove(binaryHeap[static 1], size_t);

#endif
