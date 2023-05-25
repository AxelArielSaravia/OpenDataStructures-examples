/**
 * Author: Axel Ariel Saravia
 */

import ArrayStack from "./stack.js";

/**
DualDeque T :: {
    front: Stack T
    back: Stack T
}
*/

const DualArrayDeque = Object.freeze({
    /**
    create T :: () -> DualDeque T */
    create() {
        return Object.seal({
            front: ArrayStack.create(),
            back: ArrayStack.create()
        });
    },
    /**
    balance T :: (DualDeque T) -> DualDeque T */
    balance(deque) {
        const n = DualArrayDeque.size(deque);
        const mid = Math.floor(n / 2);
        if (
            3 * deque.front.length < deque.back.length
            || 3  * deque.back.length < deque.front.length
        ) {
            const f = ArrayStack.create();
            const b = ArrayStack.create();
            for (let i = 0; i < mid; i += 1) {
                ArrayStack.add(
                    f,
                    i,
                    DualArrayDeque.get(deque, mid - i - 1)
                );
            }
            for (let i = 0; i < n - mid; i += 1) {
                ArrayStack.add(
                    b,
                    i,
                    DualArrayDeque.get(deque, mid + i)
                );
            }
            deque.front = f;
            deque.back = b;
        }
        return deque;
    },
    /**
    size T :: (DualDeque T) -> number[uint] */
    size(deque) {
        return deque.front.length + deque.back.length
    },
    /**
    get T :: (DualDeque T, number [uint]) -> maybe T */
    get(deque, i) {
        return (
            i < deque.front.length
            ? ArrayStack.get(front, deque.front.length - i - 1)
            : this.back.get(i - this.front.size())
        );
    },
    /**
    add T :: (DualDeque T, number [uint], T) -> DualDeque T */
    add(deque, i, x) {
        if (i < deque.front.length) {
            ArrayStack.add(
                deque.front,
                deque.front.length - i,
                x
            );
        } else {
            ArrayStack.add(
                deque.back,
                i - deque.front.length,
                x
            );
        }
        return DualArrayDeque.balance(deque);
    },
    /**
    remove T :: (DualDeque T, number [uint]) -> T */
    remove(deque, i) {
        const x = (
            i < deque.front.length
            ? ArrayStack.remove(deque.front, deque.front.length - i - 1)
            : ArrayStack.remove(deque.back, i - deque.front.length)
        );
        DualArrayDeque.balance(deque);
        return x;
    }
});

export default DualArrayDeque;