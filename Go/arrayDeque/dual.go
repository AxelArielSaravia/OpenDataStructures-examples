/**
 * Author: Axel Ariel Saravia
 */

package arrayDeque

import "github.com/AxelArielSaravia/OpenDataStructures-examples/Go/arrayStack"

type DualDeque[T any] struct {
    Front arrayStack.Stack[T]
    Back arrayStack.Stack[T]
}

func CreateDualDeque[T any]() DualDeque[T] {
    return DualDeque[T] {
        Front: arrayStack.CreateStack[T](),
        Back: arrayStack.CreateStack[T](),
    }
}

func (dd *DualDeque[T]) Size() uint {
    return dd.Front.Len + dd.Back.Len;
}

func (dd *DualDeque[T]) Get(i uint) T {
    len := dd.Front.Len
    if i < len {
        return dd.Front.Get(len - i - 1)
    } else {
        return dd.Back.Get(i - len)
    }
}

func (dd *DualDeque[T]) Set(i uint, x T) T {
    len := dd.Front.Len
    if i < len {
        return dd.Front.Set(len - i - 1, x)
    } else {
        return dd.Back.Set(i - len, x)
    }
}

func (dd *DualDeque[T]) Balance() *DualDeque[T] {
    var flength uint = dd.Front.Len
    var blength uint = dd.Back.Len
    var mid uint = (flength + blength) / 2 
    if 3 * flength < blength || 3 * blength < flength {
        front := arrayStack.CreateStack[T]()
        back := arrayStack.CreateStack[T]()
        var i uint
        for i = 0; i < mid; i += 1 {
            x := dd.Get(mid - i - 1)
            front.Add(i, x)
        }
        for i = 0; i < flength + blength - mid; i += 1 {
            x := dd.Get(mid + i)
            back.Add(i, x)
        }
        dd.Front = front
        dd.Back = back
    }
    return dd
}

func (dd *DualDeque[T]) Add(i uint, x T) *DualDeque[T] {
    len := dd.Front.Len
    if i < len {
        dd.Front.Add(len - i, x)
    } else {
        dd.Back.Add(i - len, x)
    }
    return dd.Balance()
}

func (dd *DualDeque[T]) Remove(i uint) *DualDeque[T] {
    len := dd.Front.Len
    if i < len {
        dd.Front.Remove(len - i - 1)
    } else {
        dd.Back.Remove(i - len)
    }
    return dd.Balance()
}

func (dd *DualDeque[T]) Clear() {
    dd.Front.Clear()
    dd.Back.Clear()
}
