/**
 * Author: Axel Ariel Saravia
 */

#include "./red-black.h"

redBlackNode* redBlackNode_create(T const v, redBlackNode* const p) {
    redBlackNode* rbn = malloc(sizeof(*rbn));
    if (!rbn) {
        return 0;
    }
    *rbn = (redBlackNode){
        .left = 0,
        .right = 0,
        .parent = p,
        .color = RED,
        .value = v,
    };
    return rbn;
}

void redBlackNode_free(redBlackNode* root) {
    redBlackNode* u = root;
    redBlackNode* prv = 0;
    redBlackNode* nxt = 0;
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

redBlackNode* redBlackNode_find_eq(redBlackNode* rbn, T const v) {
    while (rbn) {
        T y = rbn->value;
        if (v < y) {
            rbn = rbn->left;
        } else if (v > y) {
            rbn = rbn->right;
        } else {
            return rbn;
        }
    }
    return 0;
}

void redBlackTree_push_black(redBlackNode rbn[static 1]) {
    rbn->color = rbn->color - 1;
    rbn->left->color = rbn->left->color + 1;
    rbn->right->color = rbn->right->color + 1;
}

void redBlackTree_pull_black(redBlackNode rbn[static 1]) {
    rbn->color = rbn->color + 1;
    rbn->left->color = rbn->left->color - 1;
    rbn->right->color = rbn->right->color - 1;
}

void redBlackTree_rotate_left(
    redBlackTree rbt[static 1],
    redBlackNode u[static 1]
) {
    redBlackNode* w = u->right;
    w->parent = u->parent;
    if (w->parent) {
        if (w->parent->left == u) {
            w->parent->left = w;
        } else {
            w->parent->right = w;
        }
    }
    u->right = w->left;
    if (u->right) {
        u->right->parent = w;
    }
    u->parent = w;
    w->left = u;
    if (u == rbt->root) {
        w->parent = 0;
        rbt->root = w;
    }
}

void redBlackTree_rotate_right(
    redBlackTree rbt[static 1],
    redBlackNode u[static 1]
) {
    redBlackNode* w = u->left;
    w->parent = u->parent;
    if (w->parent) {
        if (w->parent->left == u) {
            w->parent->left = w;
        } else {
            w->parent->right = w;
        }
    }
    u->left = w->right;
    if (u->left) {
        u->left->parent = w;
    }
    u->parent = w;
    w->right = u;
    if (u == rbt->root) {
        w->parent = 0;
        rbt->root = w;
    }
}

void redBlackTree_flip_left(
    redBlackTree rbt[static 1],
    redBlackNode u[static 1]
) {
    //swap
    colors temp = u->color;
    u->color = u->right->color;
    u->right->color = temp;
    redBlackTree_rotate_left(rbt, u);
}

void redBlackTree_flip_right(
    redBlackTree rbt[static 1],
    redBlackNode u[static 1]
) {
    //swap
    colors temp = u->color;
    u->color = u->left->color;
    u->left->color = temp;
    redBlackTree_rotate_right(rbt, u);
}

bool redBlackTree_add(redBlackTree rbt[static 1], T const v) {
    redBlackNode* u = 0;
    { // Add Node
        redBlackNode* p = 0;
        // find the node or a proper parent
        redBlackNode* w = rbt->root;
        redBlackNode* prev = 0;
        while (w) {
            prev = w;
            if (v < w->value) {
                w = w->left;
            } else if (v > w->value) {
                w = w->right;
            } else {
        // We find the node, then is no need to insert it
                return false;
            }
        }
        p = prev;
        
        u = redBlackNode_create(v, p);
        if (!u) {
            return false;
        }
        if (!p) {
            rbt->root = u;
        } else {
            if (v < p->value) {
                p->left = u;
            } else { // v > p->value
                p->right = u;
            }
        }
        rbt->elements += 1;
    }
    // fix up
    while (u->color == RED) {
        if (u == rbt->root) {
            u->color = BLACK;
            return true;
        }
        redBlackNode* w = u->parent;
        if (!w->left || w->left->color == BLACK) {
    // flipLeft swap w and u nodes, now w is the left child of u,
    // Couse this we need to set u as the child of w again
    // and w as the parent
            redBlackTree_flip_left(rbt, w);
            u = w;
            w = u->parent;
        }
        if (w->color == BLACK) {
            return true;
        }
        redBlackNode* g = w->parent;
        if (!g->right || g->right->color == BLACK) {
            redBlackTree_flip_right(rbt, g);
            return true;
        }
        redBlackTree_push_black(g);
        u = g;
    }
    return true;
}

bool redBlackTree_remove(redBlackTree rbt[static 1], T const v) {
    redBlackNode* u = redBlackNode_find_eq(rbt->root, v);
    if (!u) {
        return false;
    }
    redBlackNode* w = u->right;
    if (!w) {
        w = u;
        u = w->left;
    } else {
        while (w->left) {
            w = w->left;
        }
        u->value = w->value;
        u = w->right;
    }
    { //splice
        redBlackNode* s = (
            w->left
            ? w->left
            : w->right
        );
        redBlackNode* p = 0;
        if (w == rbt->root) {
            rbt->root = s;
        } else {
            p = w->parent;
            if (p->left == w) {
                p->left = s;
            } else {
                p->right = s;
            }
        }
        if (s) {
            s->parent = p;
        }
        rbt->elements -= 1;
    }

    u->color = u->color + w->color;
    u->parent = w->parent;
    free(w);
    w = 0;

    // fix up
    while (u->color > BLACK) {
        if (u == rbt->root) {
            //case 0
            u->color = BLACK;
            return true;
        }
        redBlackNode* m = u->parent;
        if (m->left && m->left->color == RED) {
            //case 1
            redBlackTree_flip_right(rbt, m);
        } else if (u == m->left) {
            //case 2
            redBlackNode* c = m->right;
            redBlackTree_pull_black(m);
            redBlackTree_flip_left(rbt, m);
            redBlackNode* q = m->right;
            if (q && q->color == RED) {
                redBlackTree_rotate_left(rbt, m);
                redBlackTree_flip_right(rbt, c);
                redBlackTree_push_black(q);
                if (c->right && c->right->color == RED) {
                    redBlackTree_flip_left(rbt, c);
                }
                u = q;
            } else {
                u = c;
            }
        } else {
            //case 3
            redBlackNode* c = m->left;
            redBlackTree_pull_black(m);
            redBlackTree_flip_right(rbt, m);
            redBlackNode* q = m->left;
            if (q && q->color == RED) {
                // q - m is red - red
                redBlackTree_rotate_right(rbt, m);
                redBlackTree_flip_left(rbt, c);
                redBlackTree_push_black(q);
                u = q;
            } else if (c->left && c->left->color == RED) {
                redBlackTree_push_black(c);
                u = c;
            } else {
                // ensure left-leaning
                redBlackTree_flip_left(rbt, c);
                u = m;
            }
        }
    }
    if (u != rbt->root) {
        redBlackNode* m = u->parent;
        if (
            (m->right && m->right->color == RED)
            && (!m->left || m->left->color == BLACK)
        ) {
            redBlackTree_flip_left(rbt, m);
        }
    }
    return true;
}

redBlackTree* redBlackTree_clean(redBlackTree rbt[static 1]) {
    redBlackNode_free(rbt->root);
    free(rbt->root);
    *rbt = (redBlackTree){0};
    return rbt;
}