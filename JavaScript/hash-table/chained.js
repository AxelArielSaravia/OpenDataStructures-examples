/**
 * Author: Axel Ariel Saravia
 */

import {ArrayStack2} from "../array/stack.js";

// This Chained Hash Table implements an Array of ArrayStacks

// In this case an integer hash code is associated with
// data item and is used in the hash table

/**
ChainedHashTable :: {
    capacity: number[uint > 0],
    elements: number[uint],
    table: Array<DoubleLinkList<number[int32]>>,
    tword: number[1 < uint <= 32],
    randOdd: number[uint & 1 !== 0]
}
*/



const ChainedHashTable = Object.freeze({
    WORD: 32,
    MAX_N: 4294967296, // 2**WORD
    /**
    create :: () -> ChainedHashTable */
    create() {
        //random odd number between 1 and (2**WORD - 1)
        let randOdd = Math.floor(Math.random() * (ChainedHashTable.MAX_N - 1));
        if (randOdd % 2 === 0) {
            randOdd += 1;
        }
        return Object.seal({
            capacity: 2,        //the length of the table, its value is 2**tword
            elements: 0,        //counter of the values inside the table, (commonly named n, length or size)
            table: Array(2),    //Array of 2**tword length
            tword: 1,           //is the array length bit word, must be in the range of 1..WORD
            randOdd             //random odd number for the hash function (test 4102541685)
        });
    },
    /**
    -- Multuplicative hashing method
    hash :: (ChainedHashTable, number[int32]) -> number[uint] */
    hash(htable, value) {
        return Math.floor(
            ((htable.randOdd * value) % ChainedHashTable.MAX_N)
            / (2**(ChainedHashTable.WORD - htable.tword))
        );
    },
    /**
    find :: (ChainedHashTable, number[int32]) -> boolean */
    find(htable, value) {
        const hash = ChainedHashTable.hash(htable, value);
        const list = htable.table[hash];
        if (list === undefined) {
            return false;
        }
        for (let y = 0; y < list.length; y += 1) {
            const listValue = list.content[y];
            if (listValue === value) {
                return true; 
            }
        }
        return false;
    },
    /**
    add :: (ChainedHashTable, number[int32]) -> boolean */
    add(htable, value) {
        if (ChainedHashTable.find(htable, value)) {
            return false;
        }
        if (htable.capacity < htable.elements + 1) {
            ChainedHashTable.resize(htable);
        }
        const hash = ChainedHashTable.hash(htable, value);
        if (htable.table[hash] === undefined) {
            htable.table[hash] = ArrayStack2.create();
        }
        let list = htable.table[hash];
        ArrayStack2.add(list, list.length, value);
        htable.elements += 1;
        return true;
    },
    /**
    remove :: (ChainedHashTable, number[int32]) -> maybe<number[int32]> */
    remove(htable, value) {
        const hash = ChainedHashTable.hash(htable, value);
        const list = htable.table[hash];
        if (list !== undefined) {
            for (let y = 0; y < list.length; y += 1) {
                const listValue = list.content[y];
                if (listValue === value) {
                    ArrayStack2.remove(list, y);
                    htable.elements -= 1;
                    if (3 * htable.elements < htable.capacity) {
                        ChainedHashTable.resize(htable);
                    }
                    return true;
                }
            }
        }
        return false;
    },
    /**
    resize :: (ChainedHashTable) -> ChainedHashTable */
    resize(htable) {
        if (htable.elements === htable.capacity) {
            htable.tword += 1;
        } else {
            htable.tword -= 1;
        }
        const newCapacity = 2**htable.tword;
        const b = Array(newCapacity);
        for (const list of htable.table) {
            if (list !== undefined) {
                for (let j = 0; j < list.length; j += 1) {
                    const listValue = list.content[j];
                    const hash = ChainedHashTable.hash(htable, listValue);
                    if (b[hash] === undefined) {
                        b[hash] = ArrayStack2.create();
                    }
                    ArrayStack2.add(b[hash], b[hash].length, listValue);
                }
            }
        }
        htable.table = b;
        htable.capacity = newCapacity;
        return htable;
    }
});

export default ChainedHashTable;