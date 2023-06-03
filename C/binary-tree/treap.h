/**
 * Author: Axel Ariel Saravia
 */


#ifndef TREAP_H
# define TREAP_H
# include <stdlib.h>
# include <stdbool.h>
# include <time.h>

typedef signed T;

typedef struct treapNode treapNode;
struct treapNode {
    treapNode* left;
    treapNode* right;
    treapNode* parent;
    T value;
    unsigned priority;
};

typedef struct treap treap;
struct treap {
    treapNode* root;
    size_t elements;
};

/*
 Return 0 if allocation fails, otherwise a treapNode ref
*/
treapNode* treapNode_create(T, treapNode* const);

/*
 Free tree from a treapNode used as a root
*/
void treapNode_free(treapNode*);

/*
 Retrun 0 if the value is not in the tree,
 otherwise the treapNode ref that have the value
*/
treapNode* treap_find_eq(treapNode*, T);

/*
 Return false if the value exist in the tree or the allocation fails,
 otherwise true
*/
bool treap_add(treap [static 1], T);

/*
 Return false if does not exist any node with that value,
 otherwise true
*/
bool treap_remove(treap [static 1], T);

/*
 Clean all the tree to reuse it
*/
treap* treap_clean(treap [static 1]);

#endif