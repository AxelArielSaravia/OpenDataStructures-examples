/**
 * Author: Axel Ariel Saravia
 */
#ifndef BINARY_SEARCH_TREE_H
# define BINARY_SEARCH_TREE_H
# include <stdlib.h>
# include <stdbool.h>
# include "./basic.c"

typedef signed T;

typedef struct BinarySearchTree BinarySearchTree;
struct BinarySearchTree {
    BinaryNode* root;
    size_t elements;
};

/*
 Retrun 0 if the value is not in the tree,
 otherwise the BinaryNode that have the value
*/
BinaryNode* binaryNode_find_eq(BinaryNode*, T);

/*
 Return the node that have smallest value stored in the tree
 that is grater than or equal to the value passed, if that 
 node does not exist return 0
*/
BinaryNode* binaryNode_find(BinaryNode*, T);

/*
 Return false if the value exist in the tree or the allocation failse,
 otherwise true
*/
bool binarySearchTree_add(BinarySearchTree bst[static 1], T);

/*
 Return the BinarySearchTree ref passed.
 The arguments must not be null
*/
BinarySearchTree* binarySearchTree_remove_node(
    BinarySearchTree bst[static 1],
    BinaryNode bn[static 1]
);

/*
 Return false if does not exist any node with that value,
 otherwise return true
*/
bool binarySearchTree_remove(BinarySearchTree bst[static 1], T);

/*
 Clean all the tree to reuse it
*/
BinarySearchTree* binarySearchTree_clean(BinarySearchTree bst[static 1]);

#endif