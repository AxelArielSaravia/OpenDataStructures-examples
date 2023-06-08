/**
 * Author: Axel Ariel Saravia
 */
/**
 * A SkiplistSSet uses a skiplist structure to implement the SSet interface
 */

/**
SkipListNode T :: {
    height: number [uint]
    next: Array SkipListNode T
    value: T
}
*/
/**
SkipListSSet T :: {
    heignt: number [uint],
    length: number [uint],
    sentinel: SkipListNode T
    stack: Array<SkipListNode T
}
*/

/*
function createSkipListNode(value, height) {
    return {
        height,
        next: Array(height + 1),
        value,
    };
}
*/

const SkipListSSet = Object.freeze({
    MAX_HEIGHT: 31,
    MAX_RANDOM: 2 ** 31,
    /**
    create T :: () -> SkipListSSet T */
    create() {
        return Object.seal({
            height: 0,
            length: 0,
            sentinel: {
                height: SkipListSSet.MAX_HEIGHT,
                next: Array(SkipListSSet.MAX_HEIGHT + 1),
                value: undefined,
            },
            stack: Array(SkipListSSet.MAX_HEIGHT),
        });
    },
    /**
    getNode T :: (SkipListSSet T, T) -> SkipListNode T */
    getNode(skiplist, v) {
        let node = skiplist.sentinel;
        let r = skiplist.height;
        while (r >= 0) {
            while (node.next[r] !== undefined
                && node.next[r].value < v
            ) {
                node = node.next[r];
            }
            r -= 1;
        }
        return node.next[0];
    },
    /**
    find T :: (SkipListSSet T, T) -> maybe T */
    find(skiplist, v) {
        const node = SkipListSSet.getNode(skiplist, v);
        return (
            node !== undefined
            ? node.value
            : undefined 
        );
    },
    // The return is always minor than the MAX_HEIGHT
    /**
    pickHeight :: () -> return number [uint] */
    pickHeight() {
        const z = Math.floor(Math.random() * SkipListSSet.MAX_RANDOM);
        let k = 0;
        let m = 0b1;
        while ((z & m) !== 0b0) {
            k += 1;
            m <<= 1;
        }
        return k;
    },
    /**
    add T :: (SkipListSSet T, T) -> boolean */
    add(skiplist, v) {
        let node = skiplist.sentinel;
        let r = skiplist.height;
        while (r >= 0) {
            while (node.next[r] !== undefined
                && node.next[r].value < v
            ) {
                node = node.next[r];
            }
            if (node.next[r] !== undefined
                && node.next[r].value === v
            ) {
                return false;
            }
            skiplist.stack[r] = node;
            r -= 1;
        }
        const newNodeHeight = SkipListSSet.pickHeight();
        const newNode = {
            height: newNodeHeight,
            next: Array(newNodeHeight + 1),
            value: v,
        };
    
        while (skiplist.height < newNodeHeight) {
            skiplist.height += 1;
            skiplist.stack[skiplist.height] = skiplist.sentinel
        }
        for (let i = 0; i < newNodeHeight; i += 1) {
            newNode.next[i] = skiplist.stack[i].next[i];
            skiplist.stack[i].next[i] = newNode;
        }
        skiplist.length += 1;
        return true;
    },
    /**
    remove T :: (SkipListSSet T, T) -> boolean */
    remove(skiplist, v) {
        let removed = false;
        let node = skiplist.sentinel;
        let r = skiplist.height;
        while (r >= 0) {
            while (node.next[r] !== undefined
                && node.next[r].value < v
            ) {
                node = node.next[r];
            }
            if (node.next[r] !== undefined 
                && node.next[r].value == v
            ) {
                removed = true;
                node.next[r] = node.next[r].next[r];
                if (node === skiplist.sentinel 
                    && node.next[r] === undefined
                ) {
                    skiplist.height -= 1;
                }
            }
            r -= 1;
        }
        if (removed) {
            skiplist.length -= 1;
        }
        return removed
    }
});

export default SkipListSSet;