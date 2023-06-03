/**
 * Author: Axel Ariel Saravia
 */

#ifndef BINARY_TREE_BASIC_H
# define BINARY_TREE_BASIC_H
# include <stdlib.h>

typedef signed T;

typedef struct binaryNode binaryNode;
struct binaryNode {
    binaryNode* left;
    binaryNode* parent;
    binaryNode* right;
    T value;
};

/*
 Return the leght of the path from a node to the root
*/
unsigned binaryTree_depth(binaryNode bn[static 1]);


unsigned binaryTree_recursive_size(binaryNode*);

/*
 Return the longest path from a node to one of its descendants
*/
unsigned binaryTree_recursive_height(binaryNode*);

unsigned binaryTree_size(binaryNode*);

unsigned binaryTree_height(binaryNode*);


binaryNode binaryNode_create(T, binaryNode* const);

/*
 Return 0 if allocation fails, otherwise a binaryNode ref
*/
binaryNode* binaryNodep_create(T, binaryNode* const);


void binaryNodep_free(binaryNode*);

#endif