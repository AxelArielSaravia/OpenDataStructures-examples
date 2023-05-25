/**
 * Author: Axel Ariel Saravia
 */

/**
Queue T :: {
    capacity: number [uint > 0]
    content: Array T,
    head: number [uint],
    length: number [uint]
}
*/

const ArrayQueue = Object.freeze({
    /**
    create T :: () -> Queue T */
    create() {
        return Object.seal({
            capacity: 1,
            content: Array(1),
            head: 0,
            length: 0
        });
    },
    /**
    resize T :: (Queue T) -> Queue T */
    resize(queue) {
        const length = queue.length;
        const newCapacity = Math.max(1, 2 * length);
    // this is never true when resize is called from add or remove methods
        if (newCapacity < length) {
            return queue;
        }
        const oldCapacity = queue.capacity;
        let oldHead = queue.head;
        let newHead = oldHead;
        if (oldCapacity < newCapacity) {
    // reallocate
            queue.content.length = newCapacity;
            if (oldCapacity < oldHead + length) {
    // fstLength represents the first part of the queue
    // that is in the bottom of the array
                const fstLength = oldCapacity - oldHead;
    // lstLength represents the last part of the queue
    // that is in the top of the array
                const lstLength = length - fstLength;
                if (lstLength <= (newCapacity - oldCapacity)) {
    // copy the values from the top of the array in to the bottom
                    for (let i = 0; i < lstLength; i += 1) {
                        queue.content[i + oldCapacity] = queue.content[i];
                    }
                } else {
    // copy the values from the bottom of the array in to the top
                    newHead = newCapacity - fstLength;
                    for (let i = 0; i < fstLength; i += 1) {
                        queue.content[i + newHead] = queue.content[i + oldHead];
                    }
                }
            }
    // never can be newCapacity === oldCapacity
        } else {
            let fstLength = length;
            if (oldCapacity < oldHead + length) {
    // we must copy the bottom values at the end of the new array.
    // fstLength represent the first part of the queue
    //that is in the bottom of the array
                fstLength = oldCapacity - oldHead;
                newHead = newCapacity - fstLength;
            } else {
                newHead = 0
            }
            for (let i = 0; i < fstLength; i += 1) {
                queue.content[i + newHead] = queue.content[i + oldHead];
            }
    // reallocate
            queue.content.length = newCapacity;
        }
        queue.head = newHead;
        queue.capacity = newCapacity;
        return queue;
    },
    /**
    size T :: (Queue T) -> number [uint] */
    size(queue) {
        return queue.length;
    },
    /**
    get T :: (Queue T) -> T */
    get(queue) {
        return queue.content[queue.head];
    },
    /**
    add T :: (Queue T, T) -> Queue<T */
    add(queue, x) {
        if (queue.length + 1 > queue.capacity) {
            ArrayQueue.resize(queue);
        }
        const idx = (queue.head + queue.length) % queue.capacity;
        queue.content[idx] =  x;
        queue.length += 1;
        return queue;
    },
    /**
    remove T :: (Queue T) -> T */
    remove(queue) {
        const x = queue.content[queue.head];
        queue.head = (queue.head + 1) % queue.capacity;
        queue.length -= 1;
        if (3 * queue.length <= queue.capacity) {
            ArrayQueue.resize(queue);
        }
        return x;
    },
    /**
    clear T :: (Queue T) -> undefined */
    clear(queue) {
        queue.content = Array(1);
        queue.capacity = 1;
        queue.head = 0;
        queue.length = 0;
    }
});

export default ArrayQueue;