# include <stdio.h>
# include <assert.h>

# include "stack.h"
# include "queue.h"
# include "deque.h"
# include "deque-dual.h"
# include "queue-circular.h"

void stackTest();
void queueTest();
void dequeTest();
void dualDequeTest();
void circularQueueTest();

int main() {
    stackTest();
    //queueTest();
    //dequeTest();
    //dualDequeTest();

    return 0;
}


void circularQueueTest() {
    circularQueue q1 = circular_queue_init(4);
    circularQueue q2 = circular_queue_init(6);
    circular_queue_add(&q1, 10);
    assert(q1.content[0] == 10);

    circular_queue_add(&q2, 33);
    assert(q2.content[0] == 33);

    circular_queue_add(&q1, 20);
    circular_queue_add(&q1, 30);
    assert(q1.content[1] == 20);
    assert(q1.content[2] == 30);

    circular_queue_add(&q2, 44);
    circular_queue_add(&q2, 55);
    assert(q2.content[1] == 44);
    assert(q2.content[2] == 55);
}

void dualDequeTest() {

    dualDeque dq = dual_deque_create();

    dq = dual_deque_add(dq, 0, 5);
    assert(dq.back.content[0] == 5);
    assert(dq.back.length == 1);
    assert(dq.front.length == 0);


    dq = dual_deque_add(dq, 1, 10);
    assert(dq.front.content[0] == 5);
    assert(dq.front.length == 1);
    assert(dq.front.capacity == 1);
    assert(dq.back.content[0] == 10);
    assert(dq.back.length == 1);
    assert(dq.back.capacity == 1);

    dq = dual_deque_add(dq, 2, 15);
    assert(dq.front.content[0] == 5);
    assert(dq.front.length == 1);
    assert(dq.front.capacity == 1);
    assert(dq.back.content[0] == 10);
    assert(dq.back.content[1] == 15);
    assert(dq.back.length == 2);
    assert(dq.back.capacity == 2);

    dq = dual_deque_add(dq, 0, 7);
    assert(dq.front.content[0] == 5);
    assert(dq.front.content[1] == 7);
    assert(dq.front.length == 2);
    assert(dq.front.capacity == 2);
    assert(dq.back.content[0] == 10);
    assert(dq.back.content[1] == 15);
    assert(dq.back.length == 2);
    assert(dq.back.capacity == 2);

    dq = dual_deque_remove(dq, 0);
    assert(dq.front.content[0] == 5);
    assert(dq.front.content[1] == 7);
    assert(dq.front.capacity == 2);
    assert(dq.back.content[0] == 10);
    assert(dq.back.content[1] == 15);
    assert(dq.back.capacity == 2);
    assert(dq.front.length == 1 || dq.back.length == 1);

    dq = dual_deque_add(dq, 3, 20);
    dq = dual_deque_add(dq, 4, 25);
    assert(dq.front.content[0] == 10);
    assert(dq.front.content[1] == 5);
    assert(dq.front.capacity == 2);
    assert(dq.back.content[0] == 15);
    assert(dq.back.content[1] == 20);
    assert(dq.back.content[2] == 25);
    assert(dq.back.capacity == 4);

    dual_deque_free(&dq);
}

void dequeTest() {
    deque dq = deque_create();

    dq = deque_add(dq, 0, 5);
    assert(dq.content[0] == 5);
    assert(dq.capacity == 1);
    assert(dq.length == 1);
    assert(dq.head == 0);

    dq = deque_add(dq, 1, 10);
    dq = deque_add(dq, 2, 15);
    dq = deque_add(dq, 1, 7);
    assert(dq.content[0] == 5);
    assert(dq.content[1] == 7);
    assert(dq.content[2] == 10);
    assert(dq.content[3] == 15);
    assert(dq.capacity == 4);
    assert(dq.length == 4);
    assert(dq.head == 0);

    dq = deque_remove(dq, 1);
    assert(dq.content[1] == 5);
    assert(dq.content[2] == 10);
    assert(dq.content[3] == 15);
    assert(dq.capacity == 4);
    assert(dq.length == 3);
    assert(dq.head == 1);

    assert(dq.content[3] == deque_get(dq, 2));

    assert(5 == deque_set(&dq, 0, 43));
    assert(dq.content[1] == 43);
    assert(dq.content[2] == 10);
    assert(dq.content[3] == 15);
    assert(dq.capacity == 4);
    assert(dq.length == 3);
    assert(dq.head == 1);

    deque_free(&dq);
}

void queueTest() {
    queue q = queue_create();

    q = queue_add(q, 5);
    assert(q.content[0] == 5);
    assert(q.capacity == 1);
    assert(q.length == 1);
    assert(q.head == 0);

    q = queue_add(q, 10);
    q = queue_add(q, 15);
    q = queue_add(q, 20);
    assert(q.content[0] == 5);
    assert(q.content[1] == 10);
    assert(q.content[2] == 15);
    assert(q.content[3] == 20);
    assert(q.capacity == 4);
    assert(q.length == 4);
    assert(q.head == 0);

    q = queue_remove(q);
    assert(q.content[0] == 5);
    assert(q.content[1] == 10);
    assert(q.content[2] == 15);
    assert(q.content[3] == 20);
    assert(q.length == 3);
    assert(q.head == 1);

    q = queue_add(q, 25);
    assert(q.content[1] == 10);
    assert(q.content[2] == 15);
    assert(q.content[3] == 20);
    assert(q.content[0] == 25);
    assert(q.length == 4);
    assert(q.head == 1);

    queue_free(&q);
}

void stackTest() {
    stack s = stack_create();
    stack s2 = stack_create();

    s = stack_add(s, 0, 5);
    assert(s.content[0] == 5);
    assert(s.length == 1);

    s2 = stack_add(s2, 0, 43);

    s = stack_add(s, 1, 10);

    s2 = stack_add(s2, 1, 98);


    s = stack_add(s, 2, 15);
    assert(s.content[1] == 10);
    assert(s.content[2] == 15);
    assert(s.length == 3);

    s = stack_remove(s, 1);
    assert(s.content[1] == 15);
    assert(s.length == 2);

    s = stack_add(s, 1, 10);
    s = stack_add(s, 3, 20);
    assert(s.content[1] == 10);
    assert(s.content[2] == 15);
    assert(s.content[3] == 20);
    assert(s.length == 4);

    assert(s.content[2] == stack_get(s, 2));

    assert(5 == stack_set(&s, 0, 43));
    assert(43 == s.content[0]);

    stack_free(&s);
}