/**
 * Author: Axel Ariel Saravia
 */

/*
    IMPORTANT

    the T type is the signed type

    stack struct is {
        T* content;
        size_t capacity;
        size_t length;
    }
*/

# include "stack.h"

stack stack_create() {
    T* content = calloc(8, sizeof(T));

    return (
        !content
        ? (stack){0}
        : (stack){
            .content = content,
            .capacity = 8,
            .length = 0,
        }
    );
}

T stack_get(stack const s, size_t const i) {
    T res = 0; 
    if (i < s.length) {
        res = s.content[i];
    }
    return res;
}

T stack_set(stack ps[static 1] , size_t const i, T const x) {
    T y = 0;
    if (i < ps->length) {
        y = ps->content[i];
        ps->content[i] = x;
    }
    return y;
}

stack stack_add(stack s, size_t i, T const x) {
    if (s.length < i) {
        i = s.length;
    }
    if (s.length == s.capacity) {
        s = stack_resize(s);
    }
    for (size_t j = s.length; i < j; j += 1) {
        s.content[j] = s.content[j - 1];
    }
    s.content[i] = x;
    s.length += 1;
    return s;
}

stack stack_remove(stack s, size_t i) {
    size_t const last = s.length - 1;
    if (s.length <= i) {
        i = s.length - 1;
    }
    while (i < last) {
        s.content[i] = s.content[i + 1];
        i += 1;
    }
    s.length -= 1;
    if (8 < s.capacity && 3 * s.length <= s.capacity) {
        s = stack_resize(s);
    }
    return s;
}

stack stack_resize(stack s) {
    size_t j = 2 * s.length;
    size_t new_capacity = (8 < j ? j : 8);
    s.content = realloc(s.content, sizeof(T[new_capacity]));
    s.capacity = new_capacity;
    return s;
}

void stackRef_add(stack ps[static 1], size_t const i, T const x) {
    *ps = stack_add(*ps, i, x);
}

void stackRef_remove(stack ps[static 1], size_t i) {
    *ps = stack_remove(*ps, i);
}

void stack_free(stack ps[static 1]) {
    free(ps->content);
    *ps = (stack){0};
}