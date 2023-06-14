/**
* Author: Axel Ariel Saravia
*/

package scapegoattree

import "math"

type inequable interface {
    ~int	| ~uint 	| ~int8 	| ~uint8 	|
    ~int16	| ~uint16	| ~int32	| ~uint32	|
    ~int64	| ~uint64	| ~float32	| ~float64	|
    ~uintptr| ~string
}

type BinaryNode[T inequable] struct {
    Left	*BinaryNode[T]
    Right	*BinaryNode[T]
    Parent	*BinaryNode[T]
    Value	T
}

type ScapegoatTree[T inequable] struct {
    Root 	 *BinaryNode[T]
    Elements uint
    counter	 uint
}

func NewBinaryNode[T inequable](v T, p *BinaryNode[T]) *BinaryNode[T] {
    res := new(BinaryNode[T])
    *res = BinaryNode[T]{
        Left: nil,
        Right: nil,
        Parent: p,
        Value: v,
    }
    return res
}

func (sn *BinaryNode[T]) Size() uint {
    var n uint = 0
    var u *BinaryNode[T] = sn
    var prv *BinaryNode[T]
    var nxt *BinaryNode[T]
    for u != nil {
        if prv == u.Parent {
            n += 1
            if u.Left != nil {
                nxt = u.Left
            } else if u.Right != nil {
                nxt = u.Right
            } else {
                nxt = u.Parent
            }
        } else if prv == u.Left {
            if u.Right != nil {
                nxt = u.Right
            } else {
                nxt = u.Parent
            }
        } else {
            nxt = u.Parent
        }
        prv = u
        u = nxt
    }
    return n
}

func (sn *BinaryNode[T]) FindEq(v T) *BinaryNode[T] {
    for sn != nil {
        if v < sn.Value {
            sn = sn.Left
        } else if v > sn.Value {
            sn = sn.Right
        } else {
            return sn
        }
    }
    return nil
}

func packIntoArrayRecursive[T inequable](
    u *BinaryNode[T],
    a []*BinaryNode[T],
    i uint,
) uint {
    if u == nil {
        return i
    }
    i = packIntoArrayRecursive[T](u.Left, a, i)
    a[i] = u
    i += 1
    return packIntoArrayRecursive[T](u.Right, a, i)
}

func buildBalanceRecursive[T inequable](
    a []*BinaryNode[T],
    i uint,
    ns uint,
) *BinaryNode[T] {
    if ns == 0 {
        return nil
    }
    m := ns / 2
    u := a[i + m]
    u.Left = buildBalanceRecursive[T](a, i, m)
    if u.Left != nil {
        u.Left.Parent = u
    }
    u.Right = buildBalanceRecursive[T](a, i + m + 1, ns - m - 1)
    if u.Right != nil {
        u.Right.Parent = u
    }
    return u
}

func (st *ScapegoatTree[T]) Rebuild(u *BinaryNode[T]) {
    p := u.Parent
    ns := u.Size() 
    a := make([]*BinaryNode[T], ns)
    packIntoArrayRecursive[T](u, a, 0)
    if p != nil {
        st.Root = buildBalanceRecursive[T](a, 0, ns)
        st.Root.Parent = nil
    } else if  p.Right == u {
        p.Right = buildBalanceRecursive[T](a, 0, ns)
        p.Right.Parent = u
    } else {
        p.Left = buildBalanceRecursive[T](a, 0, ns)
        p.Left.Parent = u
    }
}

const _3div2 float64 = 3 / 2
func log3div2(x float64) float64 {
    return math.Log2(x) / math.Log2(_3div2);
}

func (st *ScapegoatTree[T]) Add(v T) bool {
    var depth uint = 0
    var newbn *BinaryNode[T]
    //Search if exist the Node with v and if not create a new node
    //This is similar to the function addNode in BinarySearchTree
    {
        var p *BinaryNode[T]
        //find the node or a proper parent
        var prev *BinaryNode[T]
        for w := st.Root; w != nil; {
            prev = w
            depth += 1
            if v < w.Value {
                w = w.Left
            } else if v > w.Value {
                w = w.Right
            } else {
                // We find the node, then is no need to insert it
                return false
            }
        }
        p = prev
        newbn = NewBinaryNode[T](v, p)
        if p == nil {
            st.Root = newbn
        } else {
            if newbn.Value < p.Value {
                p.Left = newbn
            } else {
                p.Right = newbn
            }
        }
    }
    st.Elements += 1
    st.counter += 1
    if log3div2(float64(st.counter)) < float64(depth) {
        //depth exeeded, find scapegoat
        w := newbn.Parent
        for 3 * w.Size() <= 2 * w.Parent.Size() {
            w = w.Parent
        }
        st.Rebuild(w.Parent)
    }
    return true
}

func (st *ScapegoatTree[T]) Remove(v T) bool {
    u := st.Root.FindEq(v)
    if u == nil {
        return false
    }
    if u.Left != nil && u.Right != nil {
        // search the node that have the closest value
        // to the removed node value.
        // switch values and remove that node instead
        w := u.Right
        for w.Left != nil {
            w = w.Left
        }
        u.Value = w.Value
        u = w
    }
    //Splice
    var p *BinaryNode[T]
    var s *BinaryNode[T]
    if u.Left != nil {
        s = u.Left
    } else {
        s = u.Right
    }
    if u == st.Root {
        st.Root = s
    } else {
        p = u.Parent
        if p.Left == u {
            p.Left = s
        } else {
            p.Right = s
        }
    }
    if s != nil {
        s.Parent = p
    }
    st.Elements -= 1
    //
    if 2 * st.Elements < st.counter {
        st.Rebuild(st.Root)
        st.counter = st.Elements
    }
    return true
}
