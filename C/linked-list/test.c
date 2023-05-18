/**
 * Author: Axel Ariel Saravia
 */

# include <stdio.h>
# include <assert.h>

# include "single-linked.c"
# include "double-linked.c"
# include "xor-linked.c"

void singleLinkedListTest(void);
void doubleLinkedListTest(void);
void xorLinkedListTest(void);

signed main() {
    //singleLinkedListTest();
    //doubleLinkedListTest();
    xorLinkedListTest();
    return 0;
}

void xorLinkedListTest(void) {
    xorlist list = xorlist_create();
    if (!list.dummy) {
        return;
    }
    assert(list.length == 0);
    assert(list.dummy == list.head);
    assert(list.dummy == (xornode*)((uintptr_t)list.dummy ^ (uintptr_t)list.head->nextprev));

    xorlist_add(&list, list.length, 10);
    assert(list.length == 1);
    assert(list.dummy != list.head);
    assert(list.head->value == 10);
    xornode* head_next = (xornode*)((uintptr_t)list.dummy ^ (uintptr_t)list.head->nextprev);
    xornode* dummy_next = (xornode*)((uintptr_t)list.head ^ (uintptr_t)list.dummy->nextprev);
    assert(list.dummy == head_next);
    assert(list.head == dummy_next);

    xorlist_add(&list, list.length, 20);
    assert(list.length == 2);

    assert(xorlist_remove(&list, list.length - 1) == 20);
    assert(list.length == 1);

    assert(xorlist_remove(&list, list.length - 1) == 10);
    assert(list.length == 0);

}

void doubleLinkedListTest(void) {
    dllist list = dllist_create();
    if  (!list.dummy) {
        return;
    }
    assert(list.length == 0);
    assert(list.dummy == list.dummy->prev);
    assert(list.dummy == list.dummy->next);

    dllist_add(&list, list.length, 10);
    assert(list.length == 1);
    assert(list.dummy->next == list.dummy->prev);
    assert(list.dummy->next->value == 10);

    dllist_add(&list, list.length, 20);
    assert(list.length == 2);
    assert(list.dummy->next != list.dummy->prev);
    assert(list.dummy->next->value == 10);
    assert(list.dummy->prev->value == 20);
    assert(list.dummy->next->next->value == 20);

    assert(dllist_remove(&list, list.length - 1) == 20);
    assert(list.length == 1);
    assert(list.dummy->next->value == 10);
    assert(list.dummy->next == list.dummy->prev);

    dllist_reset(&list);
    assert(list.length == 0);
    assert(list.dummy == list.dummy->prev);
    assert(list.dummy == list.dummy->next);
}

void singleLinkedListTest(void) {
    sllist list = {0};

    sllist_push(&list, 10);
    assert(list.length == 1);
    assert(list.head->value == 10);
    assert(list.tail->value == 10);

    sllist_push(&list, 20);
    assert(list.length == 2);
    assert(list.head->value == 20);
    assert(list.tail->value == 10);
    assert(list.head->next->value == 10);

    sllist_push(&list, 30);
    assert(list.length == 3);
    assert(list.head->value == 30);
    assert(list.tail->value == 10);
    assert(list.head->next->value == 20);
    assert(list.head->next->next->value == 10);

    sllist_add(&list, 100);
    assert(list.length == 4);
    assert(list.tail->value == 100);
    assert(list.head->value == 30);
    assert(list.head->next->value == 20);
    assert(list.head->next->next->value == 10);
    assert(list.head->next->next->next->value == 100);

    signed n = sllist_pop(&list);
    assert(n == 30);
    assert(list.length == 3);
    assert(list.head->value == 20);
    assert(list.tail->value == 100);
    assert(list.head->next->value == 10);
    assert(list.head->next->next->value == 100);

    sllist_push(&list, 30);

    assert(n == sllist_remove(&list));
    assert(list.length == 3);
    assert(list.head->value == 20);
    assert(list.tail->value == 100);
    assert(list.head->next->value == 10);
    assert(list.head->next->next->value == 100);

  
    n = sllist_removeFromTail(&list);
    assert(n == 100);
    assert(list.length == 2);
    assert(list.head->value == 20);
    assert(list.tail->value == 10);
    assert(list.head->next->value == 10);


    sllist_reset(&list);
    assert(list.length == 0);
    assert(list.head == 0);
    assert(list.tail == 0);
}