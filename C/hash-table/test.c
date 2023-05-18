# include <assert.h>

# include "chained.c"

void hashTableChainedTest(void);

int main() {
    hashTableChainedTest();
    return 0;
}

void hashTableChainedTest(void) {
    hashTableChained htable = {0};
    assert(hashTableChained_init(&htable));

    //find no stored value return false
    assert(!hashTableChained_find(&htable, 23));


    //add 23
    assert(hashTableChained_add(&htable, 23));
    assert(htable.length == 1);
    assert(hashTableChained_find(&htable, 23));
    
    //add a 13 return true
    assert(hashTableChained_add(&htable, 13));
    assert(htable.length == 2);
    assert(hashTableChained_find(&htable, 13));

    //add an existin value return false
    assert(!hashTableChained_add(&htable, 13));
    assert(htable.length == 2);

    assert(hashTableChained_add(&htable, 33));
    assert(htable.length == 3);

    assert(hashTableChained_add(&htable, 43));
    assert(htable.length == 4);

    assert(hashTableChained_add(&htable, 53));
    assert(htable.length == 5);

    assert(hashTableChained_add(&htable, 63));
    assert(htable.length == 6);

    assert(hashTableChained_add(&htable, 73));
    assert(htable.length == 7);

    assert(hashTableChained_add(&htable, 83));
    assert(htable.length == 8);

    //add a 489 return true and resize 
    assert(hashTableChained_add(&htable, 489));
    assert(htable.length == 9);
    assert(htable.tword == 4);
    assert(htable.capacity == 16);
    assert(hashTableChained_find(&htable, 489));

    //remove an not stored value return undefined
    assert(!hashTableChained_remove(&htable, 889));

    //remove 13
    assert(hashTableChained_remove(&htable, 13));
    assert(htable.length == 8);

    //find 13 return false
    assert(!hashTableChained_find(&htable, 13));

    hashTableChained_free(&htable);
}