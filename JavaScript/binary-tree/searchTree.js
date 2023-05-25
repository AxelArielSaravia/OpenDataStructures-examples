/**
 * Author: Axel Ariel Saravia
 */

/**
BinaryNode T :: {
    left: maybe BinaryNode T,
    parent: maybe BinaryNode T,
    right: maybe BinaryNode T,
    value: T
}
*/
/**
BinarySearchTreeRoot T :: {
    root: maybe BinaryNode T,
    elements: number [uint]
}
*/

import {createBinaryNode} from "./basic.js";

const BinarySearchTree = {
    /**
    create T :: () -> BinarySearchTreeRoot T */
    create() {
        return {
            root: undefined,
            elements: 0
        }
    },
    /**
    findEq T :: (maybe BinaryNode T, T) -> maybe BinaryNode T */
    findEq(n, v) {
        while (n !== undefined) {
            if (v < n.value) {
                n = n.left;
            } else if (v > n.value) {
                n = n.right;
            } else {
                return n;
            }
        }
        return;
    },
    // Return the node that have smallest value stored in the tree
    // that is grater than or equal to v.
    /**
    find T :: (maybe BinaryNode T, T) -> maybe BinaryNode T */
    find(n, v) {
        let z;
        while (n !== undefined) {
            if (v < n.value) {
                z = n;
                n = n.left;
            } else if (v > n.value) {
                n = n.right;
            } else {
                return n;
            }
        }
        return (
            z === undefined
            ? undefined
            : z
        );
    },
    /**
    addNode T :: (BinarySearchTreeRoot T, BinaryNode T) -> boolean */
    addNode(bst, n) {
        let p /*::maybe BinaryNode T*/;
        // find the node or a proper parent
        {
            let w /*:: maybe BinaryNode T*/= bst.root;
            let prev /*::maybe BinaryNode T*/;
            while (w !== undefined) {
                prev = w;
                if (n.value < w.value) {
                    w = w.left;
                } else if (n.value > w.value) {
                    w = w.right;
                } else {
        // We find the node, then is no need to insert it
                    return false;
                }
            }
            p = prev;
        }
        // create a new node, and define p as his parent
        n.parent = p;
        if (p === undefined) {
        // inserting into empty tree
            bst.root = n;
        } else {
            if (n.value < p.value) {
                p.left = n;
            } else { //(node.value > p.value)
                p.right = n;
            }
        // can not be (v === p.value) casue we return false before
        }
        bst.elements += 1;
        return true;
    },
    /**
    add T :: (BinarySearchTreeRoot T, T) -> boolean */
    add(bst, v) {
        return BinarySearchTree.addNode(bst, createBinaryNode(v, undefined));
    },
    /**
    removeNode T :: (BinarySearchTree T, BinaryNode T) -> BinarySearchTree T */
    removeNode(bst, n) {
        if (n.left !== undefined && n.right !== undefined) {
        // search the node that have the closest value to the removed node value
        // switch values and remove that node instead
            let w = n.right;
            while (w.left !== undefined) {
                w = w.left;
            }
            n.value = w.value;
            BinarySearchTree.splice(bst, w);
        } else {
            BinarySearchTree.splice(bst, n);
        }
        return bst;
    },
    /**
    splice T :: (BinarySearchTree T, BinaryNode T) -> undefined */
    splice(bst, u) {
        let s /*::maybe BinaryNode T */ = (
            u.left !== undefined
            ? u.left
            : u.right
        );
        let p /*::maybe BinaryNode T */ = undefined;
        if (u === bst.root) {
            bst.root = s;
        } else {
            p = u.parent;
            if (p.left === u) {
                p.left = s;
            } else {
                p.right = s;
            }
        }
        if (s !== undefined) {
            s.parent = p;
        }
        bst.elements -= 1;
    },
    /**
    remove T :: (BinarySearchTree T, T) -> boolean */
    remove(bst, v) {
        const n = BinarySearchTree.findEq(bst.root, v);
        if (n === undefined) {
            return false;
        }
        BinarySearchTree.removeNode(bst, n);
        return true;
    }
};
export default BinarySearchTree;