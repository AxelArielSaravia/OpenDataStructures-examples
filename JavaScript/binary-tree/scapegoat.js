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
ScapegoatTreeRoot T :: {
    root: maybe BinaryNode T,
    elements: number [uint]
    counter: number [uint]
}
*/

/**
createBinaryNode T :: (T, maybe BinaryNode T) -> BinaryNode T */
function createBinaryNode(v, p) {
    return {
        left: undefined,
        parent: p,
        right: undefined,
        value: v
    };
}

const _3div2 = 3 / 2;

/**
log3div2 :: (number) -> number */
function log3div2(n) {
    return Math.log2(n) / Math.log2(_3div2);
}

const ScapegoatTree = {
    /**
    create T :: () -> ScapegoatTreeRoot T */
    create() {
        return {
            elements: 0,
            root: undefined,
            counter: 0,
        };
    },
    /**
    size T :: (BinaryNode T) -> number */
    size(node) {
        // Based in the traverse function
        let n = 0;
        let u = node;
        let prv;
        let nxt;
        while (u !== undefined) {
            if (prv === u.parent) {
        // Visit a node for the first time
                n += 1;
                nxt = (
                    u.left !== undefined
                    ? u.left
                    : (
                        u.right !== undefined
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
    packIntoArray_recursive T :: (
        BinaryNode T,
        Array BinaryNode T,
        number [uint]
    ) -> number [uint] */
    packIntoArray_recursive(n, a, i) {
        if (n === undefined) {
            return i;
        }
        i = ScapegoatTree.packIntoArray_recursive(n.left, a, i);
        a[i] = n;
        i += 1;
        return ScapegoatTree.packIntoArray_recursive(n.right, a, i);
    },
    /**
    buildBalance_recursive T :: (
        Array BinaryNode T,
        number [uint],
        number [ns]
    ) -> maybe BinaryNode T */
    buildBalance_recursive(a, i, ns) {
        if (ns === 0) {
            return undefined;
        }
        const m = Math.floor(ns / 2);
        const n = a[i + m];
        n.left = ScapegoatTree.buildBalance_recursive(a, i, m);
        if (n.left !== undefined) {
            n.left.parent = n;
        }
        n.right = (
            ScapegoatTree.buildBalance_recursive(a, i + m + 1, ns - m - 1)
        );
        if (n.right !== undefined) {
            n.right.parent = n;
        }
        return n;
    },
    /**
    rebuild T :: (ScapegoatTreeRoot T, BinaryNode T ) -> undefined */
    rebuild(st, n) {
        const p = n.parent;
        const ns = ScapegoatTree.size(n);
        const a = Array(ns);
        ScapegoatTree.packIntoArray_recursive(n, a, 0);
        if (p === undefined) {
            st.root = ScapegoatTree.buildBalance_recursive(a, 0, ns);
            st.root.parent = undefined;
        } else if (p.right  === n) {
            p.right = ScapegoatTree.buildBalance_recursive(a, 0, ns);
            p.right.parent = p;
        } else {
            p.left = ScapegoatTree.buildBalance_recursive(a, 0, ns);
            p.left.parent = p;
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
    /**
    add T :: (ScapegoatTreeRoot T, T) -> boolean */
    add(st, v) {
        let depth = 0;
        let n /*::maybe BinaryNode T*/;
        //Search if exist the Node with v and if not create a new node
        //This is similar to the function addNode in BinarySearchTree
        {
            let p /*::maybe BinaryNode T*/;
            // find the node or a proper parent
            let prev /*::maybe BinaryNode T*/;
            for (let w = st.root; w !== undefined;) {
                prev = w;
                depth += 1;
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

            // create a new node, and define p as his parent
            n = createBinaryNode(v, p);
            if (p === undefined) {
            // inserting into empty tree
                st.root = n;
            } else {
                if (n.value < p.value) {
                    p.left = n;
                } else { //(node.value > p.value)
                    p.right = n;
                }
            // can not be (v === p.value) casue we return false before
            }
        }
        st.elements += 1;
        st.counter += 1;
        if (log3div2(st.counter) < depth) {
            //depth exeeded, find scapegoat
            let w = n.parent;
            while (
                3 * ScapegoatTree.size(w)
                <= 2 * ScapegoatTree.size(w.parent)
            ) {
                w = w.parent;
            }
            ScapegoatTree.rebuild(st, w.parent);
        }
        return true;
    },
    /**
    remove T :: (ScapegoatTreeRoot T, T) -> boolean */
    remove(st, v) {
        let n = ScapegoatTree.findEq(st.root, v);
        if (n === undefined) {
            return false;
        }
        if (n.left !== undefined && n.right !== undefined) {
        // search the node that have the closest value to the removed node value
        // switch values and remove that node instead
            let w = n.right;
            while (w.left !== undefined) {
                w = w.left;
            }
            n.value = w.value;
            n = w;
        }
        //Splice
        {
            let s /*::maybe BinaryNode T */ = (
                n.left !== undefined
                ? n.left
                : n.right
            );
            let p /*::maybe BinaryNode T */ = undefined;
            if (n === st.root) {
                st.root = s;
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
            st.elements -= 1;
        }
        if (2 * st.elements < st.counter) {
            ScapegoatTree.rebuild(st, st.root);
            st.counter = st.elements;
        }
        return true;
    }
};

//Imperative
/**
packIntoArray T :: (BinaryNode T) -> Array BinaryNode T */
function packIntoArray(n) {
    const a = [];
    let u = n;
    let prv;
    let nxt;
    while (u !== undefined) {
        if (prv === u.parent) {
    // Visit a node for the first time
            if (u.left !== undefined) {
                nxt = u.left;
            } else if (u.right !== undefined) {
                a.push(u);
                nxt = u.right;
                nxt.parent = u.parent;
                if (u.parent !== undefined) {
                    u.parent.left = nxt;
                }
                u = u.parent;
            } else {
                a.push(u);
                nxt = u.parent;
            }
        } else { //(prv === u.left)
            a.push(u);
            if (u.right !== undefined) {
                nxt = u.right;
                nxt.parent = u.parent;
                if (u.parent !== undefined) {
                    u.parent.left = nxt
                }
                u = u.parent;
            } else {
                nxt = u.parent;
                if (nxt !== undefined) {
                    nxt.left = undefined;
                    u = nxt.parent;
                }
            }
        }
        prv = u;
        u = nxt
    }
    return a;
}

export default ScapegoatTree;
