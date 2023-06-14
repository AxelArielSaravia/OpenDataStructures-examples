/**
* Author: Axel Ariel Saravia
*/

package arrayStack

type Stack[T any] struct {
    Len uint
    content []T
}

func CreateStack[T any]() Stack[T] {
    return Stack[T]{
        Len: 0,
        content: make([]T, 1),
    }
}

func (a *Stack[T]) Get(i uint) T {
    return a.content[i]
}

func (a *Stack[T]) Set(i uint, x T) T {
    v := a.content[i]
    a.content[i] = x
    return v
}

func (a *Stack[T]) Add(i uint, x T) *Stack[T] {
    if (a.Len < i) {
        i = a.Len
    }
    if (a.Len == uint(cap(a.content))) {
        resize(a)
    }
    for j := a.Len; i < j; j -= 1 {
        a.content[j] = a.content[j - 1]
    }
    a.content[i] = x
    a.Len += 1
    return a
}

func (a *Stack[T]) Remove(i uint) *Stack[T] {
    last := a.Len - 1
    if (a.Len <= i) {
        i = last
    }
    for i < last {
        a.content[i] = a.content[i + 1] 
        i += 1
    }
    a.Len -= 1
    if (3 * a.Len <= uint(cap(a.content))) {
        resize(a)
    }
    return a
}

func (a *Stack[T]) Clear() {
    a.Len = 0
    a.content = a.content[:1]
}

func resize[T any](a *Stack[T]) {
    var newCapacity uint
    if c:= 2 * a.Len; 1 < c {
        newCapacity = c
    } else {
        newCapacity = 1
    }
    n := make([]T, newCapacity)
    copy(n, a.content)
    a.content = n
}
