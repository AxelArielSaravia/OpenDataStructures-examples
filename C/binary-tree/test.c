/**
 * Author: Axel Ariel Saravia
 */

# include <assert.h>

# include "./search-tree.c"
# include "./treap.c"
# include "./red-black.c"

void binarySearchTreeTest(void);
void treapTest(void);
void redBlackTreeTest(void);

int main() {
    //binarySearchTreeTest();
    //treapTest();
    redBlackTreeTest();
    return 0;
}

void redBlackTreeTest(void) {
    redBlackTree rbt = {0};
    if (!redBlackTree_add(&rbt, 23)) return;
    assert(rbt.root);
    assert(rbt.elements == 1);
    assert(rbt.root->value == 23);
    assert(rbt.root->color == BLACK);
    assert(!rbt.root->left);
    assert(!rbt.root->right);

    //add existing element return false
    assert(!redBlackTree_add(&rbt, 23));

    if (!redBlackTree_add(&rbt, 2)) return;
    assert(rbt.elements == 2);
    assert(rbt.root->value == 23);
    assert(rbt.root->left->value == 2);
    assert(rbt.root->left->color == RED);

    if (!redBlackTree_add(&rbt, 9)) return;
    assert(rbt.elements == 3);
    assert(rbt.root->value == 9);
    assert(rbt.root->color == BLACK);
    assert(rbt.root->left->value == 2);
    assert(rbt.root->left->color == RED);
    assert(rbt.root->right->value == 23);
    assert(rbt.root->right->color == RED);

    if (!redBlackTree_add(&rbt, 34)) return;
    assert(rbt.elements == 4);
    assert(rbt.root->value == 9);
    assert(rbt.root->color == BLACK);
    assert(rbt.root->left->value == 2);
    assert(rbt.root->left->color == BLACK);
    assert(rbt.root->right->value == 34);
    assert(rbt.root->right->color == BLACK);
    assert(rbt.root->right->left->value == 23);
    assert(rbt.root->right->left->color == RED);

    if (!redBlackTree_add(&rbt, 1)) return;
    assert(rbt.elements == 5);
    assert(rbt.root->value == 9);
    assert(rbt.root->color == BLACK);
    assert(rbt.root->left->value == 2);
    assert(rbt.root->left->color == BLACK);
    assert(rbt.root->left->left->value == 1);
    assert(rbt.root->left->left->color == RED);
    assert(rbt.root->right->value == 34);
    assert(rbt.root->right->color == BLACK);
    assert(rbt.root->right->left->value == 23);
    assert(rbt.root->right->left->color == RED);

    assert(redBlackTree_remove(&rbt, 34));
    assert(rbt.elements == 4);
    assert(rbt.root->value == 9);
    assert(rbt.root->color == BLACK);
    assert(rbt.root->left->value == 2);
    assert(rbt.root->left->color == BLACK);
    assert(rbt.root->left->left->value == 1);
    assert(rbt.root->left->left->color == RED);
    assert(rbt.root->right->value == 23);
    assert(rbt.root->right->color == BLACK);

    assert(!redBlackNode_find_eq(rbt.root, 34));

    //remove a node does not exist return false
    assert(!redBlackTree_remove(&rbt, 55));

    redBlackTree_clean(&rbt);
}

void treapTest(void) {
    treap treap = {0};

    if (!treap_add(&treap, 23)) return;
    assert(treap.root);
    assert(treap.elements == 1);
    assert(treap.root->value == 23);
    assert(!treap.root->parent);
    assert(!treap.root->left);
    assert(!treap.root->right);

    //add existing element return false
    assert(treap_add(&treap, 23) == false);

    if (!treap_add(&treap, 2)) return;
    assert(treap.elements == 2);

    if (!treap_add(&treap, 9)) return;
    assert(treap.elements == 3);

    if (!treap_add(&treap, 34)) return;
    assert(treap.elements == 4);

    if (!treap_add(&treap, 1)) return;
    assert(treap.elements == 5);

    assert(treap_remove(&treap, 9));
    assert(treap.elements == 4);
    assert(!treap_find_eq(treap.root, 9));

    //remove a node does not exist return false
    assert(!treap_remove(&treap, 55));

    treap_clean(&treap);
};

void binarySearchTreeTest(void) {
    binarySearchTree tree = {0};
    if (!binarySearchTree_add(&tree, 7)) return;
    assert(tree.root);
    assert(tree.elements == 1);
    assert(tree.root->value == 7);
    assert(!tree.root->parent);
    assert(!tree.root->left);
    assert(!tree.root->right);

    if (!binarySearchTree_add(&tree, 3)) return;
    assert(tree.root->left);
    assert(tree.elements == 2);
    assert(tree.root->left->value == 3);
    assert(tree.root->left->parent == tree.root);

    if (!binarySearchTree_add(&tree, 11)) return;
    assert(tree.root->right);
    assert(tree.elements == 3);
    assert(tree.root->right->value == 11);
    assert(tree.root->right->parent == tree.root);

    //add existing element return false
    assert(!binarySearchTree_add(&tree, 3));

    if (!binarySearchTree_add(&tree, 1)) return;
    if (!binarySearchTree_add(&tree, 5)) return;
    if (!binarySearchTree_add(&tree, 4)) return;
    if (!binarySearchTree_add(&tree, 6)) return;
    if (!binarySearchTree_add(&tree, 9)) return;
    if (!binarySearchTree_add(&tree, 13)) return;
    if (!binarySearchTree_add(&tree, 8)) return;
    if (!binarySearchTree_add(&tree, 12)) return;
    if (!binarySearchTree_add(&tree, 14)) return;
    assert(tree.elements == 12);

    assert(tree.root->value == 7);
    assert(tree.root->left->value == 3);
    assert(tree.root->left->left->value == 1);
    assert(tree.root->left->right->value == 5);
    assert(tree.root->left->right->left->value == 4);
    assert(tree.root->left->right->right->value == 6);
    assert(tree.root->right->value == 11);
    assert(tree.root->right->left->value == 9);
    assert(tree.root->right->left->left->value == 8);
    assert(!tree.root->right->left->right);
    assert(tree.root->right->right->value == 13);
    assert(tree.root->right->right->left->value == 12);
    assert(tree.root->right->right->right->value == 14);

    //findEq return the node with that value
    assert(binaryNode_find_eq(tree.root, 8));

    //findEq return undefined when the value is not in the tree
    assert(!binaryNode_find_eq(tree.root, 2));

    {
    //find return the node that have the smalles value that is
    //grater than or equal to the argument
        binaryNode* n = binaryNode_find(tree.root, 10);
        assert(n);
        assert(n == binaryNode_find(tree.root, 11));
    }
    {
    // remove a node with no children
        binaryNode* node6 = binaryNode_find_eq(tree.root, 6);
        if (node6) {
            binarySearchTree_remove_node(&tree, node6);
            assert(tree.elements == 11);
            assert(!tree.root->left->right->right);
        }
    }
    // remove an unexistent node
    assert(!binarySearchTree_remove(&tree, 10));
    assert(tree.elements == 11);
    {
    // remove a node with one child
        assert(binarySearchTree_remove(&tree, 9));
        assert(tree.elements == 10);
        assert(tree.root->right->left);
        assert(tree.root->right->left->value == 8);
    }
    {
    // remove a node with 2 children
        assert(binarySearchTree_remove(&tree, 11));
        assert(tree.elements == 9);
        assert(tree.root->right->value == 12);
        assert(!tree.root->right->right->left);
    }

    binarySearchTree_clean(&tree);
    assert(tree.elements == 0);
    assert(tree.root == 0);
}