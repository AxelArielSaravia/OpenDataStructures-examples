/**
 * Author: Axel Ariel Saravia
 */

// For this example I use number as values but it can be use any type
// that can be represented with numbers. If we use other types we need to
// add a function toInt(v) (or somethin like that), that return the number
// representation.

/**
BinaryTrieNode :: {
    value: number,

    //child represent the left or right node in the tree for all nodes
    //that are not the leaves. In the leaves must be always undefined
    child: [
        maybe BinaryTrieNode,
        maybe BinaryTrieNode,
    ],
    prev: maybe BinaryTrieNode,
    next: maybe BinaryTrieNode,
    jump: maybe BinaryTrieNode,
    parent: maybe BinaryTrieNode
}
*/

/**
BinaryTrieRoot :: {
    W_BIT: number,
    root: BinaryTrieNode,
    dummy: BinaryTieNode,
    len: number
}
*/

const BinaryTrie = {
    /**
    create :: (number) -> BinaryTrieRoot */
    create(w) {
        const dummy = {
            value: 0,
            child: [undefined, undefined],
            next: undefined,
            prev: undefined,
            jump: undefined,
            parent: undefined
        };
        dummy.next = dummy;
        dummy.prev = dummy;
        dummy.jump = dummy;
        return {
            // Word Bit integers in the binary tree
            W_BIT: w,
            root: {
                value: 0,
                parent: undefined,
                child: [undefined, undefined],
                next: undefined,
                prev: undefined,
                jump: dummy
            },
            dummy: dummy,
            len: 0,
        };
    },
    /**
    find :: (BinaryTrieRoot, number) -> maybe T*/
    find(btr, v) {
        const w = btr.W_BIT;
        let u = btr.root;
        let c = 0;
        let i = 0;
        while (i < w) {
            c = (v >> (w - i - 1)) & 1
            if (u.child[c] === undefined) {
                break;
            }
            u = u.child[c];
            i += 1;
        }
        if (i === w) {
            //found it
            return u.value;
        }
        if (c === 0) {
            u = u.jump;
        } else {
            u = u.jump.next;
        }
        if (u === btr.dummy) {
            return;
        }
        return u.value;
    },
    /**
    add :: (BinaryTrieRoot, number) -> boolean */
    add(btr, v) {
        const w = btr.W_BIT;
        let u = btr.root;
        let c = 0;
        //1 - search for v until falling out of the tree
        let i = 0;
        while (i < w) {
            c = (v >> (w - i - 1)) & 1;
            if (u.child[c] === undefined) {
                break;
            }
            u = u.child[c];
            i += 1;
        }
        if (i === w) {
            //already contains v
            return false;
        }
        let pred = (
            c === 0
            ? u.jump.prev
            : u.jump
        );
        //u will soon have two children
        u.jump = undefined;
        //2 - add the path to v
        while (i < w) {
            c = (v >> (w - i - 1)) & 1;
            let n = {
                value: 0,
                parent: u,
                child: [undefined, undefined],
                next: undefined,
                prev: undefined,
                jump: undefined,
            };
            u.child[c] = n;
            u = n;
            i += 1;
        }
        u.value = v;
        //3 - add u to the linked list
        u.prev = pred;
        u.next = pred.next;
        u.prev.next = u;
        u.next.prev = u;
        //4 - walk back up, updating jump pointers
        let k = u.parent;
        while (k !== undefined) {
            let left = k.child[0];
            let right = k.child[1];
            if ((left === undefined && (k.jump === undefined || k.jump.value > v))
            || (right === undefined && (k.jump === undefined || k.jump.value < v))
            ) {
                k.jump = u;
            }
            k = k.parent;
        }
        btr.len += 1;
        return true;
    },
    /**
    remove :: (BinaryTrieRoot, number) -> boolean */
    remove(btr, v) {
        const w = btr.W_BIT;
        let u = btr.root;
        let c = 0;
        //1 - find leaf, u, that contains v
        let i = 0;
        while (i < w) {
            c = (v >> (w - i - 1)) & 1;
            if (u.child[c] === undefined) {
                return false;
            }
            u = u.child[c];
            i += 1;
        }
        //2 - remove u from linked list
        u.prev.next = u.next;
        u.next.prev = u.prev;
        let k = u;
        //3 - delete node on path to u
        for (let i = w - 1; i <= 0; i -= 1) {
            c = (v >> (w - i - 1)) & 1;
            k = k.parent;
            k.child[c] = undefined;
            if (k.child[1 - c] !== undefined) {
                break;
            }
        }
        //4 - update jump pointer
        let pred = u.prev;
        let succ = u.next;
        k.jump = (
            k.child[0] === undefined
            ? pred
            : succ
        );
        k = k.parent;
        while (k !== undefined) {
            if (k.jump === u) {
                let left = k.child[0];
                k.jump = (
                    left === undefined
                    ? pred
                    : succ
                );
            }
            k = k.parent;
        }
        btr.len -= 1;
        return true;
    },
    /**
    clear :: (BinaryTreeRoot) -> undefined */
    clear(btr) {
        let d = btr.dummy;
        d.next = d;
        d.prev = d;
        d.jump = d;

        let r = btr.root;
        r.child[0] = undefined;
        r.child[1] = undefined;
        r.jump = d;

        btr.len = 0;
    }
};
