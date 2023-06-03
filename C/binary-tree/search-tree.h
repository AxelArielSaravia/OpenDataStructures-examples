/**
 * Author: Axel Ariel Saravia
 */
#ifndef BINARY_SEARCH_TREE_H
# define BINARY_SEARCH_TREE_H
# include <stdlib.h>
# include <stdbool.h>
# include "./basic.c"

typedef signed T;

typedef struct binarySearchTree binarySearchTree;
struct binarySearchTree {
    binaryNode* root;
    size_t elements;
};

/*
 Retrun 0 if the value is not in the tree,
 otherwise the binaryNode that have the value
*/
binaryNode* binaryNode_find_eq(binaryNode*, T);

/*
 Return the node that have smallest value stored in the tree
 that is grater than or equal to the value passed, if that 
 node does not exist return 0
*/
binaryNode* binaryNode_find(binaryNode*, T);

/*
 Return false if the value exist in the tree or the allocation fails,
 otherwise true
*/
bool binarySearchTree_add(binarySearchTree bst[static 1], T);

/*
 Return the binarySearchTree ref passed.
 The arguments must not be null
*/
binarySearchTree* binarySearchTree_remove_node(
    binarySearchTree bst[static 1],
    binaryNode bn[static 1]
);

/*
 Return false if does not exist any node with that value,
 otherwise true
*/
bool binarySearchTree_remove(binarySearchTree bst[static 1], T);

/*
 Clean all the tree to reuse it
*/
binarySearchTree* binarySearchTree_clean(binarySearchTree bst[static 1]);

#endif