/**
 * Author: Axel Ariel Saravia
 */

/**
SkipListNode T :: {
    height: number [uint],
    next: Array SkipListNode T,
    length: Array number [int],
    value: T
}
*/
/**
SkipListListT :: {
    heignt: number[uint],
    length: number[uint],
    sentinel: SkipListNodeT
}
*/

const SkipListList = Object.freeze({
    MAX_HEIGHT: 31,
    MAX_RANDOM: 2 ** 31,
    /**
    create T :: () -> SkipListList T */
    create() {
        return Object.seal({
            height: 0,
            length: 0,
            sentinel: {
                height: SkipListList.MAX_HEIGHT,
                next: Array(SkipListList.MAX_HEIGHT + 1),
                length: Array(SkipListList.MAX_HEIGHT + 1),
                value: undefined,
            }
        });
    },
    /**
    getNode T :: (SkipListList T, number [uint]) -> SkipListNode T */
    getNode(list, i) {
        if (i < 0 || list.length <= i) {
            return list.sentinel;
        }
        let node = list.sentinel;
        let r = list.height;
        let j =  -1;
        while (r >= 0) {
            if (node.length[r] === undefined) {
                node.length[r] = 0;
            }
            while (node.next[r] !== undefined
                && j + node.length[r] < i
            ) {
                j += node.length[r];
                node = node.next[r];
            }
            r -= 1;
        }
        return node.next[0];
    },
    /**
    get T :: (SkipListList T, number [uint]) -> maybe T */
    get(list, i) {
        return (SkipListList.getNode(list, i)).value;
    },
    /**
    set T :: (SkipListList T, number [uint], T) -> maybe T */
    set(list, i, v) {
        const node = SkipListList.getNode(list, i);
        const y = node.value;
        if (node !== list.sentinel) {
            node.value = v;
        }
        return y;
    },
    // The return is always minor than the MAX_HEIGHT
    /**
    pickHeight :: () -> return number [uint] */
    pickHeight() {
        const z = Math.floor(Math.random() * SkipListList.MAX_RANDOM);
        let k = 0;
        let m = 0b1;
        while ((z & m) !== 0b0) {
            k += 1;
            m <<= 1;
        }
        return k;
    },
    /**
    add T :: (SkipListList T, number [uint], T) -> SkipListList T */
    add(list, i, value) {
        if (i < 0) {
            i = 0;
        } else if (list.length < i) {
            i = list.length;
        }
        const newNodeHeight = SkipListList.pickHeight();
        const newNode = {
            height: newNodeHeight,
            next: Array(newNodeHeight + 1),
            length: Array(newNodeHeight + 1),
            value
        };
        if (list.height < newNodeHeight) {
            list.height = newNodeHeight;
        }
        let node = list.sentinel;
        let r = list.height;
        let j = -1;
        while (r >= 0) {
            if (node.length[r] === undefined) {
                node.length[r] = 0;
            }
            while (node.next[r] !== undefined
                && j + node.length[r] < i
            ) {
                j += node.length[r];
                node = node.next[r];
            }
            node.length[r] += 1;
            if (r <= newNodeHeight) {
                newNode.next[r] = node.next[r];
                node.next[r] = newNode;
                newNode.length[r] = node.length[r] - (i - j);
                node.length[r] = i - j;
            }
            r -= 1;
        }
        list.length += 1;
        return list;
    },
    /**
    remove T :: (SkipListList T, number [uint]) -> T */
    remove(list, i) {
        if (i < 0) {
            i = 0;
        } else if (list.length <= i) {
            i = list.length - 1;
        }
        let node = list.sentinel;
        let r = list.height;
        let j = -1;
        let value;
        while (r >= 0) {
            if (node.length[r] === undefined) {
                node.length[r] = 0;
            }
            while (node.next[r] !== undefined
                && j + node.length[r] < i
            ) {
                j += node.length[r];
                node = node.next[r];
            }
            node.length[r] -= 1;
            if (node.next[r] !== undefined
                && j + node.length[r] + 1 === i
            ) {
                value = node.next[r].value;
                node.length[r] = node.length[r] + node.next[r].length[r];
                node.next[r] = node.next[r].next[r];
                if (node === list.sentinel
                    && node.next[r] === undefined
                ){
                    list.height -= 1;
                }
            }
            r -= 1;
        }
        list.length -= 1;
        return value;
    }
});

export default SkipListList;