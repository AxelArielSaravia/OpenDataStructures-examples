/**
 * Author: Axel Ariel Saravia
 */

/*
    IMPORTANT

    the T type is the signed type

    dualDeque struct is {
        stack front;
        stack back;
    }
*/


# include "deque-dual.h"

dualDeque dual_deque_create() {
    stack front = stack_create();
    stack back = stack_create();
    return (
        !front.content || !back.content
        ? (dualDeque){0}
        : (dualDeque){
            .front = front,
            .back = back,
        }
    );
}

size_t dual_deque_size(dualDeque const ddq) {
    return ddq.front.length + ddq.back.length;
}

T dual_deque_get(dualDeque const ddq, size_t const i) {
    size_t const length = ddq.front.length;
    size_t idx = 0;
    if (i < length) {
        idx = length - i - 1;
        return stack_get(ddq.front, idx);
    } else {
        idx = i - length;
        return stack_get(ddq.back, idx);
    }
}

T dual_deque_set(dualDeque ddq[static 1], size_t const i, T const x) {
    size_t const length = ddq->front.length;
    size_t idx = 0;
    if (i < length) {
        idx = length - i - 1;
        return stack_set(&(ddq->front), idx, x);
    } else {
        idx = i - length;
        return stack_set(&(ddq->back), idx, x);
    }
}

dualDeque dual_deque_add(dualDeque ddq, size_t const i, T const x) {
    size_t const length = ddq.front.length;
    size_t idx = 0;
    if (i < length) {
        idx = length - i;
        ddq.front = stack_add(ddq.front, idx, x);
    } else {
        idx =  i - length;
        ddq.back = stack_add(ddq.back, idx, x);
    }
    return dual_deque_balance(ddq);
}

dualDeque dual_deque_remove(dualDeque ddq, size_t const i) {
    size_t const length = ddq.front.length;
    size_t idx = 0;
    if (i < length) {
        idx = length - i - 1;
        ddq.front = stack_remove(ddq.front, idx);
    } else {
        idx =  i - length;
        ddq.back = stack_remove(ddq.back, idx);
    }
    return dual_deque_balance(ddq);
}

dualDeque dual_deque_balance(dualDeque ddq) {
    size_t const flength = ddq.front.length;
    size_t const blength = ddq.back.length;
    size_t mid = (flength + blength) / 2;
    if (3 * flength < blength || 3 * blength < flength) {
        stack front = stack_create();
        stack back = stack_create();
        for (size_t i = 0; i < mid; i += 1) {
            size_t idx = mid - i - 1;
            T x = dual_deque_get(ddq, idx);
            front = stack_add(front, i, x);
        }
        for (size_t i = 0; i < flength + blength - mid; i += 1) {
            size_t idx = mid + i;
            T x = dual_deque_get(ddq, idx);
            back = stack_add(back, i, x);
        }
        ddq.front = front;
        ddq.back = back;
    }
    return ddq;
}

void dual_deque_free(dualDeque ddq[static 1]) {
    stack_free(&(ddq->front));
    stack_free(&(ddq->back));
    *ddq = (dualDeque){0};
}