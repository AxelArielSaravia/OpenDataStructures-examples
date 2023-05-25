/**
 * Author: Axel Ariel Saravia
 */


#ifndef TREAP_H
# define TREAP_H
# include <stdlib.h>
# include <stdbool.h>
# include <time.h>

typedef signed T;

typedef struct TreapNode TreapNode;
struct TreapNode {
    TreapNode* left;
    TreapNode* right;
    TreapNode* parent;
    T value;
    unsigned priority;
};

typedef struct Treap Treap;
struct Treap {
    TreapNode* root;
    size_t elements;
};

/*
 Return 0 if allocation fails, otherwise a TreapNode ref
*/
TreapNode* treapNode_create(T, TreapNode* const);

/*
 Free all children from a TreapNode root
*/
void treapNode_free(TreapNode*);

/*
 Retrun 0 if the value is not in the tree,
 otherwise the TreapNode that have the value
*/
TreapNode* treap_find_eq(TreapNode*, T);

/*
 Return false if the value exist in the tree or the allocation fails,
 otherwise true
*/
bool treap_add(Treap [static 1], T);

/*
 Return false if does not exist any node with that value,
 otherwise true
*/
bool treap_remove(Treap [static 1], T);

/*
 Clean all the tree to reuse it
*/
Treap* treap_clean(Treap [static 1]);

#endif