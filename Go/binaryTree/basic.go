/**
* Author: Axel Ariel Saravia
*/

package binaryTree

type SimpleNode struct {
    Left  *SimpleNode
    Right *SimpleNode
}

func NewBinaryTree(depth uint) *SimpleNode {
    if depth == 0 {
        return new(SimpleNode)
    }
    if depth == 1 {
        n := new(SimpleNode)
        n.Left = new(SimpleNode)
        n.Right = new(SimpleNode)
        return n
    }
    q := make([]*SimpleNode, 0, 1<<(depth-1))
    n := new(SimpleNode)
    q = append(q, n)
    var x uint = 1
    for len(q) > 0 {
        u := q[0]
        q = q[1:]
        u.Left = new(SimpleNode)
        u.Right = new(SimpleNode)
        if x < depth {
            q = append(q, u.Left, u.Right)
        }
        if len(q) == 1<<x {
            x += 1
        }
    }
    return n
}

func SizeRecursive(sn *SimpleNode) uint {
    if sn == nil {
        return 0
    } 
    var m1 uint = SizeRecursive(sn.Left)
    var m2 uint = SizeRecursive(sn.Right)
    if m1 < m2 {
        return 1 + m2
    } else {
        return 1 + m1
    }
}

func HeightRecursive(sn *SimpleNode) uint {
    if sn == nil {
        return 0 
    }
    var m1 uint = HeightRecursive(sn.Left)
    var m2 uint = HeightRecursive(sn.Right)
    if m1 < m2 {
        return 1 + m2
    } else {
        return 1 + m1
    }
}

//This Traversal function is a Deep First Traversal 
func TraveseRecursive(sn *SimpleNode) {
    if sn != nil {
        return
    }
    TraveseRecursive(sn.Left)
    TraveseRecursive(sn.Right)
}

type BinaryNode struct {
    Left	*BinaryNode
    Right	*BinaryNode
    Parent	*BinaryNode
}

func Deep(bn *BinaryNode) uint {
    var d uint = 0
    for bn != nil {
        bn = bn.Parent
        d += 1
    }
    return d
}

func Size(bn *BinaryNode) uint {
    //Based in the travese function
    var n uint = 0
    var prv *BinaryNode
    var nxt *BinaryNode
    for bn != nil {
        if prv == bn.Parent {
            n += 1
            if bn.Left != nil {
                nxt = bn.Left
            } else if bn.Right != nil {
                nxt = bn.Right
            } else {
                nxt = bn.Parent
            }
        } else if prv == bn.Left {
            if bn.Right != nil {
                nxt = bn.Right
            } else {
                nxt = bn.Parent
            }
        } else {
            nxt = bn.Parent
        }
        prv = bn
        bn = nxt
    }
    return n
}

func Height(bn *BinaryNode) uint {
    //Based in the travese function
    var n uint = 0 // keeps the depthes value
    var m uint = n // keep track of the depths of each node
    var prv *BinaryNode
    var nxt *BinaryNode
    for bn != nil {
        if prv == bn.Parent {
            m += 1
            if bn.Left != nil {
                nxt = bn.Left
            } else if bn.Right != nil {
                nxt = bn.Right
            } else {
                nxt = bn.Parent
            }
        } else if prv == bn.Left {
            m -= 1
            if bn.Right != nil {
                nxt = bn.Right
            } else {
                nxt = bn.Parent
            }
        } else {
            m -= 1
            nxt = bn.Parent
        }
        if m > n {
            n = m
        }
        prv = bn
        bn = nxt
    }
    return n
}

//This Traversal function is named as Deep First Traversal 
func Travese1(bn *BinaryNode) {
    var prv *BinaryNode
    var nxt *BinaryNode
    for bn != nil {
        if prv == bn.Parent {
            if bn.Left != nil {
                nxt = bn.Left
            } else if bn.Right != nil {
                nxt = bn.Right
            } else {
                nxt = bn.Parent
            }
        } else if prv == bn.Left {
            if bn.Right != nil {
                nxt = bn.Right
            } else {
                nxt = bn.Parent
            }
        } else {
            nxt = bn.Parent
        }
        prv = bn
        bn = nxt
    }
}

// Some implementations of binary trees do not use  the parent field
// couse that we need to use a list or a stack to keep track of the path
// from the current node to the root
func Travese2(bn *BinaryNode) {
    var u *BinaryNode
    var left *BinaryNode
    var right *BinaryNode
    var stack []*BinaryNode
    stack = append(stack, bn)
    for len(stack) > 0 {
        u = stack[len(stack) - 1]
        // if u.right === left means that we visit all the nested nodes
        if u.Right != nil && u.Right == left {
            left = u
            stack = stack[:len(stack)-1]
        } else {
            if u.Left != nil && u.Left != left {
                stack = append(stack, u.Left)
                left = u.Left
            } else if u.Right != nil && u.Right != right {
                stack = append(stack, u.Right)
                right = u.Right
            } else {
                if u != left && u != right {
                    // We asume that the node u is the left of his parent
                    // otherwise if is the right node, means that we need to go up again,
                    // cause this we pass for all the nested nodes
                    left = u
                }
                stack = stack[1:] 
            }
        }
    }
}

// Breadth First Traversal
func BFTraversal(bn *SimpleNode) {
    var u *SimpleNode
    var queue []*SimpleNode
    queue = append(queue, bn)
    for len(queue) > 0 {
        u = queue[0]
        if u.Left != nil {
            queue = append(queue, u.Left)
        }
        if u.Right != nil {
            queue = append(queue, u.Left)
        }
        queue = queue[1:]
    }
}
