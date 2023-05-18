/**
 * Author: Axel Ariel Saravia
 */

/**
DoubleNode<T> :: {
    value: T,
    prev: DoubleNode<T>,
    next: DoubleNode<T>
}
*/
/**
DummyNode<T> :: {
    ...DoubleNode<T>,
    value: undefined,
}
*/
/**
DoubleLinkList<T> :: {
    length: number [uint],
    dummy: DummyNode<T>
}
*/

const DLList = Object.freeze({
    /**
    create :: () -> DoubleLinkList<T> */
    create() {
        const dummy = Object.seal({
            value: undefined,
            prev: undefined,
            next: undefined
        });
        dummy.prev = dummy;
        dummy.next = dummy;
        return Object.seal({
            length: 0,
            dummy
        });

    },
    /**
    getNode :: (DoubleLinkList<T>, number[uint]) -> DoubleLinkList<T> */
    getNode(list, i) {
        let node;
        if (i < 0) {
            i = (i * (-1)) - 1;
        }
        if (list.length && list.length <= i) {
            i = (i - 1) % list.length;
        }
        if (i < list.length / 2) {
            node = list.dummy.next;
            while (i > 0) {
                node = node.next;
                i -= 1;
            }
        } else {
            let j = list.length - i;
            node = list.dummy;
            while (j > 0) {
                node = node.prev;
                j -= 1;
            }
        }
        return node;
    },
    /**
    get :: (DoubleLinkList<T>, number[uint]) -> T */
    get(list, i) {
        return DLList.getNode(list, i).value;
    },
    /**
    set :: (DoubleLinkList<T>, number[uint], T) -> T */
    set(list, i, x) {
        const node = DLList.getNode(list, i);
        const res = node.value;
        node.value = x;
        return res;
    },
    /**
    add :: (DoubleLinkList<T>, number[uint], T) -> DoubleLinkList<T> */
    add(list, i, x) {
        const node = DLList.getNode(list, i);
        const newNode = {
            value: x,
            prev: node.prev,
            next: node
        };
        newNode.next.prev = newNode;
        newNode.prev.next = newNode;
        list.length += 1;
        return list;
    },
    /**
    remove :: (DoubleLinkList<T>, number[uint]) -> T */
    remove(list, i) {
        const node = DLList.getNode(list, i);
        const value = node.value;
        node.prev.next = node.next;
        node.next.prev = node.prev;
        list.length -= 1;
        return value;
    },
    /**
    clear :: (DoubleLinkList<T>) -> undefined */
    clear(list) {
        list.length = 0
        list.dummy.prev = list.dummy;
        list.dummy.next = list.dummy;
    }
});

export default DLList;