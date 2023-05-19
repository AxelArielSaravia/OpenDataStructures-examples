/**
 * Author: Axel Ariel Saravia
 */

import assert from "node:assert/strict";
import ChainedHashTable from "./chained.js";
import LinearHashTable from "./linear.js";

// Main Execution
{
    //ChainedHashTableTest();
    LinearHashTableTest();
}

function LinearHashTableTest() {
    //create data
    const HTable = LinearHashTable.create();
    assert(HTable.elements === 0);
    assert(HTable.capacity === 2);
    assert(HTable.tword === 1);

    //find no stored value return false
    assert(!LinearHashTable.find(HTable, 43));

    //add 23
    assert(LinearHashTable.add(HTable, 23));
    assert(HTable.elements === 1)
    assert(LinearHashTable.find(HTable, 23));

    //add a 13 return true and resize
    assert(LinearHashTable.add(HTable, 13));
    assert(HTable.elements === 2);
    assert(HTable.tword === 2);
    assert(HTable.capacity === 4);
    assert(LinearHashTable.find(HTable, 13));

    //add an existin value return false
    assert(!LinearHashTable.add(HTable, 13));
    assert(HTable.elements === 2);

    //add a 489 return true and resize
    assert(LinearHashTable.add(HTable, 489));
    assert(HTable.elements === 3);
    assert(HTable.tword === 3);
    assert(HTable.capacity === 8);
    assert(LinearHashTable.find(HTable, 489));

    //remove an not stored value return false
    assert(!LinearHashTable.remove(HTable, 889));

    //remove 13
    assert(LinearHashTable.remove(HTable, 13));
    assert(HTable.elements === 2);

    //find 13 return false
    assert(!LinearHashTable.find(HTable, 13));
}

// ChainedHashTable TEST
function ChainedHashTableTest() {
    //create data
    const HTable = ChainedHashTable.create();
    assert(HTable.elements === 0);
    assert(HTable.capacity === 2);
    assert(HTable.tword === 1);

    //find no stored value return false
    assert(!ChainedHashTable.find(HTable, 23));

    //add 23
    assert(ChainedHashTable.add(HTable, 23));
    assert(HTable.elements === 1);
    assert(ChainedHashTable.find(HTable, 23));
    
    //add a 13 return true
    assert(ChainedHashTable.add(HTable, 13));
    assert(HTable.elements === 2);
    assert(ChainedHashTable.find(HTable, 13));

    //add an existin value return false
    assert(!ChainedHashTable.add(HTable, 13));
    assert(HTable.elements === 2);

    //add a 489 return true and resize 
    assert(ChainedHashTable.add(HTable, 489));
    assert(HTable.elements === 3);
    assert(HTable.tword === 2);
    assert(HTable.capacity === 4);
    assert(ChainedHashTable.find(HTable, 489));

    //remove an not stored value return false
    assert(!ChainedHashTable.remove(HTable, 889));

    //remove 13
    assert(ChainedHashTable.remove(HTable, 13));
    assert(HTable.elements === 2);
    //find 13 return false
    assert(!ChainedHashTable.find(HTable, 13));
}