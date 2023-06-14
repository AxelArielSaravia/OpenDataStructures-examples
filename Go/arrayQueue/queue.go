/**
* Author: Axel Ariel Saravia
*/
package arrayQueue

type Queue[T any] struct {
    Head 	uint
    Len 	uint
    content []T
}

func CreateQueue[T any]() Queue[T] {
    return Queue[T]{
        Head: 0,
        Len: 0,
        content: make([]T, 1),
    }
}

func (q *Queue[T]) Add(x T) *Queue[T] {
    if q.Len + 1 > uint(cap(q.content)) {
        resize(q)
    }
    index := (q.Head + q.Len) % uint(cap(q.content))
    q.content[index] = x
    q.Len += 1
    return q 
}

func (q *Queue[T]) Remove() T {
    v := q.content[q.Head]
    cap := uint(cap(q.content))
    q.Head = (q.Head + 1) % cap
    q.Len -= 1
    if (3 * q.Len <= cap) {
        resize(q)
    }
    return v
}

func (q *Queue[T]) Clear() {
    q.Head = 0 
    q.Len = 0 
    q.content = q.content[:1]
}

func resize[T any](q* Queue[T]) {
    var newCap uint
    if c := 2 * q.Len; 1 < c {
        newCap = c
    } else {
        newCap = 1
    }
    newContent := make([]T, newCap)
    oldCap := uint(cap(q.content))
    var j uint
    for j = 0; j < q.Len; j += 1 {
        newContent[j] = q.content[(j + q.Head) % oldCap]
    }
    q.content = newContent
    q.Head = 0
}
