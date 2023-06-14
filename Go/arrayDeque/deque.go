/**
 * Author: Axel Ariel Saravia
 */
package arrayDeque

type Deque[T any] struct {
    content []T
    Head 	uint
    Len 	uint
}

func CreateDeque[T any]() Deque[T] {
    return Deque[T]{
        Head: 0,
        Len : 0,
        content: make([]T, 1),
    }
}

func (d *Deque[T]) Get(i uint) T {
    idx := (i + d.Head) % uint(cap(d.content))
    return d.content[idx];
}

func (d *Deque[T]) Set(i uint, x T) T {
    idx := (i + d.Head) % uint(cap(d.content))
    y := d.content[idx]
    d.content[idx] = x;
    return y
}

func (d *Deque[T]) Add(i uint, x T) *Deque[T] {
    cap := uint(cap(d.content))
    if d.Len < i {
        i = d.Len
    }
    if (d.Len == cap) {
        resize(d);
    }
    var z1 uint
    var z2 uint
    var k uint
    if (i < d.Len / 2) {
        d.Head = (d.Head - 1) % cap
        for k = 0; k < i; k += 1 {
            z1 = (d.Head + k) % cap
            z2 = (d.Head + k + 1) % cap
            d.content[z1] = d.content[z2]
        }
    } else {
        for k = d.Len; i + 1 <= k; k -= 1 {
            z1 = (d.Head + k) % cap
            z2 = (d.Head + k - 1) % cap
            d.content[z1] = d.content[z2]
        }
    }
    z1 = (d.Head + i) % cap
    d.content[z1] = x;
    d.Len += 1;
    return d
}

func (d *Deque[T]) Remove(i uint) *Deque[T] {
    var cap uint = uint(cap(d.content))
    var z1 uint = (d.Head + i) % cap
    var z2 uint = 0
    var k uint
    if (d.Len <= i) {
        i = d.Len - 1;
    }
    if i < d.Len / 2 {
        for k = i; 0 < k; k -= 1 {
            z1 = (d.Head + k) % cap
            z2 = (d.Head + k - 1) % cap
            d.content[z1] = d.content[z2]
        }
        d.Head = (d.Head + 1) % cap
    } else {
        for k = i; k < d.Len - 1; k += 1 {
            z1 = (d.Head + k) % cap
            z2 = (d.Head + k + 1) % cap
            d.content[z1] = d.content[z2]
        }
    }
    d.Len -= 1;
    if (3 * d.Len <= cap) {
        resize(d)
    }
    return d
}

func (d *Deque[T]) Clear() *Deque[T] {
    d.Head = 0
    d.Len = 0
    d.content = d.content[:1]
    return d
}

func resize[T any](d *Deque[T]) {
    var newCap uint
    var oldCap uint = uint(cap(d.content))
    if c := 2 * d.Len; 1 < c {
        newCap = c
    } else {
        newCap = 1
    }
    newContent := make([]T, newCap)
    var j uint
    for j = 0; j < d.Len; j += 1 {
        newContent[j] = d.content[(j + d.Head) % oldCap]
    }
    d.content = newContent
    d.Head = 0
}
