/**
 * Author: Axel Ariel Saravia
 */

/*
    This Treap data structure uses the BinarySearchTree
*/

import BinarySearchTree from "./searchTree.js";

/**
TreapNode T :: {
    left: maybe BinaryNode T,
    parent: maybe BinaryNode T,
    right: maybe BinaryNode T,
    value: T,
    priority: number [uint]
}
*/
/**
TreapRoot T :: {
    root: maybe TreapNode T,
    elements: number [uint]
}
*/

const Treap = {
    /**
    create T :: () -> TreapRoot T */
    create() {
        return {
            root: undefined,
            elements: 0
        };
    },
    /**
    rotateLeft T :: (TreapRoot T, TreapNode T) -> undefined */
    rotateLeft(treap, n) {
        const w = n.right;
        w.parent = n.parent;
        if (w.parent !== undefined) {
            if (w.parent.left === n) {
                w.parent.left = w;
            } else {
                w.parent.right = w;
            }
        }
        n.right = w.left;
        if (n.right !== undefined) {
            n.right.parent = n;
        }
        n.parent = w;
        w.left = n;
        if (n === treap.root) {
            w.parent = undefined;
            treap.root = w;
        }
    },
    /**
    rotateRight T :: (TreapRoot T, TreapNode T) -> undefined */
    rotateRight(treap, n) {
        const w = n.left;
        w.parent = n.parent;
        if (w.parent !== undefined) {
            if (w.parent.left === n) {
                w.parent.left = w;
            } else {
                w.parent.right = w;
            }
        }
        n.left = w.right;
        if (n.left !== undefined) {
            n.left.parent = n;
        }
        n.parent = w;
        w.right = n;
        if (n === treap.root) {
            w.parent = undefined;
            treap.root = w;
        }
    },
    /**
    add T :: (TreapRoot T, T) ->  Boolean*/
    add(treap, v) {
        const newNode = {
            left: undefined,
            parent: undefined,
            right: undefined,
            value: v,
            priority: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        };
        //Add Node
        if (BinarySearchTree.addNode(treap, newNode)) {
            //In this point the node was added
            //Bubble Up
            while (
                newNode !== treap.root
                && newNode.priority < newNode.parent.priority
            ) {
                if (newNode.parent.right === newNode) {
                    Treap.rotateLeft(treap, newNode.parent);
                } else {
                    Treap.rotateRight(treap, newNode.parent);
                }
            }
            if (newNode.parent === undefined) {
                treap.root = newNode;
            }
            return true;
        }
        return false;
    },
    /**
    remove T :: (TreapRoot T, T) -> boolean */
    remove(treap, v) {
        const n = BinarySearchTree.findEq(treap.root, v);
        if (n !== undefined && n.value === v) {
            //Trickle Down
            while (n.left !== undefined || n.right !== undefined) {
                if (n.left === undefined) {
                    Treap.rotateLeft(treap, n);
                } else if (n.right === undefined) {
                    Treap.rotateRight(treap, n);
                } else if (n.left.priority < n.right.priority) {
                    Treap.rotateRight(treap, n);
                } else {
                    Treap.rotateLeft(treap, n);
                }
                if (treap.root === n) {
                    treap.root = n.parent;
                }
            }
            BinarySearchTree.splice(treap, n);
            return true;
        }
        return false;
    }
};

export default Treap;