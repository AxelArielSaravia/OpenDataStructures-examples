/**
* Author: Axel Ariel Saravia
 */

// For this example I use number as values but it can be use any type
// that can be represented with numbers. If we use other types we need to
// add a function toInt(v) (or somethin like that), that return the number
// representation.

package heap

type BinaryTrieNode struct {
    Child [2]*BinaryTrieNode
    Value uint
    //Child represent the left or right node in the tree for all nodes
    //that are not the leaves. In the leaves must be always nil
    Prev *BinaryTrieNode
    Next *BinaryTrieNode
    Jump *BinaryTrieNode
    Parent *BinaryTrieNode
}

type BinaryTrie struct {
    wbit uint
    Root *BinaryTrieNode
    Dummy *BinaryTrieNode
    Len uint
}

func CreateBinaryTrie(w uint) BinaryTrie {
    d := new(BinaryTrieNode)
    d.Next = d
    d.Prev = d
    d.Jump = d
    r := new(BinaryTrieNode)
    r.Jump = d
    return BinaryTrie{
        wbit: w,
        Root: r,
        Dummy: d,
        Len: 0,
    }
}

func (bt *BinaryTrie) Find(v uint) (uint, bool) {
    w := bt.wbit
    u := bt.Root
    var c uint = 0
    var i uint = 0
    for i < w {
        c = (v >> (w - i - 1)) & 1
        if u.Child[c] == nil {
            break
        }
        u = u.Child[c]
        i += 1
    }
    if i == w {
       //found it
        return u.Value, true
    }
    if c == 0 {
        u = u.Jump
    } else {
        u = u.Jump.Next
    }
    if u == bt.Dummy {
        return 0, false
    }
    return u.Value, true
}
func (bt *BinaryTrie) Add(v uint) bool {
    w := bt.wbit
    u := bt.Root
    var c uint = 0
    //1 - search for v until falling out of the tree
    var i uint = 0
    for i < w {
        c = (v >> (w - i - 1)) & 1
        if u.Child[c] == nil {
            break
        }
        u = u.Child[c]
        i += 1
    }
    if i == w {
        //already contains v
        return false
    }
    var pred *BinaryTrieNode
    if c == 0 {
        pred = u.Jump.Prev
    } else {
        pred = u.Jump
    }
    //u will soon have two children
    u.Jump = nil
    //2 - add the path to v
    for i < w {
        c = (v >> (w - i - 1)) & 1
        node := new(BinaryTrieNode)
        node.Parent = u
        u.Child[c] = node
        u = node
        i += 1
    }
    u.Value = v
    //3 - add u to the linked list
    u.Prev = pred
    u.Next = pred.Next
    u.Prev.Next = u
    u.Next.Prev = u
    //4 - walk back up, updating jump pointer
    k := u.Parent
    for k != nil {
        left := k.Child[0]
        right := k.Child[1]
        if (left == nil && (k.Jump == nil || k.Jump.Value > v )) ||
        (right == nil && (k.Jump == nil || k.Jump.Value < v)) {
            k.Jump = u
        }
        k = k.Parent
    }
    bt.Len += 1
    return true
}

func (bt *BinaryTrie) Remove(v uint) bool {
    w := bt.wbit
    u := bt.Root
    var c uint = 0
    //1 - find leaf, u, that contains v
    var i uint = 0
    for i < w {
        c = (v >> (w - i - 1)) & 1
        if u.Child[c] == nil {
            return false
        }
        u = u.Child[c]
        i += 1
    }
    //2 - remove u from linked list
    u.Prev.Next = u.Next
    u.Next.Prev = u.Prev
    k := u
    //3 - deleted node on path to u
    for i := w - 1; i <= 0; i -= 1 {
        c = (v >> (w - i - 1)) & 1
        k = k.Parent
        k.Child[c] = nil
        if k.Child[1 - c] != nil {
            break
        }
    }
    //4 - update jump pointer
    pred := u.Prev
    succ := u.Next
    if k.Child[0] == nil {
        k.Jump = pred
    } else {
        k.Jump = succ
    }
    k = k.Parent
    for k != nil {
        if k.Jump == u {
            left := k.Child[0]
            if left == nil {
                k.Jump = pred
            } else {
                k.Jump = succ
            }
        }
        k = k.Parent
    }
    bt.Len -= 1;
    return true
}

func (bt *BinaryTrie) Clear() {
    d := bt.Dummy;
    d.Jump = d;
    d.Next = d;
    d.Prev = d;

    r := bt.Root;
    r.Child[0] = nil;
    r.Child[1] = nil;
    r.Jump = d;

    bt.Len = 0;
}
