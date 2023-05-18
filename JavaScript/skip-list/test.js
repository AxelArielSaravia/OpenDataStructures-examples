/**
 * Author: Axel Ariel Saravia
 */

import assert from 'node:assert/strict';
import SkipListList from "./list.js";

// Main Execution
{
    SkipListListTest();
}

//SkipListListTest
function SkipListListTest() {
    const list = SkipListList.create();
    assert(list.length === 0);
    assert(list.height === 0);

    //Add an element to the end
    SkipListList.add(list, list.length, "A");
    assert(list.length === 1);
    assert(list.sentinel.next[0].value === "A");
    assert(list.sentinel.length[0] === 1);

    //Add an element to the end
    SkipListList.add(list, list.length, "B");
    assert(list.length === 2);
    assert(list.sentinel.next[0].next[0].value === "B");

    //Add an element to the end
    SkipListList.add(list, list.length, "C");
    assert(list.length === 3);
    assert(list.sentinel.next[0].next[0].next[0].value === "C");

    //Add an element to the position 1
    SkipListList.add(list, 1, "Z");
    assert(list.length === 4);
    assert(list.sentinel.next[0].next[0].value === "Z");
    assert(list.sentinel.next[0].next[0].next[0].value === "B");
    assert(list.sentinel.next[0].next[0].next[0].next[0].value === "C");

    //Add an element to the end
    SkipListList.add(list, list.length, "D");
    assert(list.length === 5);
    assert(list.sentinel.next[0].next[0].next[0].next[0].next[0].value === "D");

    //The first node must contain "A"
    assert(SkipListList.getNode(list, 0).value === "A");

    //The Second value must be "Z"
    assert(SkipListList.get(list, 1) === "Z");

    //Get undefined
    assert(SkipListList.get(list, 120) === undefined);

    //Set the position 1 with the value X
    assert(SkipListList.set(list, 1, "X") === "Z");
    assert(list.sentinel.next[0].next[0].value === "X");

    //Remove last element
    assert(SkipListList.remove(list, list.length - 1) === "D");
    assert(list.length === 4);
    assert(list.sentinel.next[0].next[0].next[0].next[0].next[0] === undefined);

    //Remove the element at position 1
    assert(SkipListList.remove(list, 1) === "X");
    assert(list.length === 3);
    assert(list.sentinel.next[0].next[0].value === "B");
}