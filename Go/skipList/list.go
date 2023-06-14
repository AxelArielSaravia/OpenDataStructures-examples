/**
* Author: Axel Ariel Saravia
*/

package skiplist

import "errors"

type ListNode[T any] struct {
    Height uint
    Next []*ListNode[T]
    Len []int
    Value T
}

type List[T any] struct {
    Height uint
    Len uint
    Sentinel ListNode[T]
}

func NewListNode[T any](h uint, v T) *ListNode[T] {
    var sln *ListNode[T] = new(ListNode[T])
    *sln = ListNode[T]{
        Height: h,
        Next: make([]*ListNode[T], h + 1),
        Len: make([]int, h + 1),
        Value: v,
    }
    return sln
}

func CreateList[T any]() List[T] {
    var sl List[T]
    sl.Sentinel = ListNode[T]{
        Height: MAX_HEIGHT,
        Next: make([]*ListNode[T], MAX_HEIGHT + 1),
        Len: make([]int, MAX_HEIGHT + 1),
    }
    return sl
}

func (sl *List[T]) GetNode(i uint) (*ListNode[T]) {
    if (sl.Len <= i) {
        return nil
    }
    sln := &sl.Sentinel
    r := sl.Height
    j := -1
    for r >= 0 {
        for sln.Next[r] != nil && j + sln.Len[r] < int(i) {
            j += sln.Len[r]
            sln = sln.Next[r]
        }
        r -= 1
    }
    return sln.Next[0]
}

func (sl *List[T]) Get(i uint) (T, error) {
    if (sl.Len <= i) {
        var s T
        return s, errors.New("Error: The index is out of range")
    }
    sln:= sl.GetNode(i)
    return sln.Value, nil
}

func (sl *List[T]) Set(i uint, v T) (T, error) {
    if (sl.Len <= i) {
        var s T
        return s, errors.New("Error: The index is out of range")
    }
    sln := sl.GetNode(i)
    y := sln.Value
    if sln != &sl.Sentinel {
        sln.Value = v
    }
    return y, nil
}

func (sl *List[T]) Add(i uint, v T) {
    if (sl.Len < i) {
        i = sl.Len
    }
    newh := pickHeight()
    newsln := NewListNode[T](newh, v)

    if sl.Height < newh {
        sl.Height = newh
    }
    sln := &sl.Sentinel
    var r int = int(sl.Height)
    var j int = -1
    for r >= 0 {
        for sln.Next[r] != nil && j + sln.Len[r] < int(i) {
            j += sln.Len[r]
            sln = sln.Next[r]
        }
        sln.Len[r] += 1
        if r < int(newh) {
            newsln.Next[r] = sln.Next[r]
            sln.Next[r] = newsln
            newsln.Len[r] = sln.Len[r] - (int(i) - j)
            sln.Len[r] = int(i) - j
        }
        r -= 1
    }
    sl.Len += 1
}

func (sl *List[T]) Remove(i uint) (T, error) {
    var v T
    if (sl.Len == 0) {
        return v, errors.New("Error: You can not remove an element when the list is empty")
    }
    if (sl.Len <= i) {
        i = sl.Len - 1
    }
    sln := &sl.Sentinel
    var r int = int(sl.Height)
    var j = -1;
    for r >= 0 {
        for sln.Next[r] != nil && j + sln.Len[r] < int(i) {
            j += sln.Len[r]
            sln = sln.Next[r]
        }
        sln.Len[r] -= 1
        if sln.Next[r] != nil && j + sln.Len[r] + 1 == int(i) {
            v = sln.Next[r].Value
            sln.Len[r] = sln.Len[r] + sln.Next[r].Len[r]
            sln.Next[r] = sln.Next[r].Next[r]
            if sln == &sl.Sentinel && sln.Next[r] == nil {
                sl.Height -= 1
            }
        }
        r -= 1
    }
    sl.Len -= 1
    return v, nil
}
