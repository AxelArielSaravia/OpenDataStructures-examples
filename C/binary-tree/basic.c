/**
 * Author: Axel Ariel Saravia
 */

#include "./basic.h"


unsigned binaryTree_depth(binaryNode node[static 1]) {
    unsigned d = 0;
    while (node) {
        node = node->parent;
        d += 1;
    }
    return d;
}

unsigned binaryTree_recursive_size(binaryNode* root) {
    return (
        !root
        ? 0
        : (
            1
            + binaryTree_recursive_size(root->left)
            + binaryTree_recursive_size(root->right)
        )
    );
}

unsigned binaryTree_recursive_height(binaryNode* root) {
    if (!root) {
        return 0;
    }
    unsigned a = 0;
    unsigned b = 0;
    return 1 + (
        a = binaryTree_recursive_height(root->left),
        b = binaryTree_recursive_height(root->right),
        a < b ? b : a
    );
}

// Based in the traverse function
unsigned binaryTree_size(binaryNode* root) {
    unsigned n = 0;
    binaryNode* u = root;
    binaryNode* prv = 0;
    binaryNode* nxt = 0;
    while (u) {
        if (prv == u->parent) {
    // Visit a node for the first time
            n += 1;
            nxt = (
                u->left
                ? u->left
                : ( u->right
                    ? u->right
                    : u->parent
                )
            );
        } else if (prv == u->left) {
            nxt = (
                u->right
                ? u->right
                : u->parent
            );
        } else {
            nxt = u->parent;
        }
        prv = u;
        u = nxt;
    }
    return n;
}

unsigned binaryTree_height(binaryNode* root) {
    unsigned n = 0;
    unsigned m = n;
    binaryNode* u = root;
    binaryNode* prv = 0;
    binaryNode* nxt = 0;
    while (u) {
        if (prv == u->parent) {
    // Visit a node for the first time
            m += 1;
            nxt = (
                u->left
                ? u->left
                : ( u->right
                    ? u->right
                    : u->parent
                )
            );
        } else if (prv == u->left) {
            m -= 1;
            nxt = (
                u->right
                ? u->right
                : u->parent
            );
        } else {
            m -= 1;
            nxt = u->parent;
        }
        if (n < m) {
            n = m;
        }
        prv = u;
        u = nxt;
    }
    return n;
}

/*
 Travesals Functions
 This function shows diferent algoritms to traverse a binary tree
*/

void recursive_travel(binaryNode* root) {
    if (!root) {
        return;
    }
    recursive_travel(root->left);
    recursive_travel(root->right);
}

//This traverse sometimes is called first-depth traverse
void traverse(binaryNode* root) {
    binaryNode* u = root;
    binaryNode* prv = 0;
    binaryNode* nxt = 0;
    while (u) {
        if (prv == u->parent) {
    // Visit a node for the first time
            nxt = (
                u->left
                ? u->left
                : ( u->right
                    ? u->right
                    : u->parent
                )
            );
        } else if (prv == u->left) {
            nxt = (
                u->right
                ? u->right
                : u->parent
            );
        } else {
            nxt = u->parent;
        }
        prv = u;
        u = nxt;
    }
}


binaryNode binaryNode_create(T v, binaryNode* const parent) {
    return (binaryNode){
        .parent = parent,
        .left = 0,
        .right = 0,
        .value = v,
    };
}

binaryNode* binaryNodep_create(T v, binaryNode* const parent) {
    binaryNode* res = malloc(sizeof(binaryNode));
    if (res) {
        *res = (binaryNode){
            .left = 0,
            .parent = parent,
            .right = 0,
            .value = v,
        };
    }
    return res;
}

void binaryNodep_free(binaryNode* root) {
    binaryNode* u = root;
    binaryNode* prv = 0;
    binaryNode* nxt = 0;
    while (u) {
        if (prv == u->parent) {
    // Visit a node for the first time
            nxt = (
                u->left
                ? u->left
                : ( u->right
                    ? u->right
                    : u->parent
                )
            );
        } else if (prv == u->left) {
            nxt = (
                u->right
                ? u->right
                : u->parent
            );
            free(prv);
            u->left = 0;
        } else {
            nxt = u->parent;
            free(prv);
        }
        prv = u;
        u = nxt;
    }
    if (root) {
        root->right = 0;
    }
}