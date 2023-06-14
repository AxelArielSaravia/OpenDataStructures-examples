/**
* Author: Axel Ariel Saravia
*/

package linkedList


type SLNode[T any] struct {
    Next *SLNode[T]
    V T
}

type SLList[T any] struct {
    Head *SLNode[T]
    Tail *SLNode[T]
    Len uint
}

func (l *SLList[T]) Clear() {
    l.Head = nil
    l.Tail = nil
    l.Len = 0
}

func (l *SLList[T]) AddHead(x T) *SLList[T] {
    n := new(SLNode[T])
    n.Next = l.Head
    n.V = x
    l.Head = n
    if l.Len == 0 {
        l.Tail = n
    }
    l.Len += 1
    return l
}

func (l *SLList[T]) AddTail(x T) *SLList[T] {
    n := new(SLNode[T])
    n.V = x
    if l.Len == 0 {
        l.Head = n
    } else {
        l.Tail.Next = n
    }
    l.Tail = n
    l.Len += 1
    return l
}

func (l *SLList[T]) RemoveHead() T {
    var res T
    if l.Len != 0 {
        Head := l.Head
        res = Head.V
        l.Head = Head.Next
        l.Len -= 1
        if l.Len == 0 {
            l.Tail = nil
        }
    }
    return res
}

func (l *SLList[T]) RemoveTail() T {
    var res T
    if l.Len != 0 {
        res = l.Tail.V
        if l.Len == 1 {
            l.Clear()
        } else {
            newTail := l.Head
            last := l.Len
            var i uint = 2
            for i < last {
                newTail = newTail.Next
                i += 1
            }
            newTail.Next = nil
            l.Tail = newTail
            l.Len -= 1
        }
    }
    return res;
}
