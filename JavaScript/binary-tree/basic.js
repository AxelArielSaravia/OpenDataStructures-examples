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

const BinaryTree = {
    /**
    create :: (maybe<BinaryNode<T>>) -> {root: maybe<BinaryNode<T>>, size: number [uint]}*/
    create(root) {
        return {
            root,
            size: 0
        };
    },
    /**
    createNode :: (maybe<BinaryNode<T>>, T) -> BinaryNode<T> */
    createNode(parent, value) {
        return {
            left: undefined,
            parent,
            right: undefined, 
            value
        };
    },
    /**
    depth :: (BinaryNode<T>) -> number [uint] */
    depth(node) {
        let d = 0;
        while (node !== undefined) {
            node = node.parent;
            d += 1;
        }
        return d;
    },
    /**
    recursive_size :: (maybe<BinaryNode<T>>) -> number [uint] */
    recursive_size(root) {
        return (
            root === undefined
            ? 0
            : (
                1
                + BinaryTree.recursive_size(u.left)
                + BinaryTree.recursive_size(u.right)
            )
        );
    },
    /**
    recursive_height :: (maybe<BinaryNode<T>>) -> number [uint] */
    recursive_height(root) {
        return (
            root === undefined
            ? 0
            : 1 + Math.max(
                BinaryTree.recursive_height(u.left),
                BinaryTree.recursive_height(u.right)
            )
        );
    },
    /**
    size :: */
    size(root) {
    // Based in the traverse function
        let n = 0;
        let u = root;
        let prv;
        while (u !== undefined) {
            if (prv === u.parent) {
    // Visit a node for the first time
                n += 1;
                nxt = (
                    u.left !== undefined
                    ? u.left
                    : ( u.right !== undefined
                        ? u.right
                        : u.parent
                    )
                );
            } else if (prv === u.left) {
                nxt = (
                    u.right !== undefined
                    ? u.right
                    : u.parent
                );
            } else {
                nxt = u.parent;
            }
            prv = u;
            u = nxt
        }
        return n;
    },
    /**
    height :: (maybe<BinaryNode<T>>) -> number [uint] */
    height(root) {
        let n = 0;  // keeps the depthes value
        let m = n;  // keep track of the depths of each node
        let u = root;
        let prv;
        while (u !== undefined) {
            if (prv === u.parent) {
    // Visit a node for the first time
                m += 1;
                if (u.left !== undefined) {
                    nxt = u.left;
                } else if (u.right !== undefined) {
                    nxt = u.right;
                } else {
                    nxt = u.parent
                }
            } else if (prv === u.left) {
                m -= 1;
                if (u.right !== undefined) {
                    nxt = u.right;
                } else {
                    nxt = u.parent
                }
            } else {
                m -= 1;
                nxt = u.parent;
            }
            if (m > n) {
                n = m;
            }
            prv = u;
            u = nxt
        }
        return n;
    },
};

//Traversals function
//This function shows diferent algoritms to traverse a binary tree

/**
recursive_travese :: (maybe<BinaryNode<T>>) -> undefined */
function recursive_travese(root) {
    if (root === undefined) {
        return;
    }
    recursive_travese(root.left);
    recursive_travese(root.right);
}

/**
travese :: (BinaryNode<T>) -> undefined */
function travese(root) {
//This traverse sometimes is called first-depth traverse
    let u = root;
    let prv;
    let nxt;
    while (u !== undefined) {
        if (prv === u.parent) {
    // Visit a node for the first time
            nxt = (
                u.left !== undefined
                ? u.left
                : ( u.right !== undefined
                    ? u.right
                    : u.parent
                )
            );
        } else if (prv === u.left) {
            nxt = (
                u.right !== undefined
                ? u.right
                : u.parent
            );
        } else {
            nxt = u.parent;
        }
        prv = u;
        u = nxt
    }
}

// Some implementations of binary trees do not use  the parent field
// couse that we need to use a list or a stack to keep track of the path
// from the current node to the root
/**
travese2 :: (BinaryNode<T>) -> undefined */
function travese2(root) {
    const stack = [root];
    let u;
    let left;
    let right;
    while (stack.length > 0) {
        u = stack[stack.length - 1];
    // if u.right === left means that we visit all the nested nodes
        if (u.right !== undefined && u.right === left) {
    // We asume that the node u is the left of his parent, otherwise we pass for all the nested nodes
            left = u;
            stack.pop();
       } else {
            if (u.left !== undefined && u.left !== left ) {
               stack.push(u.left);
               left = u.left;
            } else if (u.right !== undefined && u.right !== right ) {
               stack.push(u.right);
               right = u.right;
            } else {
                if (u !== left && u !== right) {
    // We asume that the node u is the left of his parent
    // otherwise if is the right node, means that we need to go up again, cause 
    // we pass for all the nested nodes
                    left = u;
                }
                stack.pop();
            }
       }
    }
}

/**
breadthFirstTraversal :: (BinaryNode<T>) -> undefined */
function breadthFirstTraversal(root) {
    const queue = [root];
    let u;
    while (queue.length > 0) {
        u = queue.shift();
        if (u.left !== undefined) {
            queue.push(u.left);
        }
        if (u.right !== undefined) {
            queue.add(u.rigth);
        }
    }
}

