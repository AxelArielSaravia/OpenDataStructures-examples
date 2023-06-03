/**
 * Author: Axel Ariel Saravia
 */

import assert from "node:assert/strict";
import {
    BinaryTree,
    createBinaryNode
} from "./basic.js";

import BinarySearchTree from "./searchTree.js";
import Treap from "./treap.js";
import ScapegoatTree from "./scapegoat.js";

import RedBlackTree from "./red-black.js";


// Main Execution
{
    //BasicTest();
    //BinarySearchTreeTest();
    //TreapTest();
    //ScapegoatTreeTest();
    RedBlackTreeTest();
}

function RedBlackTreeTest() {
    const BLACK = 1;
    const RED = 0;
    const rbt = RedBlackTree.create();

    assert(RedBlackTree.add(rbt, 23));
    assert(rbt.root !== undefined);
    assert(rbt.elements === 1);
    assert(rbt.root.value === 23);
    assert(rbt.root.color === BLACK);
    assert(rbt.root.left === undefined);
    assert(rbt.root.right === undefined);

    //add existing element return false
    assert(!RedBlackTree.add(rbt, 23));

    assert(RedBlackTree.add(rbt, 2));
    assert(rbt.elements === 2);
    assert(rbt.root.value === 23);
    assert(rbt.root.left.value === 2);

    assert(RedBlackTree.add(rbt, 9));
    assert(rbt.elements === 3);
    assert(rbt.root.value === 9);
    assert(rbt.root.color === BLACK);
    assert(rbt.root.left.value === 2);
    assert(rbt.root.left.color === RED);
    assert(rbt.root.right.value === 23);
    assert(rbt.root.right.color === RED);

    assert(RedBlackTree.add(rbt, 34));
    assert(rbt.elements === 4);
    assert(rbt.root.value === 9);
    assert(rbt.root.color === BLACK);
    assert(rbt.root.left.value === 2);
    assert(rbt.root.left.color === BLACK);
    assert(rbt.root.right.value === 34);
    assert(rbt.root.right.color === BLACK);
    assert(rbt.root.right.left.value === 23);
    assert(rbt.root.right.left.color === RED);

    assert(RedBlackTree.add(rbt, 1));
    assert(rbt.elements === 5);
    assert(rbt.root.value === 9);
    assert(rbt.root.color === BLACK);
    assert(rbt.root.left.value === 2);
    assert(rbt.root.left.color === BLACK);
    assert(rbt.root.left.left.value === 1);
    assert(rbt.root.left.left.color === RED);
    assert(rbt.root.right.value === 34);
    assert(rbt.root.right.color === BLACK);
    assert(rbt.root.right.left.value === 23);
    assert(rbt.root.right.left.color === RED);

    assert(RedBlackTree.remove(rbt, 34));
    assert(rbt.elements === 4);
    assert(rbt.root.value === 9);
    assert(rbt.root.color === BLACK);
    assert(rbt.root.left.value === 2);
    assert(rbt.root.left.color === BLACK);
    assert(rbt.root.left.left.value === 1);
    assert(rbt.root.left.left.color === RED);
    assert(rbt.root.right.value === 23);
    assert(rbt.root.right.color === BLACK);

    assert(RedBlackTree.findEq(rbt.root, 34) === undefined);

    //remove a node does not exist return false
    assert(!RedBlackTree.remove(rbt, 55));
}

function ScapegoatTreeTest() {
    const st = ScapegoatTree.create();

    assert(ScapegoatTree.add(st, 23));
    assert(st.root !== undefined);
    assert(st.elements === 1);
    assert(st.counter === 1);
    assert(st.root.value === 23);
    assert(st.root.parent === undefined);
    assert(st.root.left === undefined);
    assert(st.root.right === undefined);

    //add existing element return false
    assert(!ScapegoatTree.add(st, 23));

    assert(ScapegoatTree.add(st, 2));
    assert(st.elements === 2);
    assert(st.root.value === 23);
    assert(st.root.left.value === 2);

    assert(ScapegoatTree.add(st, 9));
    assert(st.elements === 3);

    assert(ScapegoatTree.add(st, 34));
    assert(st.elements === 4);

    assert(ScapegoatTree.add(st, 1));
    assert(st.elements === 5);

    assert(st.root.value === 23);
    assert(st.root.left.value === 2);
    assert(st.root.left.left.value === 1);
    assert(st.root.left.right.value === 9);
    assert(st.root.right.value === 34);

    assert(ScapegoatTree.add(st, 7));
    assert(st.elements === 6);

    assert(ScapegoatTree.add(st, 8));
    assert(st.elements === 7);

    assert(ScapegoatTree.add(st, 7.5));
    assert(st.elements === 8);

}

function TreapTest() {
    const treap = Treap.create();

    assert(Treap.add(treap, 23));
    assert(treap.root !== undefined);
    assert(treap.elements === 1);
    assert(treap.root.value === 23);
    assert(treap.root.parent === undefined);
    assert(treap.root.left === undefined);
    assert(treap.root.right === undefined);

    //add existing element return false
    assert(!Treap.add(treap, 23));

    assert(Treap.add(treap, 2));
    assert(treap.elements === 2);

    assert(Treap.add(treap, 9));
    assert(treap.elements === 3);

    assert(Treap.add(treap, 34));
    assert(treap.elements === 4);

    assert(Treap.add(treap, 1));
    assert(treap.elements === 5);

    assert(Treap.remove(treap, 9));
    assert(treap.elements === 4);
    assert(BinarySearchTree.findEq(treap.root, 9) === undefined);

    //remove a node does not exist return false
    assert(!Treap.remove(treap, 55));
}

function BinarySearchTreeTest() {
    const tree = BinarySearchTree.create();

    assert(BinarySearchTree.add(tree, 7));
    assert(tree.root !== undefined);
    assert(tree.elements === 1);
    assert(tree.root.value === 7);
    assert(tree.root.parent === undefined);
    assert(tree.root.left === undefined);
    assert(tree.root.right === undefined);

    assert(BinarySearchTree.add(tree, 3));
    assert(tree.root.left !== undefined);
    assert(tree.elements === 2);
    assert(tree.root.left.value === 3);
    assert(tree.root.left.parent === tree.root);

    assert(BinarySearchTree.add(tree, 11));
    assert(tree.root.right !== undefined);
    assert(tree.elements === 3);
    assert(tree.root.right.value === 11);
    assert(tree.root.right.parent === tree.root);

    //add existing element return false
    assert(!BinarySearchTree.add(tree, 3));

    assert(BinarySearchTree.add(tree, 1));
    assert(BinarySearchTree.add(tree, 5));
    assert(BinarySearchTree.add(tree, 4));
    assert(BinarySearchTree.add(tree, 6));
    assert(BinarySearchTree.add(tree, 9));
    assert(BinarySearchTree.add(tree, 13));
    assert(BinarySearchTree.add(tree, 8));
    assert(BinarySearchTree.add(tree, 12));
    assert(BinarySearchTree.add(tree, 14));
    assert(tree.elements === 12);

    assert(tree.root.value === 7);
    assert(tree.root.left.value === 3);
    assert(tree.root.left.left.value === 1);
    assert(tree.root.left.right.value === 5);
    assert(tree.root.left.right.left.value === 4);
    assert(tree.root.left.right.right.value === 6);
    assert(tree.root.right.value === 11);
    assert(tree.root.right.left.value === 9);
    assert(tree.root.right.left.left.value === 8);
    assert(tree.root.right.left.right === undefined);
    assert(tree.root.right.right.value === 13);
    assert(tree.root.right.right.left.value === 12);
    assert(tree.root.right.right.right.value === 14);

    //findEq return the node with that value
    assert(BinarySearchTree.findEq(tree.root, 8) !== undefined);

    //findEq return undefined when the value is not in the tree
    assert(BinarySearchTree.findEq(tree.root, 2) === undefined);

    {
        //find return the node that have the smalles value that is
        //grater than or equal to the argument
        const n = BinarySearchTree.find(tree.root, 8.5);
        assert(n !== undefined);
        assert(n === BinarySearchTree.find(tree.root, 9));
    }
    {
        // remove a node with no children
        const node6 = BinarySearchTree.findEq(tree.root, 6);
        if (node6 !== undefined) {
            BinarySearchTree.removeNode(tree, node6);
            assert(tree.elements === 11);
            assert(tree.root.left.right.right === undefined);
        }
    }
    {
        // remove a node with one child
        const node9 = BinarySearchTree.findEq(tree.root, 9);
        if (node9 !== undefined) {
            BinarySearchTree.removeNode(tree, node9);
            assert(tree.elements === 10);
            assert(tree.root.right.left !== undefined);
            assert(tree.root.right.left.value == 8);
        }
    }
    {
        // remove a node with 2 children
        const node11 = BinarySearchTree.findEq(tree.root, 11);
        if (node11 !== undefined) {
            BinarySearchTree.removeNode(tree, node11);
            assert(tree.elements === 9);
            assert(tree.root.right.value === 12);
            assert(tree.root.right.right.left === undefined);
        }
    }
    return;
}

function BasicTest() {
    const t1 = createBinaryNode("a");
    t1.left = createBinaryNode("b", t1);
    t1.right = createBinaryNode("c", t1);
    t1.left.left = createBinaryNode("d", t1.left);
    t1.left.right = createBinaryNode("e", t1.left);
    t1.left.left.left = createBinaryNode("f", t1.left.left);
    t1.left.left.right = createBinaryNode("g", t1.left.left);
    t1.left.right.right = createBinaryNode("h", t1.left.right);

    assert(BinaryTree.depth(t1.right) === 2);
    assert(BinaryTree.depth(t1.left.left) === 3);

    assert(BinaryTree.recursive_size(t1) === 8);
    assert(BinaryTree.size(t1) === 8);

    assert(BinaryTree.recursive_height(t1) === 4);
    assert(BinaryTree.height(t1) === 4);
}