/**
 * Author: Axel Ariel Saravia
 */

#ifndef BINARY_TRIE_H
# define BINARY_TRIE_H

# include <stdlib.h>
# include <stdbool.h>

typedef struct bTrieNode bTrieNode;
struct bTrieNode {
    bTrieNode* child[2];
    unsigned value;
    bTrieNode* prev;
    bTrieNode* next;
    bTrieNode* jump;
    bTrieNode* parent;
};

typedef struct bTrie bTrie;
struct bTrie {
    size_t W_BIT;
    size_t len;
    bTrieNode* root;
    bTrieNode* dummy;
};

/*
 Return an empty bTrie struct if allocations fails,
 otherwise a bTrie struct with root and dummy nodes allocated
*/
bTrie bTrie_create(unsigned w);

/*
 Return -1 if the value does not exist in the Trie, otherwise true
*/
size_t bTrie_find(bTrie* bt, unsigned v);

/*
 Return false if the value exist in the Trie or allocation fails
 otherwise true
*/
bool bTrie_add(bTrie* bt, unsigned v);

/*
 Return false if the value does not exist in the Trie, otherwise true
*/
bool bTrie_remove(bTrie* bt, unsigned v);

/*
 Clear the bTrie to reuse it. It does not free the root and the dummy node.
*/
void bTrie_clear(bTrie* bt);

/*
 Free the bTrie, you can not used anymore without allocate the root and the
 dummy node again
*/
void bTrie_free(bTrie* bt);
#endif
