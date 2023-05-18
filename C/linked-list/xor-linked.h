/**
 * Author: Axel Ariel Saravia
 */

#ifndef LIST_XOR_H
# define LIST_XOR_H
# include <stdlib.h>
# include <stdint.h>

typedef signed T;

typedef struct xornode xornode;
typedef struct xorlist xorlist;

struct xornode {
    /* reference of the xor difference between the next and the prev node */
    xornode* nextprev;
    T value;
};

struct xorlist {
    xornode* dummy;
    xornode* head;
    size_t length;
};

/*
 Return a empty xorlist struct if allocation of dummy fails,
 otherwise a xorlist struct
*/
xorlist xorlist_create(void);

/*
 Return 0 if the allocation of the new xornode struct fails,
 othewise the xorlist strict ref
*/
xorlist* xorlist_add(xorlist[static 1], size_t const, T const);

/*
 Return 0 if the length of xorlist struct is 0,
 othewise the previous value in that position
*/
T xorlist_remove(xorlist[static 1], size_t);


/*
 Free memory and clean the xorlist struct
*/
void xorlist_reset(xorlist[static 1]);

#endif