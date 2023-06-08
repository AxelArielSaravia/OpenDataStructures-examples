/**
 * Author: Axel Ariel Saravia
 */

/**
 * BlackRedTree Properties:
 *
 * 1.[Black-height] There are the same number of black nodes on every Root
 *   to leaf path (The sum of the colours on any Root to leaf path is the same)
 *
 * 2.[No-red-edge] No two red nodes are adjacent (For any node u, except the Root, u.Color + u.Parent.Color >= 1)
 *
 * This version of RedBlackTree structure use the leaft-leaning property
 *
 * 3.[Left-leaning] At any node u, if u.Left is black then u.Right is black
 */

package redBlackTree

type (
	T int
	Color uint8
	RedBlackNode struct {
		Left *RedBlackNode
		Right *RedBlackNode
		Parent *RedBlackNode
		Value T
		Color Color
	}
	RedBlackTree struct {
		Root *RedBlackNode
		Elements uint
	}
)

const (
	RED Color = iota
	BLACK
)

func (c Color) String() string {
	switch c {
		case RED: return "red"
		case BLACK: return "black"
		case 2: return "black+black" 
		default: return ""
	}
}

func (rbn *RedBlackNode) FindEq(v T) *RedBlackNode{
	u := rbn
	for u != nil {
		if v < u.Value {
			u = u.Left
		} else if v > u.Value {
			u = u.Right
		} else {
			return rbn
		}
	}
	return nil
}

func (rbt *RedBlackTree) Add(v T) bool {
	var u *RedBlackNode
	{ // Add Node
		var p *RedBlackNode
		// find the node or a proper Parent
		var w *RedBlackNode = rbt.Root
		var prev *RedBlackNode
		for w != nil {
			prev = w
			switch {
				case v < w.Value: w = w.Left
				case v > w.Value: w = w.Right
			// We find the node, then is no need to insert it
				default: return false
			}
		}
		p = prev
		u = NewRedBlackNode(v, p)
		if p == nil {
			rbt.Root = u
		} else {
			if v < p.Value {
				p.Left = u
			} else {
				p.Right = u
			}
		}
		rbt.Elements += 1
	}
	// fix up
	for u.Color == RED {
		if u == rbt.Root {
			u.Color = BLACK
			return true
		}
		var w *RedBlackNode = u.Parent
		if w.Left == nil || w.Left.Color == BLACK {
	// flipLeft swap w and u nodes, now w is the Left child of u,
    // Couse this we need to set u as the child of w again
    // and w as the Parent
			flipLeft(rbt, w)
			u = w
			w = u.Parent
		}
		if w.Color == BLACK {
			return true
		}
		var g *RedBlackNode = w.Parent
		if g.Right == nil || g.Right.Color == BLACK {
			flipRight(rbt, g)
			return true
		}
		pushBlack(g)
		u = g
 	}
	return true
}

func (rbt *RedBlackTree) Remove(v T) bool {
	var u *RedBlackNode = rbt.Root.FindEq(v)
	if u == nil {
		return false
	}
	var w *RedBlackNode = u.Right
	if w == nil {
		w = u
		u = w.Left
	} else {
		for w.Left != nil {
			w = w.Left
		}
		u.Value = w.Value 
		u = w.Right
	}
	{// splice
		var s *RedBlackNode
		if Left := w.Left; Left != nil {
			s = Left
		} else {
			s = w.Right
		}
		var p *RedBlackNode
		if w == rbt.Root {
			rbt.Root = s
		} else {
			p = w.Parent
			if p.Left == w {
				p.Left = s 
			} else {
				p.Right = s
			}
		}
		if s != nil {
			s.Parent = p
		}
		rbt.Elements -= 1
	}

	u.Color = u.Color + w.Color
	u.Parent = w.Parent

	// fix up
	for u.Color > BLACK {
		if u == rbt.Root {
			u.Color = BLACK
			return true
		}
		var m *RedBlackNode = u.Parent
		if m.Left != nil && m.Left.Color == RED {
			flipRight(rbt, m)
		} else if u == m.Left {
			var c *RedBlackNode = m.Right
			pullBlack(m)
			flipLeft(rbt, m)
			var q *RedBlackNode = m.Right
			if q != nil && q.Color == RED {
				rotateLeft(rbt, m)
				flipRight(rbt, c)
				pushBlack(q)
				if c.Right != nil && c.Right.Color == RED {
					flipLeft(rbt, c)
				}
				u = q
			} else {
				u = c
			}
		} else {
			var c *RedBlackNode = m.Left
			pullBlack(m)
			flipRight(rbt, m)
			var q *RedBlackNode = m.Left
			if q != nil && q.Color == RED {
				// q - m is red - red
				rotateRight(rbt, m)
				flipLeft(rbt, c)
				pushBlack(q)
				u = q
			} else if c.Left != nil && c.Left.Color == RED {
				pushBlack(c)
				u = c
			} else {
				// ensure Left-leaning
				flipLeft(rbt, c)
				u = m
			}
		}
	}
	if u != rbt.Root {
		var m *RedBlackNode = u.Parent
		rightIsRed := m.Right != nil && m.Right.Color == RED
		leftIsBlack := m.Left == nil || m.Left.Color == BLACK
		if  rightIsRed && leftIsBlack {
			flipLeft(rbt, m)
		}
	}
	return true;
}

func NewRedBlackNode(v T, p *RedBlackNode) *RedBlackNode {
	rbt := new(RedBlackNode);
	rbt.Color = RED;
	rbt.Value = v;
	rbt.Parent = p;
	return rbt;
}

func pushBlack(u *RedBlackNode) {
	u.Color = u.Color - 1
	u.Left.Color = u.Left.Color + 1
	u.Right.Color = u.Right.Color + 1
}

func pullBlack(u *RedBlackNode) {
	u.Color = u.Color + 1
	u.Left.Color = u.Left.Color - 1
	u.Right.Color = u.Right.Color - 1
}

func rotateLeft(rbt *RedBlackTree, u *RedBlackNode) {
	w := u.Right
	w.Parent = u.Parent
	if w.Parent != nil {
		if w.Parent.Left == u {
			w.Parent.Left = w
		} else {
			w.Parent.Right = w
		}
	}
	u.Right = w.Left
	if u.Right != nil {
		u.Right.Parent = u
	}
	u.Parent = w
	w.Left = u
	if u == rbt.Root {
		w.Parent = nil
		rbt.Root = w
	}
}

func rotateRight(rbt *RedBlackTree, u *RedBlackNode) {
	w := u.Left
	w.Parent = u.Parent
	if w.Parent != nil {
		if w.Parent.Left == u {
			w.Parent.Left = w
		} else {
			w.Parent.Right = w
		}
	}
	u.Left = w.Right
	if u.Left != nil {
		u.Left.Parent = u
	}
	u.Parent = w
	w.Right = u
	if u == rbt.Root {
		w.Parent = nil
		rbt.Root = w
	}
}

func flipLeft(rbt *RedBlackTree, u *RedBlackNode) {
	u.Color, u.Right.Color = u.Right.Color, u.Color
	rotateLeft(rbt, u)
}

func flipRight(rbt *RedBlackTree, u *RedBlackNode) {
	u.Color, u.Left.Color = u.Left.Color, u.Color
	rotateRight(rbt, u)
}