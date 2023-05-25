/**
 * Author: Axel Ariel Saravia
 */

/**
Node<T> :: {
    next: maybe<Node<T>>,
    value: T
}
*/
/**
LinkedList<T> :: {
    length: number [uint],
    head: maybe<Node<T>>,
    tail: maybe<Node<T>>
}
*/

const SLList = Object.freeze({
    /**
    create <T> :: () -> LinkedList<T> */
    create() {
        return Object.seal({
            head: undefined,
            length: 0,
            tail: undefined,
        });
    },
    /**
    push <T> :: (LinkedList<T>, T) -> LinkedList<T> */
    push(list, x) {
        /* node :: Node<T> */
        const node = {
            next: list.head,
            value: x
        };
        list.head = node;
        if (list.length === 0) {
            list.tail = node;
        }
        list.length += 1;
        return list;
    },
    /**
    pop <T> :: (LinkedList<T>) -> maybe<T> */
    pop(list) {
        if (list.length === 0) {
            return;
        }
        const value = list.head.value;
        list.head = list.head.next;
        list.length -= 1;
        if (list.length === 0) {
            list.tail = undefined;
        }
        return value;
    },
    /**
    add <T> :: (LinkedList<T>, T) -> LinkedList<T> */
    add(list, x) {
        const node = {
            next: undefined,
            value: x
        };
        if (list.length === 0) {
            list.head = node;
        } else {
            list.tail.next = node;
        }
        list.tail = node;
        list.length += 1;
        return list;
    },
    /**
    remove <T> :: (LinkedList<T>) -> T */
    remove(list) {
        return SLList.pop(list);
    },
    /**
    removeFromTail <T> :: (LinkedList<T>) -> T*/
    removeFromTail(list) {
        if (list.length === 0) {
            return;
        }
        const value = list.tail.value;
        if (list.length === 1) {
            SLList.clear(list);
        } else {
            let newTail = list.head;
            for (let i = 2; i < list.length; i += 1) {
                newTail = newTail.next;
            }
            newTail.next = undefined;
            list.tail = newTail;
            list.length -= 1;
        }
        return value;
    },
    /**
    clear <T> :: (LinkedList<T>) -> LinkedList<T> */
    clear(list) {
        list.head = undefined;
        list.tail = undefined;
        list.length = 0;
        return list;
    }
});

export default SLList;