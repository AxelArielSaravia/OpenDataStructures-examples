/**
 * Author: Axel Ariel Saravia
 */

# include "./search-tree.h"

binaryNode* binaryNode_find_eq(binaryNode* bn, T v) {
    while (bn) {
        T y = bn->value;
        if (v < y) {
            bn = bn->left;
        } else if (v > y) {
            bn = bn->right;
        } else {
            return bn;
        }
    }
    return 0;
}

binaryNode* binaryNode_find(binaryNode* bn, T v) {
    binaryNode* z = 0;
    while (bn) {
        T y = bn->value;
        if (v < y) {
            z = bn;
            bn = bn->left;
        } else if (v > y) {
            bn = bn->right;
        } else {
            return bn;
        }
    }
    // z can be a null pointer
    return z;
}

bool binarySearchTree_add(binarySearchTree bst[static 1], T v) {
    binaryNode* p = 0;
    // find the node or a proper parent
    {
        binaryNode* w = bst->root;
        binaryNode* prev = 0;
        while (w) {
            T y = w->value;
            prev = w;
             if (v < y) {
                w = w->left;
            } else if (v > y) {
                w = w->right;
            } else {
    // We find the node, then is no need to insert it
                return false;
            }
        }
        p = prev;
    }
    // create a new node, and define p as his parent
    binaryNode* new_bn = binaryNodep_create(v, p);
    if (!new_bn) {
        return false;
    }
    if (!p) {
        bst->root = new_bn;
    } else {
        if (v < p->value) {
            p->left = new_bn;
        } else { //(v > p->value)
            p->right = new_bn;
        }
        // can not be (v == p->value) casue we return false before
    }
    bst->elements += 1;
    return true;
}


binarySearchTree* binarySearchTree_remove_node(
    binarySearchTree bst[static 1],
    binaryNode bn[static 1]
) {
    binaryNode* u = 0;
    if (bn->left && bn->right) {
    // search the node that have the closest value to the removed node value
    // switch values and remove that node instead
        binaryNode* w = bn->right;
        while (w->left) {
            w = w->left;
        }
        bn->value = w->value;
        u = w;
    } else {
        u = bn;
    }
    //Splice
    binaryNode* s = (
        u->left
        ? u->left
        : u->right
    );
    binaryNode* p = 0;
    if (u == bst->root) {
        bst->root = s;
    } else {
        p = u->parent;
        if (p->left == u) {
            p->left = s;
        } else {
            p->right = s;
        }
    }
    if (s) {
        s->parent = p;
    }

    free(u);

    bst->elements -= 1;
    return bst;
}

bool binarySearchTree_remove(binarySearchTree bst[static 1], T v) {
    binaryNode* bn = binaryNode_find_eq(bst->root, v);
    if (!bn) {
        return false;
    }
    binarySearchTree_remove_node(bst, bn);
    return true;
}

binarySearchTree* binarySearchTree_clean(binarySearchTree bst[static 1]) {
    binaryNodep_free(bst->root);
    free(bst->root);
    *bst = (binarySearchTree){0};
    return bst;
}