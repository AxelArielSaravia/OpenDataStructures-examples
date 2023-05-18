/**
 * Author: Axel Ariel Saravia
 */

import BoundedArrayDeque from "../array/deque-bounded.js";
/**
ArrayDoubleNode<T> :: DoubleNode<Array<T>>
DoubleLinkEList<T> :: {
    capacity: number [uint > 0],
    dummy: BoundedDeque<T>,
    length: number [uint],
    [Symbol<"selected">]: [ BoundedDeque<T>, number [iont] ]
}
*/

const selected = Symbol("selected");


const SEList = Object.freeze({
    /**
    create :: (number [uint > 0]) -> DoubleLinkEList<T> */
    create(capacity) {
        if (typeof capacity !== "number" || capacity < 4) {
            capacity = 4;
        }
        const dummy = Object.seal({
            value: undefined,
            prev: undefined,
            next: undefined
        });
        dummy.prev = dummy;
        dummy.next = dummy;
        return {
            capacity,
            dummy,
            length: 0,
           [selected]: Array(2),
        };
    },
    /**
    selectBlock :: (DoubleLinkEList<T>, number [uint]) -> DoubleLinkEList<T> */
    selectBlock(list, i) {
        let node = list.dummy;
        if (i < list.length / 2) {
            node = node.next;
            while (node.value.length <= i) {
                i -= node.value.length;
                node = node.next;
            }
        } else {
            idx = list.length;
            while (i < idx) {
                node = node.prev;
                idx -= node.value.length;
            }
            i -= idx;
        }
        list[selected][0] = node;
        list[selected][1] = i;
        return list;
    },
    /**
    get :: (DoubleLinkEList<T>, number [uint]) -> maybe<T> */
    get(list, i) {
        if (i < 0 || list.length <= i) {
            return;
        }
        SEList.selectBlock(list, i);
        return BoundedArrayDeque.get(
            list[selected][0].value,
            list[selected][1]
        );
    },
    /**
    set :: (DoubleLinkEList<T>, number [uint], T) -> maybe<T> */
    set(list, i, x) {
        if (i < 0 || list.length <= i) {
            return;
        }
        SEList.selectBlock(list, i);
        return BoundedArrayDeque.set(
            list[selected][0].value,
            list[selected][1],
            x
        );
    },
    /**
    addBefore :: (DoubleLinkEList<T>) -> ArrayDoubleNode<T> */
    addBefore(list) {
        const node = {
            value: BoundedArrayDeque.create(list.capacity),
            prev: list.dummy.prev,
            next: list.dummy
        };
        list.dummy.prev = node;
        return node;
    },
    /**
    append :: (DoubleLinkEList<T>, T) -> DoubleLinkEList<T> */
    append(list, x) {
        const last = list.dummy.prev;
        if (last === list.dummy
            || last.value.length === list.capacity
        ) {
            last = SEList.addBefore(list);
        }
        BoundedArrayDeque.add( //add to end
            last.value,
            last.value.length,
            x
        );
        list.length += 1;
        return list;
    },
    /**
    add :: (DoubleLinkEList<T>, number [uint], T) -> DoubleLinkEList<T> */
    add(list, i, x) {
        if (i < 0) {
            i = 0;
        } else if (list.length < i) {
            i = list.length;
        }
        if (i === list.length) {
            SEList.append(list, x);
            return list;
        }
        SEList.selectBlock(list, i);
        const selected = list[selected][0];
        const b = list.capacity - 1;
        let node = selected;
        let r = 0;
        while (r < b
            && node !== list.dummy
            && node.value.length === list.capacity
        ) {
            node = node.next;
            r += 1;
        }
        if (r === b) {
            SEList.spread(list);
            node = selected;
        }
        if (node === list.dummy) {
            node = SEList.addBefore(list);
        }
        while (node !== selected) {
            BoundedArrayDeque.add(
                node.value,
                0,
                BoundedArrayDeque.remove(
                    node.value,
                    node.value.length - 1,
                )
            );
            node = node.prev;
        }
        BoundedArrayDeque.add(node.value, list[selected][1], x);
        list.length += 1;
        return list;
    },
    /**
    remove :: (DoubleLinkEList<T>, number [uint]) -> T */
    remove(list, i) {
        if (i < 0) {
            i = 0;
        } else if (list.length < i) {
            i = list.length;
        }
        SEList.selectBlock(list);
        const selected = list[selected][0]; 
        const j = list[selected][1];
        const y = BoundedArrayDeque.get(selected.value, j);
        const b = list.capacity - 1;
        let node = selected;
        let r = 0;
        while (r < list.capacity - 1
            && node !== list.dummy
            && node.value.length === b - 1
        ) {
            node = node.next;
            r += 1;
        }
        if (r === b) {
            SEList.gather(list);
        }
        BoundedArrayDeque.remove(node.value, j);
        while (node.value.length < b - 1
            && node.next !== list.dummy
        ) {
            BoundedArrayDeque.add(
                node.value,
                node.value.length,
                BoundedArrayDeque.remove(
                    node.value,
                    0
                )
            );
            node = node.next;
        }
        if (node.value.length === 0) {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        list.length -= 1;
        return y;
    },
    /**
    spread :: (DoubleLinkEList<T>) -> undefined */
    spread(list) {
        const selected = list[selected][0];
        let node = selected;
        for (let j = 0; j < list.capacity - 2; j += 1) {
            node = node.next;
        }
        node = SEList.addBefore(list);
        while (node !== selected) {
            while (node.value.length < list.capacity - 1) {
                BoundedArrayDeque.add( //add to the start
                    node.value,
                    0,
                    BoundedArrayDeque.remove(
                        node.value,
                        node.value.length - 1,
                    )
                );
            }
            node = node.prev;
        }
    },
    /**
    gather :: (DoubleLinkEList<T>) -> undefined */
    gather(list) {
        const selected = list[selected][0];
        let node = selected;
        for (let j = 0; j < list.capacity - 3; j += 1) {
            while (node.value.length < list.capacity - 1) {
                BoundedArrayDeque.add( //add to the end
                    node.value,
                    node.value.length,
                    BoundedArrayDeque.remove(
                        node.value,
                        0,
                    )
                );
            }
            node = node.next;
        }
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
});

export default SEList;