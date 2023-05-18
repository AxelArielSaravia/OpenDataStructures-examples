/**
 * Author: Axel Ariel Saravia
 */

# include <stdlib.h>
# include <assert.h>

typedef struct node node;
struct node {
    node* next;
    signed value;
};

node* push(node* dummy, signed const x) {
    if (dummy) {
        node* new_n = malloc(sizeof(node));
        if (!new_n) {
            return 0;
        }
        *new_n = (node){
            .next = dummy->next,
            .value = x,
        };
        dummy->next = new_n;
    }
    return dummy;
}

signed pop(node* dummy) {
    signed res = 0;
    if (dummy && dummy->next) {
        node* old = dummy->next;
        res = old->value;
        dummy->next = old->next;
        free(old);
    }
    return res;
}

void free_dummy(node* dummy) {
    if (dummy) {
        node* n = dummy->next;
        while (n) {
            node* nTofree = n;
            n = n->next;
            free(nTofree);
        }
        *dummy = (node){0};
    }
}

signed main() {
    node dummy = {0};

    push(&dummy, 10);
    assert(dummy.next->value == 10);

    push(&dummy, 20);
    assert(dummy.next->value == 20);
    assert(dummy.next->next->value == 10);

    push(&dummy, 30);
    assert(dummy.next->value == 30);
    assert(dummy.next->next->value == 20);
    assert(dummy.next->next->next->value == 10);
    
    assert(30 == pop(&dummy));
    assert(dummy.next->value == 20);
    assert(dummy.next->next->value == 10);

    free_dummy(&dummy);
    assert(dummy.next == 0);
    return 0;
}