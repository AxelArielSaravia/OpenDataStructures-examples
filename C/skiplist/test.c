#include <assert.h>
#include "sset.c"
#include "list.c"

void ssetTest(void);
void listTest(void);

signed main() {
    //ssetTest();
    listTest();
    return 0;
}

void listTest(void) {
    skiplistList list = {0};
    if (!skiplistList_int(&list)) {
        return;
    }
    assert(list.length == 0);
    assert(list.height == 0);

    skiplistList_add(&list, list.length, 97);
    assert(list.length == 1);
    assert(list.sentinel->next[0]->value == 97);

    skiplistList_add(&list, list.length, 98);
    assert(list.length == 2);
    assert(list.sentinel->next[0]->next[0]->value == 98);

    skiplistList_add(&list, list.length, 99);
    assert(list.length == 3);
    assert(list.sentinel->next[0]->next[0]->next[0]->value == 99);

    skiplistList_add(&list, 1, 111);
    assert(list.length == 4);
    assert(list.sentinel->next[0]->next[0]->value == 111);
    assert(list.sentinel->next[0]->next[0]->next[0]->value == 98);
    assert(list.sentinel->next[0]->next[0]->next[0]->next[0]->value == 99);

    skiplistList_add(&list, list.length, 100);
    assert(list.length == 5);
    assert(list.sentinel->next[0]->next[0]->next[0]->next[0]->next[0]->value == 100);

    assert(skiplistList_get_node(&list, 0)->value == 97);

    assert(skiplistList_get(&list, 1) == 111);

    assert(skiplistList_get(&list, 120) == 0);

    assert(skiplistList_set(&list, 1, 60) == 111);
    assert(list.sentinel->next[0]->next[0]->value == 60);

    assert(skiplistList_remove(&list, list.length - 1) == 100);
    assert(list.length == 4);
    assert(list.sentinel->next[0]->next[0]->next[0]->next[0]->next[0] == 0);

    assert(skiplistList_remove(&list, 1) == 60);
    assert(list.length == 3);
    assert(list.sentinel->next[0]->next[0]->value == 98);

    skiplistList_free(&list);
}

void ssetTest(void) {
    skiplistSSet list = {0};
    if (!skiplistSSet_init(&list)) {
        return;
    }
    skiplistSSet_add(&list, 10);
    assert(list.length == 1);

    skiplistSSet_add(&list, 20);
    assert(list.length == 2);

    skiplistSSet_remove(&list, 10);
    assert(list.length == 1);

    assert(false == skiplistSSet_add(&list, 20));
    assert(list.length == 1);

    skiplistSSet_add(&list, 15);
    assert(list.length == 2);

    skiplistSSet_free(&list);
}