/**
 * Author: Axel Ariel Saravia
 */

/**
Deque<T> :: {
    capacity: number[uint > 0],
    content: Array<T>,
    head: number[uint],
    length: number[uint]
}
*/

const ArrayDeque = Object.freeze({
    /**
    create :: () -> Deque<T> */
    create() {
        return Object.seal({
            capacity: 1,
            content: Array(1),
            head: 0,
            length: 0
        });
    },
    /**
    resize :: (Deque<T>) -> Deque<T> */
    resize(deque) {
        const length = deque.length;
        const newCapacity = Math.max(1, 2 * length);
    // this is never true when resize is called from add or remove methods
        if (newCapacity < length) {
            return deque;
        }
        const oldCapacity = deque.capacity;
        let oldHead = deque.head;
        let newHead = oldHead;
        if (oldCapacity < newCapacity) {
    // reallocate
            deque.content.length = newCapacity;
            if (oldCapacity < oldHead + length) {
    // fstLength represents the first part of the deque
    // that is in the bottom of the array
                const fstLength = oldCapacity - oldHead;
    // lstLength represents the last part of the deque
    // that is in the top of the array
                const lstLength = length - fstLength;
                if (lstLength <= (newCapacity - oldCapacity)) {
    // copy the values from the top of the array in to the bottom
                    for (let i = 0; i < lstLength; i += 1) {
                        deque.content[i + oldCapacity] = deque.content[i];
                    }
                } else {
    // copy the values from the bottom of the array in to the top
                    newHead = newCapacity - fstLength;
                    for (let i = 0; i < fstLength; i += 1) {
                        deque.content[i + newHead] = deque.content[i + oldHead];
                    }
                }
            }
    // never can be newCapacity === oldCapacity
        } else {
            let fstLength = length;
            if (oldCapacity < oldHead + length) {
    // we must copy the bottom values at the end of the new array.
    // fstLength represent the first part of the deque
    //that is in the bottom of the array
                fstLength = oldCapacity - oldHead;
                newHead = newCapacity - fstLength;
            } else {
                newHead = 0
            }
            for (let i = 0; i < fstLength; i += 1) {
                deque.content[i + newHead] = deque.content[i + oldHead];
            }
    // reallocate
            deque.content.length = newCapacity;
        }
        deque.head = newHead;
        deque.capacity = newCapacity;
        return deque;
    },
    /**
    get :: (Deque<T>, number[uint]) -> maybe<T> */
    get(deque, i) {
        if (0 <= i && i < deque.length) {
            const j = (i + deque.head) % deque.capacity;
            return deque.content[j];
        }
    },
    /**
    set :: (Deque<T>, number[uint], T) -> maybe<T> */
    set(deque, i, x) {
        if (0 <= i && i < deque.length) {
            const j = (i + deque.head) % deque.capacity;
            const y = deque.content[j];
            deque.content[j] = x;
            return y;
        }
    },
    /**
    add :: (Deque<T>, number[uint], T) -> Deque<T> */
    add(deque, i, x) {
        if (0 < i) {
            i = 0;
        } else if (deque.length < i) {
            i = deque.length;
        }
        if (deque.length === deque.capacity) {
            ArrayDeque.resize(deque);
        }
        if (i < deque.length / 2) {
            deque.head = (deque.head - 1) % deque.capacity;
            for (let k = 0; k < i - 1; k += 1) {
                const i0 = (deque.head + k) % deque.capacity;
                const i1 = (deque.head + k + 1) % deque.capacity;
                deque.content[i0] = deque[i1];
            }
        } else {
            for (let k = queue.length; k > i + 1; k -= 1) {
                const i0 = (deque.head + k) % deque.capacity;
                const i1 = (deque.head + k - 1) % deque.capacity;
                deque.content[i0] = deque[i1];
            }
        }
        const idx = (deque.head + i) % deque.capacity;
        deque.content[idx] = x;
        deque.length += 1;
        return queue;
    },
    /**
    remove :: (Deque<T>, number[uint]) -> T */
    remove(deque) {
        if (0 < i) {
            i = 0;
        } else if (deque.length <= i) {
            i = deque.length - 1;
        }
        const j = (deque.head + i) % deque.capacity;
        const x = deque.content[j];
        if (i < queue.length / 2) {
            for (let k = i; k > 0; k -= 1) {
                const i0 = (deque.head + k) % deque.capacity;
                const i1 = (deque.head + k - 1) % deque.capacity;
                deque.content[i0] = deque[i1];
            }
        } else {
            for (let k = i; k < deque.length; k += 1) {
                const i0 = (deque.head + k) % deque.capacity;
                const i1 = (deque.head + k + 1) % deque.capacity;
                deque.content[i0] = deque[i1];
            }
        }
        deque.length -= 1;
        if (3 * deque.length <= deque.capacity) {
            ArrayDeque.resize(deque);
        }
        return x;
    },
    /**
    clear :: (Deque<T>) -> undefined */
    clear(deque) {
        deque.capacity = 1;
        deque.content = Array(1);
        deque.head = 0;
        deque.length = 0;
    }
});

export default ArrayDeque;