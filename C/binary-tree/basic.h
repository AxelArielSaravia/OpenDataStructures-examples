/**
 * Author: Axel Ariel Saravia
 */

#ifndef BINARY_TREE_BASIC_H
# define BINARY_TREE_BASIC_H
# include <stdlib.h>

typedef signed T;

typedef struct BinaryNode BinaryNode;
struct BinaryNode {
    BinaryNode* left;
    BinaryNode* parent;
    BinaryNode* right;
    T value;
};

/*
 Return the leght of the path from a node to the root
*/
unsigned binaryTree_depth(BinaryNode bn[static 1]);


unsigned binaryTree_recursive_size(BinaryNode*);

/*
 Return the longest path from a node to one of its descendants
*/
unsigned binaryTree_recursive_height(BinaryNode*);

unsigned binaryTree_size(BinaryNode*);

unsigned binaryTree_height(BinaryNode*);


BinaryNode binaryNode_create(T, BinaryNode* const);

/*
 Return 0 if allocation fails, otherwise a BinaryNode ref
*/
BinaryNode* binaryNodep_create(T, BinaryNode* const);


void binaryNodep_free(BinaryNode*);

#endif