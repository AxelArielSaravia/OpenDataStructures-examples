/**
 * Author: Axel Ariel Saravia
 */

/**
 * BlackRedTree Properties:
 * 
 * 1.[Black-height] There are the same number of black nodes on every root
 *   to leaf path (The sum of the colours on any root to leaf path is the same)
 * 
 * 2.[No-red-edge] No two red nodes are adjacent (For any node u, except the root, u.color + u.parent.color >= 1)
 * 
 * This version of RedBlackTree structure use the leaft-leaning property
 * 
 * 3.[Left-leaning] At any node u, if u.left is black then u.right is black
*/

#ifndef RED_BLACK_TREE_H
# define RED_BLACK_TREE_H
# include <stdlib.h>
# include <stdbool.h>

typedef signed T;

typedef enum colors colors;
enum colors {RED, BLACK};

typedef struct redBlackNode redBlackNode;
struct redBlackNode {
    redBlackNode* left;
    redBlackNode* right;
    redBlackNode* parent;
    colors color;
    T value;
};

typedef struct redBlackTree redBlackTree;
struct redBlackTree {
    redBlackNode* root;
    size_t elements;
};

/*
 Return 0 if allocation fails, otherwise a redBlackNode ref
*/
redBlackNode* redBlackNode_create(T const, redBlackNode* const);

/*
 Free tree from a redBlackNode used as a root
*/
void redBlackNode_free(redBlackNode*);

/*
 Return 0 if the value is not in the tree,
 otherwise the redBlackNode ref that have the value
*/
redBlackNode* redBlackNode_find_eq(redBlackNode*, T const);

/*
 Set the node to color RED and binary children to BLACK
*/
void redBlackTree_push_black(redBlackNode[static 1]);

/*
 Set the node to color BLACK and binary children to RED
*/
void redBlackTree_pull_black(redBlackNode[static 1]);

void redBlackTree_rotate_left(
    redBlackTree[static 1],
    redBlackNode[static 1]
);

void redBlackTree_rotate_right(
    redBlackTree[static 1],
    redBlackNode[static 1]
);

/*
 Swap colors between u and u.right
 and call redBlackTree_rotate_left
*/
void redBlackTree_flip_left(
    redBlackTree[static 1],
    redBlackNode[static 1]
);

/*
 Swap colors between u and u.left
 and call redBlackTree_rotate_right
*/
void redBlackTree_flip_right(
    redBlackTree[static 1],
    redBlackNode[static 1]
);

/*
 Return false if the value exist in the tree or allocation fails
 otherwise true
*/
bool redBlackTree_add(redBlackTree[static 1], T const);

/*
 Return false if the value doesnt exist in the tree
 otherwise true
*/
bool redBlackTree_remove(redBlackTree[static 1], T const);

/*
 Clean all the tree to reuse it
*/
redBlackTree* redBlackTree_clean(redBlackTree[static 1]);

#endif