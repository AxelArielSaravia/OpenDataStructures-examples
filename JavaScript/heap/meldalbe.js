/**
 * Author: Axel Ariel Saravia
 */


/*
MeldableHeapNode T :: {
    left:   maybe MeldableHeapNode T
    right:  maybe MeldableHeapNode T
    parent: maybe MeldableHeapNode T
    value:  T
}
*/
/*
MeldableHeapRoot T :: {
    root:   maybe MeldableHeapNode T
    elements:    number [uint]
}
*/
const MeldableHeap = {
    /**
    createNode T :: (
        T,
        maybe MeldableHeapNode T,
        maybe MeldableHeapNode T,
        maybe MeldableHeapNode T,
    ) -> MeldableHeapNode T */
    createNode(x, l, r) {
        const res = {
            left: l,
            right: r,
            parent: undefined,
            value: x
        }
        if (l !== undefined) {
            l.parent = res
        }
        if (r !== undefined) {
            r.parent = res;
        }
        return res
    },
    /**
    create T :: () -> MeldableHeapRoot T */
    create() {
        return {
            root: undefined,
            elements: 0
        };
    },
    /**
    merge_recursive T :: (MeldableHeapNode T, MeldableHeapNode T) -> MeldableHeapNode T */
    merge_recursive(h1, h2) {
        if (h1 === undefined) {
            return h2;
        } else if (h2 === undefined) {
            return h1;
        }
        if (h2.value < h1.value) {
            const temp = h1;
            h1 = h2;
            h2 = h1;
        }
        if (Math.random() < 0.5) {
            h1.left = MeldableHeap.merge_recursive(h1.left, h2);
            h1.left.parent = h1;
        } else {
            h1.right = MeldableHeap.merge_recursive(h1.right, h2);
            h1.right.parent = h1;
        }
        return h1;
    },
    /**
    add_recursive T :: (MeldableHeapRoot T, T) -> boolean */
    add_recursive(mh, x) {
        const u = {
            left: undefined,
            right: undefined,
            parent: undefined,
            value: x
        };
        mh.root = MeldableHeap.merge_recursive(u, mh.root);
        mh.root.parent = undefined;
        mh.elements += 1;
        return true;
    },
    /**
    remove_recursive :: (MeldableHeapRoot T) -> maybe T */
    remove_recursive(mh) {
        if (mh.root === undefined) {
            return;
        }
        const v = mh.root.value;
        mh.root = MeldableHeap.merge_recursive(mh.root.left, mh.root.right);
        if (mh.root !== undefined) {
            mh.root.parent = undefined;
        }
        mh.elements -= 1;
        return v;
    },
    //This is the imperative form of the merge function
    /**
    merge T :: (MeldableHeapNode T, MeldableHeapNode T) -> MeldableHeapNode T */
    merge(h1, h2) {
        if (h1 === undefined) {
            return h2;
        } else if (h2 === undefined) {
            return h1;
        }
        if (h2.value < h1.value) {
            const t = h1;
            h1 = h2;
            h2 = t;
        }
        const res = h1;
        while (true) {
            if (h2.value < h1.value) {
                const p = h1.parent;
                if (p !== undefined) {
                    if (p.left === h1) {
                        p.left = h2;
                    } else {
                        p.right = h2;
                    }
                }
                h2.parent = p;
                const temp = h1;
                h1 = h2;
                h2 = temp;
            }
            if (Math.random() < 0.5) {
                if (h1.left === undefined) {
                    h1.left = h2;
                    h2.parent = h1;
                    return res;
                } else {
                    h1 = h1.left;
                }
            } else {
                if (h1.right === undefined) {
                    h1.right = h2;
                    h2.parent = h1;
                    return res;
                } else {
                    h1 = h1.right;
                }
            }
        }
    },
    // This is a modification of the original merge function.
    // we trying to fill the first empty space that appears.
    // we maintain the random choise but if the child chosen
    // is not empty and other it is, then we fill it.
    /**
    mod_merge T :: (MeldableHeapNode T, MeldableHeapNode T) -> MeldableHeapNode T */
    mod_merge(h1, h2) {
        if (h1 === undefined) {
            return h2;
        } else if (h2 === undefined) {
            return h1;
        }
        if (h2.value < h1.value) {
            const t = h1;
            h1 = h2;
            h2 = t;
        }
        const res = h1;
        while (true) {
            if (h2.value < h1.value) {
                const p = h1.parent;
                if (p !== undefined) {
                    if (p.left === h1) {
                        p.left = h2;
                    } else {
                        p.right = h2;
                    }
                }
                h2.parent = p;
                const temp = h1;
                h1 = h2;
                h2 = temp;
            }
            if (Math.random() < 0.5) {
                if (h1.left === undefined) {
                    h1.left = h2;
                    h2.parent = h1;
                    return res;
                }  else if (h1.right === undefined) {
                    h1.right = h2;
                    h2.parent = h1;
                    return res;
                } else {
                    h1 = h1.left;
                }
            } else {
                if (h1.right === undefined) {
                    h1.right = h2;
                    h2.parent = h1;
                    return res;
                } else if (h1.left === undefined) {
                    h1.left = h2;
                    h2.parent = h1;
                    return res;
                } else {
                    h1 = h1.right;
                }
            }
        }
    },
    /**
    add T :: (MeldableHeapRoot T, T) -> boolean */
    add(mh, x) {
        const u = {
            left: undefined,
            right: undefined,
            parent: undefined,
            value: x
        };
        mh.root = MeldableHeap.mod_merge(u, mh.root);
        mh.root.parent = undefined;
        mh.elements += 1;
        return true;
    },
    /**
    remove T :: (MeldableHeapRoot T) -> maybe T */
    remove(mh) {
        if (mh.root === undefined) {
            return;
        }
        const v = mh.root.value;
        mh.root = MeldableHeap.mod_merge(mh.root.left, mh.root.right);
        if (mh.root !== undefined) {
            mh.root.parent = undefined;
        }
        mh.elements -= 1;
        return v;
    }
};

export default MeldableHeap;