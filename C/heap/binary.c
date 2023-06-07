/**
 * Author: Axel Ariel Saravia
 */

#include "./binary.h"

#ifndef STRUCT_BINARY_HEAP
# define STRUCT_BINARY_HEAP
struct binaryHeap {
    T content[32];
    size_t cap; 
    size_t len; 
};
#endif

bool add(binaryHeap bh[static 1], T x) {
    if (bh->cap == bh->len) {
        return false;
    }
    bh->content[bh->len] = x;
    bh->len += 1;
    bubble_up(bh, bh->len - 1);
    return true;
}

void bubble_up(binaryHeap bh[static 1], size_t i) {
    size_t p = (i - 1) / 2; //parent index
    while (0 < i && bh->content[i] < bh->content[p]) {
        T temp = bh->content[p];
        bh->content[p] = bh->content[i];
        bh->content[i] = temp;
        i = p;
        p = (i - 1) / 2;
    }
}

tResult remove(binaryHeap bh[static 1], size_t i) {
    tResult res = {0};
    if (bh->len > 0) {
        res.res = bh->content[0];
        bh->content[0] = bh->content[bh->len - 1];
        bh->len -= 1;
        tricle_down(bh, 0);
        return res; 
    }
    res.err = "Error: try to remove when the content is empty";
    return res;
}

void tricle_down(binaryHeap bh[static 1], size_t i) {
    while (0 <= i) {
        int j = -1;
        size_t r = 2 * (i + 1); //right index
        size_t l = (2 * i) + 1; //left index
        if (r < bh->len && bh->content[r] < bh->content[i]) {
            if (bh->content[l] < bh->content[r]) {
                j = l;
            } else {
                j = r;
            }
        } else {
            if (l < bh->len && bh->content[l] < bh->content[i]) {
                j = l;
            }
        }
        if (0 <= j) {
            T temp = bh->content[j];
            bh->content[j] = bh->content[i];
            bh->content[i] = temp;
        }
        i = j;
    }
}