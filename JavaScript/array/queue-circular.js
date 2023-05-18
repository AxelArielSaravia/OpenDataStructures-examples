/**
 * Author: Axel Ariel Saravia
 */

/**
FixedArray<T> :: {
    length: number [uint]
    [0..]: T
}

*/
/**
CircularQueue<T> :: {
    capacity: number [uint > 0],
    content: FixedArray<T>,
    head: number [uint],
    length: number [uint]
}
*/

/**
createFixedArray :: (number [uint > 0]) -> FixedArray<T> */
function createFixedArray(capacity) {
    if (!Number.isSafeInteger(capacity) || capacity < 1) {
        throw new Error("capacity is not a unsigned integer");
    }
    const arr = {
        length: capacity,
    };
    for (let i = 0; i < capacity; i += 1) {
        arr[i] = undefined;
    }
    return Object.seal(arr);
}

const CircularArrayQueue = Object.freeze({
    /**
    create :: (number [uint > 0]) -> CircularQueue<T> */
    create(capacity) {
        return Object.seal({
            capacity: capacity,
            content: createFixedArray(capacity),
            head: 0,
            length: 0
        });
    },
    /**
    add :: (CircularQueue<T>, T) -> boolean */
    add(queue, x) {
        if (queue.length !== queue.capacity) {
            queue.content[queue.head] = x;
            queue.head = (queue.head + 1) % queue.capacity;
            queue.length += 1;
            return true;
        } else {
            return false;
        }
    },
    /**
    remove :: (CircularQueue<T>) -> boolean */
    remove(queue) {
        if (queue.length > 0) {
            queue.length -= 1;
            return true;
        } else {
            return false;
        }
    }
});

export default CircularArrayQueue;