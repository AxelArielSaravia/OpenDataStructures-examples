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

/**
RedBlackNode T :: {
    left: maybe RedBlackNode T,
    parent: maybe RedBlackNode T,
    right: maybe RedBlackNode T,
    color: 0 | 1,
    value: T
}
*/
/**
RedBlackTreeRoot T :: {
    root: maybe RedBlackNode T,
    elements: number [uint]
    counter: number [uint]
}
*/

const RED = 0;
const BLACK = 1;

/**
createRedBlackNode T :: (T, maybe RedBlackNode T) -> RedBlackNode T */
function createRedBlackNode(v, p) {
    return {
        left: undefined,
        parent: p,
        right: undefined,
        color: RED,
        value: v
    };
}

const RedBlackTree = /*:freeze:*/{
    /**
    create T :: () -> RedBlackTreeRoot T */
    create() {
        return {
            root: undefined,
            elements: 0
        };
    },
    /**
    findEq T :: (maybe RedBlackNode T, T) -> maybe RedBlackNode T */
    findEq(u, v) {
        while (u !== undefined) {
            if (v < u.value) {
                n = u.left;
            } else if (v > u.value) {
                u = u.right;
            } else {
                return u;
            }
        }
        return undefined;
    },
    /**
    pushBlack T :: (RedBlackNode T) -> undefined */
    pushBlack(u) {
        u.color = u.color - 1;
        u.left.color = u.left.color + 1;
        u.right.color = u.right.color + 1;
    },
    /**
    pullBlack T :: (RedBlackNode T) -> undefined */
    pullBlack(u) {
        u.color = u.color + 1;
        u.left.color = u.left.color - 1;
        u.right.color = u.right.color - 1;
    },
    /**
    rotateLeft :: (RedBlackTreeRoot T, RedBlackNode T) -> undefined */
    rotateLeft(rbt, u) {
        const w = u.right;
        w.parent = u.parent;
        if (w.parent !== undefined) {
            if (w.parent.left === u) {
                w.parent.left = w;
            } else {
                w.parent.right = w;
            }
        }
        u.right = w.left;
        if (u.right !== undefined) {
            u.right.parent = u;
        }
        u.parent = w;
        w.left = u;
        if (u === rbt.root) {
            w.parent = undefined;
            rbt.root = w;
        }
    },
    /**
    rotateRight :: (RedBlackTreeRoot T, RedBlackNode T) -> undefined */
    rotateRight(rbt, u) {
        const w = u.left;
        w.parent = u.parent;
        if (w.parent !== undefined) {
            if (w.parent.left === u) {
                w.parent.left = w;
            } else {
                w.parent.right = w;
            }
        }
        u.left = w.right;
        if (u.left !== undefined) {
            u.left.parent = u;
        }
        u.parent = w;
        w.right = u;
        if (u === rbt.root) {
            w.parent = undefined;
            rbt.root = w;
        }
    },
    /**
    flipLeft T :: (RedBlackTreeRoot T, RedBlackNode T) -> undefined */
    flipLeft(rbt, u) {
        { //swap colors
            const temp = u.color;
            u.color = u.right.color;
            u.right.color = temp;
        }
        RedBlackTree.rotateLeft(rbt, u);
    },
    /**
    flipRight T :: (RedBlackTreeRoot T, RedBlackNode T) -> undefined */
    flipRight(rbt, u) {
        { // swap colors
            const temp = u.color;
            u.color = u.left.color;
            u.left.color = temp;
        }
        RedBlackTree.rotateRight(rbt, u);
    },
    /**
    add T :: (RedBlackTreeRoot T, T) -> boolean */
    add(rbt, v) {
        let u /*::maybe RedBlackNode T*/;
        { // add node
            let p /*::maybe RedBlackNode T*/;
            { // find the node or a proper parent
                let w /*:: maybe RedBlackNode T*/= rbt.root;
                let prev /*::maybe RedBlackNode T*/;
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
            u = createRedBlackNode(v, p);
            if (p === undefined) {
                // inserting into empty tree
                rbt.root = u;
            } else {
                if (v < p.value) {
                    p.left = u;
                } else { //(v > p.value)
                    p.right = u;
                }
            // can not be (v === p.value) casue we return false before
            }
            rbt.elements += 1;
        }
        // fix up
        while (u.color === RED) {
            if (u === rbt.root) {
                u.color = BLACK;
                return true;
            }
            let w = u.parent;
            if (
                w.left === undefined 
                || w.left.color === BLACK
            ) {
        // flipLeft swap w and u nodes, now w is the left child of u,
        // Couse this we need to set u as the child of w again
        // and w as the parent
                RedBlackTree.flipLeft(rbt, w);
                u = w;
                w = u.parent;
            }
            if (w.color === BLACK) {
                return true;
            }
            const g = w.parent;
            if (
                g.right === undefined
                || g.right.color === BLACK
            ) {
                RedBlackTree.flipRight(rbt, g);
                return true;
            }
            RedBlackTree.pushBlack(g);
            u = g;
        }
    },
    /**
    remove :: (RedBlackTreeRoot T, T) -> boolean */
    remove(rbt, v) {
        let u = RedBlackTree.findEq(rbt.root, v);
        if (u === undefined) {
            return false;
        }
        let w = u.right;
        if (w === undefined) {
            w = u;
            u = w.left;
        } else {
            while (w.left !== undefined) {
                w = w.left;
            }
            u.value = w.value;
            u = w.right;
        }
        { // splice
            const s = (
                w.left !== undefined
                ? w.left
                : w.right
            );
            let p /*::maybe RedBlackNode T */;
            if (w === rbt.root) {
                rbt.root = s;
            } else {
                p = w.parent;
                if (p.left === w) {
                    p.left = s;
                } else {
                    p.right = s;
                }
            }
            if (s !== undefined) {
                s.parent = p;
            }
            rbt.elements -= 1;
        }

        u.color = u.color + w.color;
        u.parent = w.parent;

        // fix up
        while (u.color > BLACK) {
            if (u === rbt.root) {
                //case 0
                u.color = BLACK;
                return true;
            }
            const m = u.parent;
            if (m.left !== undefined && m.left.color === RED) {
                //case 1
                RedBlackTree.flipRight(rbt, m);
            } else if (u === m.left) {
                //case 2
                const c = m.right;
                RedBlackTree.pullBlack(m);
                RedBlackTree.flipLeft(rbt, m);
                const q = m.right;
                if (q !== undefined && q.color === RED) {
                    RedBlackTree.rotateLeft(rbt, m);
                    RedBlackTree.flipRight(rbt, c);
                    RedBlackTree.pushBlack(q);
                    if (
                        c.right !== undefined
                        && c.right.color === RED
                    ) {
                        RedBlackTree.flipLeft(rbt, c);
                    }
                    u = q;
                } else {
                    u = c;
                }
            } else {
                //case 3
                const c = m.left;
                RedBlackTree.pullBlack(m);
                RedBlackTree.flipRight(rbt, m);
                const q = m.left;
                if (q !== undefined && q.color === RED) {
                    // q - m is red - red
                    RedBlackTree.rotateRight(rbt, m);
                    RedBlackTree.flipLeft(rbt, c);
                    RedBlackTree.pushBlack(q);
                    u = q;
                } else if (
                    c.left !== undefined
                    && c.left.color === RED
                ) {
                    RedBlackTree.pushBlack(c);
                    u = c;
                } else {
                    // ensure left-leaning
                    RedBlackTree.flipLeft(rbt, c);
                    u = m;
                }
            }
        }
        if (u !== rbt.root) {
            const m = u.parent;
            if (
                (
                    m.right !== undefined
                    && m.right.color === RED
                )
                && (
                    m.left == undefined
                    || m.left.color === BLACK
                )
            ) {
                RedBlackTree.flipLeft(rbt, m);
            }
        }
        return true;
    }
}

export default RedBlackTree;