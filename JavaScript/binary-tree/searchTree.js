/**
 * Author: Axel Ariel Saravia
 */

/**
BinaryNode<T> :: {
    left: maybe<BinaryNode<T>>,
    parent: maybe<BinaryNode<T>>,
    right: maybe<BinaryNode<T>>,
    value: T
}
*/
/**
BinarySearchTree<T> :: {
    root: maybe<BinaryNode<T>>,
    elements: number [uint]
}
*/

import {createBinaryNode} from "./basic.js";

const BinarySearchTree = {
    /**
    create :: () -> BinarySearchTree<T> */
    create() {
        return {
            root: undefined,
            elements: 0
        }
    },
    /**
    findEq :: (maybe<BinaryNode<T>>, T) -> maybe<BinaryNode<T>> */
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
    find :: (maybe<BinaryNode<T>>, T) -> maybe<BinaryNode<T>> */
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
    add :: (BinarySearchTree<T>, T) -> boolean */
    add(bst, v) {
        let p /*:: maybe<BinaryNode<T>>*/;
        // find the node or a proper parent
        {
            let w /*:: maybe<BinaryNode<T>>*/= bst.root;
            let prev /*:: maybe<BinaryNode<T>>*/;
            while (w !== undefined) {
                prev = w;
                if (v < w.value) {
                    w = w.left;
                } else if (v > w.value) {
                    w = w.right;
                } else {
        // We find the node, then is no need to insert it
                    return false;
                }
            }
            p = prev;
        }
        // create a new node, and define p as his parent
        let newN = createBinaryNode(v, p);
        if (p === undefined) {
        // inserting into empty tree
            bst.root = newN;
        } else {
            if (v < p.value) {
                p.left = newN;
            } else { //(v > p.value)
                p.right = newN;
            }
        // can not be (v === p.value) casue we return false before
        }
        bst.elements += 1;
        return true;
    },
    /**
    removeNode :: (BinarySearchTree<T>, BinaryNode<T>) -> BinarySearchTree<T> */
    removeNode(bst, n) {
        let u /*::BinaryNode<T>*/;
        if (n.left !== undefined && n.right !== undefined) {
        // search the node that have the closest value to the removed node value
        // switch values and remove that node instead
            let w = n.right;
            while (w.left !== undefined) {
                w = w.left;
            }
            n.value = w.value;
            u = w;
        } else {
            u = n;
        }
        //splice
        let s /*::maybe<BinaryNode<T>>*/ = (
            u.left !== undefined
            ? u.left
            : u.right
        );
        let p /*::maybe<BinaryNode<T>>*/ = undefined;
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
        return bst;
    },
    /**
    remove :: (BinarySearchTree<T>, T) -> boolean */
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