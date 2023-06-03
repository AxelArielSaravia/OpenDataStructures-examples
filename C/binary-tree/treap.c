/**
 * Author: Axel Ariel Saravia
 */

#include "./treap.h"

treapNode* treapNode_create(T v, treapNode* const p) {
    treapNode* tn = malloc(sizeof(*tn));
    if (tn) {
        srand(time(0));
        signed r = rand();
        *tn = (treapNode){
            .left = 0,
            .parent = p,
            .right = 0,
            .value = v,
            .priority = r,
        };
    }
    return tn;
}

void treapNode_free(treapNode* root) {
    treapNode* u = root;
    treapNode* prv = 0;
    treapNode* nxt = 0;
    while (u) {
        if (prv == u->parent) {
    // Visit a node for the first time
            nxt = (
                u->left
                ? u->left
                : ( u->right
                    ? u->right
                    : u->parent
                )
            );
        } else if (prv == u->left) {
            nxt = (
                u->right
                ? u->right
                : u->parent
            );
            free(prv);
            u->left = 0;
        } else {
            nxt = u->parent;
            free(prv);
        }
        prv = u;
        u = nxt;
    }
    if (root) {
        root->right = 0;
    }
}

treapNode* treap_find_eq(treapNode* tn, T v) {
    while (tn) {
        T y = tn->value;
        if (v < y) {
            tn = tn->left;
        } else if (v > y) {
            tn = tn->right;
        } else {
            return tn;
        }
    }
    return 0;
}

void treap_rotate_left(treap* t, treapNode* tn) {
    treapNode* w = tn->right;
    w->parent = tn->parent;
    if (w->parent) {
        if (w->parent->left == tn) {
            w->parent->left = w;
        } else {
            w->parent->right = w;
        }
    }
    tn->right = w->left;
    if (tn->right) {
        tn->right->parent = tn;
    }
    tn->parent = w;
    w->left = tn;
    if (tn == t->root) {
        w->parent = 0;
        t->root = w;
    }
}

void treap_rotate_right(treap* t, treapNode* tn) {
    treapNode* w = tn->left;
    w->parent = tn->parent;
    if (w->parent) {
        if (w->parent->left == tn) {
            w->parent->left = w;
        } else {
            w->parent->right = w;
        }
    }
    tn->left = w->right;
    if (tn->left) {
        tn->left->parent = tn;
    }
    tn->parent = w;
    w->right = tn;
    if (tn == t->root) {
        w->parent = 0;
        t->root = w;
    }
}

bool treap_add(treap t[static 1], T v) {
    treapNode* new_tn = 0;
    //Add Node
    {
        treapNode* p = 0;
    // find the node or a proper parent
        {
            treapNode* w = t->root;
            treapNode* prev = 0;
            while (w) {
                T y = w->value;
                prev = w;
                if (v < y) {
                    w = w->left;
                } else if (v > y) {
                    w = w->right;
                } else {
    // We find the node, then is no need to insert it
                    return false;
                }
            }
            p = prev;
        }
    // create a new node, and define p as his parent
        new_tn = treapNode_create(v, p);
        if (!new_tn) {
            return false;
        }
        if (!p) {
            t->root = new_tn;
        } else {
            if (v < p->value) {
                p->left = new_tn;
            } else { //(v > p->value)
                p->right = new_tn;
            }
    // can not be (v == p->value) casue we return false before
        }
        t->elements += 1;
    }
    //Bubble Up
    while (
        new_tn != t->root
        && new_tn->priority < new_tn->parent->priority
    ) {
        if (new_tn->parent->right == new_tn) {
            treap_rotate_left(t, new_tn->parent);
        } else {
            treap_rotate_right(t, new_tn->parent);
        }
    }
    if (!new_tn->parent) {
        t->root = new_tn;
    }
    return true;
}

bool treap_remove(treap t[static 1], T v) {
    treapNode* tn = treap_find_eq(t->root, v);
    if (!tn || tn->value != v) {
        return false;
    }
    //Trickle Down
    while (tn->left || tn->right) {
        if (!tn->left) {
            treap_rotate_left(t, tn);
        } else if (!tn->right) {
            treap_rotate_right(t, tn);
        } else if (tn->left->priority < tn->right->priority) {
            treap_rotate_right(t, tn);
        } else {
            treap_rotate_left(t, tn);
        }
        if (t->root == tn) {
            t->root = tn->parent;
        }
    }
    //Splice
    {
        treapNode* s = (
            tn->left
            ? tn->left
            : tn->right
        );
        treapNode* p = 0;
        if (tn == t->root) {
            t->root = s;
        } else {
            p = tn->parent;
            if (p->left == tn) {
                p->left = s;
            } else {
                p->right = s;
            }
        }
        if (s) {
            s->parent = p;
        }
    }
    free(tn);
    t->elements -= 1;
    return true;
}

treap* treap_clean(treap t[static 1]) {
    treapNode_free(t->root);
    free(t->root);
    *t = (treap){0};
    return t;
}