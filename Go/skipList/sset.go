/**
* Author: Axel Ariel Saravia
*/

package skiplist

type SSetNode[T inequable] struct {
    Height uint
    Next []*SSetNode[T]
    Value T
}

type SSet[T inequable] struct {
    Height uint
    Len uint
    Sentinel SSetNode[T]
    Stack []*SSetNode[T]
}

func NewSSetNode[T inequable](v T, h uint) *SSetNode[T] {
    var res *SSetNode[T] = new(SSetNode[T])
    *res = SSetNode[T]{
        Height: h,
        Next: make([]*SSetNode[T], h + 1),
        Value: v,
    }
    return res
}

// MAX_HEIGHT = 31
func CreateSSet[T inequable]() SSet[T] {
    return SSet[T]{
        Height: 0,
        Len: 0,
        Sentinel: SSetNode[T]{
            Height: MAX_HEIGHT,
            Next: make([]*SSetNode[T], MAX_HEIGHT + 1),
        },
        Stack: make([]*SSetNode[T], MAX_HEIGHT),
    }
}

func (s *SSet[T]) GetNode(v T) *SSetNode[T] {
    sn := &s.Sentinel
    r := int(s.Height)
    for r >= 0 {
        for sn.Next[r] != nil && sn.Next[r].Value < v {
            sn = sn.Next[r]
        }
        r -= 1
    }
    return sn.Next[0]
}

func (s *SSet[T]) Find(v T) (T, *SSetNode[T]) {
    sn := s.GetNode(v)
    var res T 
    if sn != nil {
        res = sn.Value
    }
    return res, sn
}

func (s *SSet[T]) Add(v T) bool {
    sn := &s.Sentinel
    r := int(s.Height)
    for r >= 0 {
        for sn.Next[r] != nil && sn.Next[r].Value < v {
            sn = sn.Next[r]
        }
        if sn.Next[r] != nil && sn.Next[r].Value == v {
            return false
        }
        s.Stack[r] = sn
        r -= 1
    }
    newh := pickHeight()
    newsn := NewSSetNode[T](v, newh)
    for s.Height < newh {
        s.Height += 1
        s.Stack[s.Height] = &s.Sentinel
    }
    var i uint = 0
    for i < newh {
        newsn.Next[i] = s.Stack[i].Next[i]
        s.Stack[i].Next[i] = newsn
        i += 1
    }
    s.Len += 1
    return true
}

func (s *SSet[T]) Remove(v T) bool {
    removed := false
    sn := &s.Sentinel
    r := s.Height
    for r >= 0 {
        for sn.Next[r] != nil && sn.Next[r].Value < v {
            sn = sn.Next[r]
        }
        if sn.Next[r] != nil && sn.Next[r].Value == v {
            removed = true
            sn.Next[r] = sn.Next[r].Next[r]
            if sn == &s.Sentinel && sn.Next[r] == nil {
                s.Height -= 1
            }
        }
        r -= 1
    }
    if removed {
        s.Len -= 1
    }
    return removed
}
