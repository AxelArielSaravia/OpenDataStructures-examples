/**
 * Author: Axel Ariel Saravia
 */

# include "queue-circular.h"

circularQueue circular_queue_init(size_t const capacity, T arr[capacity]) {
    return (circularQueue){
        .content = arr,
        .capacity = capacity,
        .length = 0,
        .head = 0,
    };
}

unsigned circular_queue_remove(circularQueue cq[static 1]) {
    unsigned ret = 0;
    if (cq->length) {
        ret = cq->content[cq->head];
        cq->length -= 1;
    }
    return ret;
}

circularQueue* circular_queue_add(circularQueue cq[static 1], unsigned value) {
    if (cq->length != cq->capacity) {
        cq->content[cq->head] = value;
        *cq = (circularQueue){
            .content = cq->content,
            .capacity = cq->capacity,
            .length = cq->length + 1,
            .head = (cq->head + 1) % cq->capacity,
        };
    }
    return cq; 
}
