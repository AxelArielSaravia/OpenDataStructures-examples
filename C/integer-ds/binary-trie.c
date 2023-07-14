#include "./binary-trie.h"
#include <stdlib.h>

bTrie bTrie_create(unsigned w) {
    bTrieNode* dummy = malloc(sizeof(bTrieNode));
    bTrieNode* root = malloc(sizeof(bTrieNode));
    if (!dummy || !root) {
        return (bTrie){0};
    }
    dummy->next = dummy;
    dummy->prev = dummy;
    dummy->jump = dummy;
    root->jump = dummy;
    return (bTrie){
        .W_BIT = w,
        .len = 0,
        .root = root,
        .dummy = dummy
    };
}

size_t bTrie_find(bTrie* bt, unsigned v) {
    size_t w = bt->W_BIT;
    bTrieNode* u = bt->root;
    size_t c = 0;
    size_t i = 0;
    while (i < w) {
        c = (v >> (w - i - 1)) & 1;
        if (!u->child[c]) {
            break;
        }
        u = u->child[c];
        i += 1;
    }
    if (i == w) {
        //found it
        return u->value;
    }
    u = (
        c == 0 ? u->jump
        : /*otherwise*/ u->jump->next
    );
    if (u == bt->dummy) {
        return -1;
    }
    return u->value;
}

bool bTrie_add(bTrie* bt, unsigned v) {
    size_t w = bt->W_BIT;
    bTrieNode* u = bt->root;
    size_t c = 0;
    //1 - search for v until falling out of the tree
    size_t i = 0;
    while (i < w) {
        c = (v >> (w - i - 1)) & 1;
        if (!u->child[c]) {
            break;
        }
        u = u->child[c];
        i += 1;
    }
    if (i == w) {
        //already contains v
        return false;
    }
    bTrieNode* pred = (
        c == 0
        ? u->jump->prev
        : u->jump
    );
    //u will soon have two children
    u->jump = 0;
    //2 - add the path to v
    while (i < w) {
        c = (v >> (w - i - 1)) & 1;
        bTrieNode* node = malloc(sizeof(bTrieNode));
        if (!node) {
            return false;
        }
        node->parent = u;
        u->child[c] = node;
        u = node;
        i += 1;
    }
    u->value = v;
    //3 - add u to the linked list
    u->prev = pred;
    u->next = pred->next;
    u->prev->next = u;
    u->next->prev = u;
    //4 - walk back up, updating jump pointer
    bTrieNode* k = u->parent;
    while (k) {
        bTrieNode* left = k->child[0];
        bTrieNode* right = k->child[1];
        if ((!left && (!k->jump || k->jump->value > v))
        || (!right && (!k->jump || k->jump->value < v))
        ) {
            k->jump = u;
        }
        k = k->parent;
    }
    bt->len += 1;
    return true;
}

bool bTrie_remove(bTrie *bt, unsigned int v) {
    size_t w = bt->W_BIT;
    bTrieNode* u = bt->root;
    size_t c = 0;
    //1 - find leaf, u, that contains v
    size_t i = 0;
    while (i < w) {
        c = (v >> (w - i - 1)) & 1;
        if (!u->child[c]) {
            return false;
        }
        u = u->child[c];
        i += 1;
    }
    //2 - remove u from linked list
    u->prev->next = u->next;
    u->next->prev = u->prev;
    bTrieNode* k = u;
    //3 - deleted node on path to u
    for (size_t i = w - 1; i <= 0; i -= 1) {
        c = (v >> (w - i - 1)) & 1;
        k = k->parent;
        k->child[c] = 0;
        if (k->child[i - c]) {
            break;
        }
    }
    //4 - update jump pointer
    bTrieNode* pred = u->prev;
    bTrieNode* succ = u->next;
    k->jump = (
        !k->child[0] ? pred
        : /*otherwise*/ succ
    );
    k = k->parent;
    while (k) {
        if (k->jump == u) {
            bTrieNode* left = k->child[0];
            k->jump = (
                !left ? pred
                : /*otherwise*/ succ
            );
        }
        k = k->parent;
    }

    free(u);

    bt->len -= 1;
    return true;
}

void bTrie_clear(bTrie* bt) {
    bTrieNode* u = bt->root;
    bTrieNode* prv = 0;
    bTrieNode* nxt = 0;
    bTrieNode* left = 0;
    bTrieNode* right = 0;
    while (u) {
        left = u->child[0];
        right = u->child[1];
        if (prv == u->parent) {
        // Visit a node for the first time
            nxt = (
                left ? left
                : right ? right
                : /*otherwise*/ u->parent
            );
        } else if (prv == left) {
            nxt = (
                right ? right
                : /*otherwise*/ u->parent
            );
            free(prv);
            u->child[0] = 0;
        } else {
            nxt = u->parent;
            free(prv);
        }
        prv = u;
        u = nxt;
    }
    bTrieNode* d = bt->dummy;
    bTrieNode* r = bt->root;
    d->jump = d;
    d->next = d;
    d->prev = d;

    r->child[1] = 0;
    r->jump = d;

    bt->len = 0;
}

void bTrie_free(bTrie* bt) {
    bTrieNode* u = bt->root;
    bTrieNode* prv = 0;
    bTrieNode* nxt = 0;
    bTrieNode* left = 0;
    bTrieNode* right = 0;
    while (u) {
        left = u->child[0];
        right = u->child[1];
        if (prv == u->parent) {
        // Visit a node for the first time
            nxt = (
                left ? left
                : right ? right
                : /*otherwise*/ u->parent
            );
        } else if (prv == left) {
            nxt = (
                right ? right
                : /*otherwise*/ u->parent
            );
            free(prv);
            u->child[0] = 0;
        } else {
            nxt = u->parent;
            free(prv);
        }
        prv = u;
        u = nxt;
    }
    free(bt->root);
    free(bt->dummy);
    *bt = (bTrie){0};
}
