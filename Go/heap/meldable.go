/**
* Author: Axel Ariel Saravia
*/

package heap

import "math/rand"

type MeldableNode[T inequable] struct {
    Left	*MeldableNode[T]
    Right	*MeldableNode[T]
    Parent	*MeldableNode[T]
    Value 	T
}

type MeldableHeap[T inequable] struct {
    Root		*MeldableNode[T]
    Elements	uint
}

func NewMeldableNode[T inequable](
    v T, 
    l, r *MeldableNode[T]) *MeldableNode[T] {
        res := new(MeldableNode[T])
        *res = MeldableNode[T]{
            Left: l,
            Right: r,
            Parent: nil,
            Value: v,
        }
        return res
    }

    func MergeRecursive[T inequable](
        h1 *MeldableNode[T],
        h2 *MeldableNode[T],
    ) *MeldableNode[T] {

        if h1 == nil {
            return h2
        } else if h2 == nil {
            return h1
        }
        if h2.Value < h1.Value {
            h1, h2 = h2, h1
        }
        if rand.Float64() < 0.5 {
            h1.Left = MergeRecursive[T](h1.Left, h2)
            h1.Left.Parent = h1
        } else {
            h1.Right = MergeRecursive[T](h1.Right, h2)
            h1.Right.Parent = h1
        }
        return h1
    }

    func (mh *MeldableHeap[T]) AddRecursive(v T) bool {
        u := new(MeldableNode[T])
        u.Value = v
        mh.Root = MergeRecursive[T](u, mh.Root)
        mh.Root.Parent = nil
        mh.Elements += 1
        return true
    }

    func (mh *MeldableHeap[T]) RemoveRecursive() (T, bool) {
        var res T
        if mh.Root == nil {
            return res, false
        }
        res = mh.Root.Value
        mh.Root = MergeRecursive[T](mh.Root.Left, mh.Root.Right)
        if mh.Root != nil {
            mh.Root.Parent = nil
        }
        mh.Elements -= 1
        return res, true
    }

    // This is the imperative version of the MergeRecursive function
    func Merge[T inequable](h1, h2 *MeldableNode[T]) *MeldableNode[T] {
        if h1 == nil {
            return h2
        } else if h2 == nil {
            return h1
        }
        if h2.Value < h1.Value {
            h1, h2 = h2, h1
        }
        res := h1
        for {
            if h2.Value < h1.Value {
                p := h1.Parent
                if p != nil {
                    if p.Left == h1 {
                        p.Left = h2
                    } else {
                        p.Right = h2
                    }
                }
                h2.Parent = p
                h1, h2 = h2, h1
            }
            if rand.Float64() < 0.5 {
                if h1.Left == nil {
                    h1.Left = h2
                    h2.Parent = h1
                    return res
                } else {
                    h1 = h1.Left
                } 
            } else {
                if h1.Right == nil {
                    h1.Right = h2
                    h2.Parent = h1
                    return res
                } else {
                    h1 = h1.Right
                } 
            }
        }
    }

    // This is a modification of the original merge function.
    // we trying to fill the first empty space that appears.
    // we maintain the random choise but if the child chosen
    // is not empty and other it is, then we fill it.
    func Merge2[T inequable](h1, h2 *MeldableNode[T]) *MeldableNode[T] {
        if h1 == nil {
            return h2
        } else if h2 == nil {
            return h1
        }
        if h2.Value < h1.Value {
            h1, h2 = h2, h1
        }
        res := h1
        for {
            if h2.Value < h1.Value {
                p := h1.Parent
                if p != nil {
                    if p.Left == h1 {
                        p.Left = h2
                    } else {
                        p.Right = h2
                    }
                }
                h2.Parent = p
                h1, h2 = h2, h1
            }
            if rand.Float64() < 0.5 {
                if h1.Left == nil {
                    h1.Left = h2
                    h2.Parent = h1
                    return res
                } else if h1.Right == nil {
                    h1.Right = h2
                    h2.Parent = h1
                    return res
                } else {
                    h1 = h1.Left
                } 
            } else {
                if h1.Right == nil {
                    h1.Right = h2
                    h2.Parent = h1
                    return res
                } else if h1.Left == nil {
                    h1.Left = h2
                    h2.Parent = h1
                    return res
                }else {
                    h1 = h1.Right
                } 
            }
        }
    }

    func (mh *MeldableHeap[T]) Add(v T) bool {
        u := new(MeldableNode[T])
        u.Value = v
        mh.Root = Merge2[T](u, mh.Root)
        mh.Root.Parent = nil
        mh.Elements += 1
        return true
    }

    func (mh *MeldableHeap[T]) Remove() (T, bool) {
        var res T
        if mh.Root == nil {
            return res, false
        }
        res = mh.Root.Value
        mh.Root = Merge2[T](mh.Root.Left, mh.Root.Right)
        if mh.Root != nil {
            mh.Root.Parent = nil
        }
        mh.Elements -= 1
        return res, true
    }
