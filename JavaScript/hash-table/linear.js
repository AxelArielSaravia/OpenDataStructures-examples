/**
 * Author: Axel Ariel Saravia
 */

// This Chained Hash Table implements a linear probing,
// thats means, we only use one array to store data

// This version do not use del values

// In this case an integer hash code is associated with
// data item and is used in the hash table

/**
LinearHashTable :: {
    capacity: number[uint > 0],
    elements: number[uint],
    table: Array<number[int]>,
    tword: number[1 < uint <= 32],
    randOdd: number[uint & 1 !== 0]
}
*/

const LinearHashTable = Object.freeze({
    WORD: 32,
    MAX_N: 4294967296,
    /**
    create :: () -> LinearHashTable */
    create() {
        //random odd number between 1 and (2**WORD - 1)
        let randOdd = Math.floor(Math.random() * (LinearHashTable.MAX_N - 1));
        if (randOdd % 2 === 0) {
            randOdd += 1;
        }
        return Object.seal({
            capacity: 2,        //the length of the table array
            elements: 0,        //counter of values inside the table (commonly named n, length or size)
            table: Array(2),    //Array of 2**tword length
            tword: 1,           //is the array length bit word, must be in the range of 1..WORD
            randOdd: 4102541685,//random odd number for the hash function (test 4102541685)
        });
    },
    /**
    -- Multuplicative hashing method
    hash :: (LinearHashTable, number[int32]) -> number[uint] */
    hash(htable, value) {
        return Math.floor(
            ((htable.randOdd * value) % LinearHashTable.MAX_N)
            / (2**(LinearHashTable.WORD - htable.tword))
        );
    },
    /**
    find :: (LinearHashTable, number[int]) -> boolean */
    find(htable, value) {
        let i = LinearHashTable.hash(htable, value);
        while (htable.table[i] !== undefined) {
            if (htable.table[i] === value) {
                return true;
            }
            i = (i + 1) % htable.capacity;
        }
        return false;
    },
    /**
    add :: (LinearHashTable, number[uint]) -> boolean */
    add(htable, value) {
        if (LinearHashTable.find(htable, value)) {
            return false;
        }
        if (htable.capacity < 2 * (htable.elements + 1)) {
            LinearHashTable.resize(htable);
        }
        let i = LinearHashTable.hash(htable, value);
        while (htable.table[i] !== undefined) {
            i = (i + 1) % htable.capacity;
        }
        htable.elements += 1;
        htable.table[i] = value;
        return true;
    },
    /**
    remove :: (LinearHashTable, number[uint]) -> boolean */
    remove(htable, value) {
        let i = LinearHashTable.hash(htable, value);
        while (htable.table[i] !== undefined) {
            const y = htable.table[i];
            if (value === y) {
                htable.table[i] = undefined;
                htable.elements -= 1
                if (8 * htable.elements < htable.capacity) {
                    LinearHashTable.resize(htable);
                }
                return true;
            }
            i = (i + 1) % htable.capacity;
        }
        return false; 
    },
    /**
    resize :: (LinearHashTable) -> undefined */
    resize(htable) {
        let d = 1;
        let newCapacity = 2;
        while (newCapacity < 3 * htable.elements) {
            d += 1;
            newCapacity *= 2;
        }
        htable.tword = d;
        const newTable = Array(newCapacity);
        for (const value of htable.table) {
            if (value !== undefined) {
                let i = LinearHashTable.hash(htable, value);
                while (newTable[i] !== undefined) {
                    i = (i + 1) % newCapacity
                }
                newTable[i] = value;
            }
        }
        htable.capacity = newCapacity;
        htable.table = newTable;
    }
});

export default LinearHashTable;