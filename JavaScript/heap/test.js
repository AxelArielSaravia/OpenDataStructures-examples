/**
 * Author: Axel Ariel Saravia
 */

import assert from "node:assert/strict";
import BinaryHeap from "./binary.js";
import MeldableHeap from "./meldalbe.js";

{ //main
    //BinaryHeapTest();
    MeldableHeapTest();
}

function MeldableHeapTest() {
    const mh = MeldableHeap.create();

    assert(MeldableHeap.add_recursive(mh, 26));
    assert(mh.elements === 1);
    assert(MeldableHeap.add(mh, 9));
    assert(mh.elements === 2);
    assert(MeldableHeap.add(mh, 50));
    assert(mh.elements === 3);
    assert(MeldableHeap.add(mh, 16));
    assert(mh.elements === 4);
    assert(MeldableHeap.add(mh, 55));
    assert(mh.elements === 5);
    assert(MeldableHeap.add(mh, 19));
    assert(mh.elements === 6);
    assert(MeldableHeap.add(mh, 4));
    assert(mh.elements === 7);
    assert(MeldableHeap.add(mh, 8));
    assert(mh.elements === 8);
    assert(MeldableHeap.add(mh, 17));
    assert(mh.elements === 9);


    assert(MeldableHeap.remove(mh));
    assert(mh.elements === 8);

    const mhn1 = MeldableHeap.createNode(
        4,
        MeldableHeap.createNode(
            9,
            MeldableHeap.createNode(
                17,
                MeldableHeap.createNode(19)
            ),
            MeldableHeap.createNode(26)
        ),
        MeldableHeap.createNode(
            8,
            MeldableHeap.createNode(
                50,
                MeldableHeap.createNode(55)
            ),
            MeldableHeap.createNode(16)
        )
    );
    const mhn2 = MeldableHeap.createNode(
        19,
        MeldableHeap.createNode(
            25,
            undefined,
            MeldableHeap.createNode(
                28,
                MeldableHeap.createNode(32),
                MeldableHeap.createNode(93)
            )
        ),
        MeldableHeap.createNode(
            20,
            MeldableHeap.createNode(
                89,
                MeldableHeap.createNode(99)
            )
        )
    );

    MeldableHeap.mod_merge(mhn1, mhn2);
}


/** get T :: (Array T) -> T */
function get(a) {
    if (this.i < a.length) {
        const res = a[this.i];
        this.i += 1;
        return res;
    }
}
/** reset :: () -> undefined */
function reset() { this.i = 0; }
function createArrayGenerator() {
    return {
        i: 0,
        get,
        reset,
    };
}
function BinaryHeapTest() {
    const A = [4,9,8,17,26,50,16,19,69,32,93,55];
    {//random sort
        let x = 20;
        while (x > 0) {
            let i  = Math.floor(Math.random() * A.length);
            const end = Math.floor(Math.random() * (A.length - 1 - i) + i);
            while (i <= end) {
                const j = Math.floor(Math.random() * A.length);
                const temp = A[i];
                A[i] = A[j];
                A[j] = temp;
                i += 1;
            }
            x -= 1;
        }
    }
    const g = createArrayGenerator();
    const SIZE = 10;
    const bh = BinaryHeap.create(SIZE);
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));
    assert(BinaryHeap.add(bh, g.get(A)));

    //the heap is full
    assert(!BinaryHeap.add(bh, g.get(A)));

    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);
    assert(BinaryHeap.remove(bh) !== undefined);

    //the heap is empty
    assert(BinaryHeap.remove(bh) === undefined);

}