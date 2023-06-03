/**
 * Author: Axel Ariel Saravia
 */

/*
    This Treap data structure uses the BinarySearchTree
*/

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

/**
createTreapNode :: (T, maybe TreapNode T) -> TreapNode T */
function createTreapNode(v, p) {
    return {
        left: undefined,
        parent: p,
        right: undefined,
        value: v,
        priority: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    };
}

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
    findEq T :: (maybe TreapNode T, T) -> maybe TreapNode T */
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
    add T :: (TreapRoot T, T) ->  Boolean*/    add(treap, v) {
        let newNode /*::maybe TreapNode T*/;
        //Add node
        {
            let p /*::maybe TreapNode T*/;
            // find the node or a proper parent
            {
                let w /*:: maybe TreapNode T*/= treap.root;
                let prev /*::maybe TreapNode T*/;
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
            newNode = createTreapNode(v, p);
            if (p === undefined) {
            // inserting into empty tree
                treap.root = newNode;
            } else {
                if (newNode.value < p.value) {
                    p.left = newNode;
                } else { //(newNode.value > p.value)
                    p.right = newNode;
                }
            // can not be (v === p.value) casue we return false before
            }
            treap.elements += 1;
        }
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
    },
    /**
    remove T :: (TreapRoot T, T) -> boolean */
    remove(treap, v) {
        const n = Treap.findEq(treap.root, v);
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
            //Splice
            {
                const s /*::maybe TreapNode T */ = (
                    n.left !== undefined
                    ? n.left
                    : n.right
                );
                let p /*::maybe TreapNode T */ = undefined;
                if (n === treap.root) {
                    treap.root = s;
                } else {
                    p = n.parent;
                    if (p.left === n) {
                        p.left = s;
                    } else {
                        p.right = s;
                    }
                }
                if (s !== undefined) {
                    s.parent = p;
                }
                treap.elements -= 1;
            }
            return true;
        }
        return false;
    }
};

export default Treap;