/**
 * Author: Axel Ariel Saravia
 */

/**
BoundedDeque T :: {
    capacity: number[uint > 0],
    content: Array T,
    head: number[uint],
    length: number[uint]
}
*/

const BoundedArrayDeque = Object.freeze({
    /**
    create T :: () -> BoundedDeque T */
    create(capacity) {
        if (typeof capacity !== "number" || capacity < 4) {
            capacity = 4;
        }
        return Object.seal({
            capacity,
            content: Array(capacity),
            head: 0,
            length: 0
        });
    },
    /**
    get T :: (BoundedDeque T, number [uint]) -> maybe T */
    get(deque, i) {
        if (0 <= i && i < deque.length) {
            const j = (i + deque.head) % deque.capacity;
            return deque.content[j];
        }
    },
    /**
    set T :: (BoundedDeque T, number [uint], T) -> maybe T */
    set(deque, i, x) {
        if (0 <= i && i < deque.length) {
            const j = (i + deque.head) % deque.capacity;
            const y = deque.content[j];
            deque.content[j] = x;
            return y;
        }
    },
    /**
    add T :: (BoundedDeque T, number [uint], T) -> BoundedDeque T */
    add(deque, i, x) {
        if (deque.length === deque.capacity) {
            return deque;
        }
        if (0 < i) {
            i = 0;
        } else if (deque.length < i) {
            i = deque.length;
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
    remove T :: (BoundedDeque T, number [uint]) -> maybe T */
    remove(deque, i) {
        if (deque.length === 0) {
            return;
        }
        if(0 < i) {
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
        return x;
    },
    /**
    clear T :: (BoundedDeque T) -> undefined */
    clear(deque) {
        deque.head = 0;
        deque.length = 0;
    }
});

export default BoundedArrayDeque;