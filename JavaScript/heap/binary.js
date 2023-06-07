/**
 * Author: Axel Ariel Saravia
 */

/*
BinaryHeap T :: {
    content: Array T
    len: number [uint]
}
*/
const BinaryHeap = {
    /**
    create T :: (number [uint]) -> BinaryHeap T */
    create(size) {
        return {
            content: Array(size),
            len: 0
        };
    },
    /**
    add T :: (BinaryHeap T, T) -> boolean */
    add(bh, x) {
        if (bh.content.length === bh.len) {
            return false;
        }
        bh.content[bh.len] = x;
        bh.len += 1;
        BinaryHeap.bubbleUp(bh, bh.len - 1);
        return true;
    },
    /**
    bubbleUp T :: (BinaryHeap T, number [uint]) -> undefined */
    bubbleUp(bh,i) {
        let p = Math.floor((i - 1) / 2); //parent index
        const a = bh.content;
        while (0 < i && a[i] < a[p]) {
            const temp = a[p];
            a[p] = a[i];
            a[i] = temp;
            i = p;
            p = Math.floor((i - 1) / 2);
        }
    },
    /**
    remove T :: (BinaryHeap T) -> maybe T*/
    remove(bh) {
        if (bh.len > 0) {
            const x = bh.content[0];
            bh.content[0] = bh.content[bh.len - 1];
            bh.len -= 1;
            BinaryHeap.trickleDown(bh, 0);
            return x;
        }
    },
    /**
    trickleDown T :: (BinaryHeap T, number) -> undefined */
    trickleDown(bh, i) {
        const a = bh.content;
        while (0 <= i) {
            let j = -1;
            let r = 2 * (i + 1) //right index
            let l = (2 * i) + 1; //left index
            if (r < bh.len && a[r] < a[i]) {
                if (a[l] < a[r]) {
                    j = l;
                } else {
                    j = r;
                }
            } else {
                if (l < bh.len && a[l] < a [i]) {
                    j = l;
                }
            }
            if (0 <= j) {
                const temp = a[j];
                a[j] = a[i];
                a[i] = temp;
            }
            i = j;
        }
    }
};

export default BinaryHeap;