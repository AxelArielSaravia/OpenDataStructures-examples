package binarySearchTree

type inequable interface {
	~int	| ~uint 	| ~int8 	| ~uint8 	|
	~int16	| ~uint16	| ~int32	| ~uint32	|
	~int64	| ~uint64	| ~float32	| ~float64	|
	~uintptr| ~string
}

type BinaryNode[T inequable] struct {
	Left	*BinaryNode[T]
	Parent	*BinaryNode[T]
	Right	*BinaryNode[T]
	Value	T
}

type BinarySearchTree[T inequable] struct {
	Root 	 *BinaryNode[T]
	Elements int
}

func newBinaryNode[T inequable](v T, p *BinaryNode[T]) *BinaryNode[T] {
	var bn *BinaryNode[T] = new(BinaryNode[T])
	bn.Parent = p
	bn.Value = v
	return bn
}

func (bn *BinaryNode[T]) FindEq(v T) *BinaryNode[T] {
	for bn != nil {
		switch {
			case v < bn.Value: bn = bn.Left
			case v > bn.Value: bn = bn.Right
			default: return bn
		}
	}
	return nil
}

func (bn *BinaryNode[T]) Find(v T) *BinaryNode[T] {
	var u *BinaryNode[T]
	for bn != nil {
		switch {
			case v < bn.Value: {
				u = bn
				bn = bn.Left
			}
			case v > bn.Value: bn = bn.Right
			default: return bn
		}
	}
	if u == nil {
		return nil
	}
	return u
}

func (bst *BinarySearchTree[T]) Add(v T) bool {
	var p *BinaryNode[T]
	{ // find the node or a proper parent
		var prev *BinaryNode[T]
		var w *BinaryNode[T] = bst.Root
		for w != nil {
			prev = w
			switch {
				case v < w.Value: w = w.Left
				case v > w.Value: w = w.Right
				default: return false
			}
		}
		p = prev
	}
	var bn *BinaryNode[T] = newBinaryNode(v, p)
	
	if p == nil {
		bst.Root = bn
	} else {
		if v < p.Value {
			p.Left = bn
		} else {
			p.Right = bn
		}
	}
	bst.Elements += 1
	return true 
}

func (bst *BinarySearchTree[T]) RemoveNode(v T) bool {
	var bn *BinaryNode[T] = bst.Root.FindEq(v)
	if bn == nil {
		return false
	}
	if bn.Left != nil && bn.Right != nil {
		var w *BinaryNode[T] = bn.Right
		for w.Left != nil {
			w = w.Left
		}
		bn.Value = w.Value
		splice(bst, bn)
	} else {
		splice(bst, bn)
	}
	return true
}

func splice[T inequable](bst *BinarySearchTree[T], bn *BinaryNode[T]) {
	var s *BinaryNode[T]
	if bn.Left != nil {
		s = bn.Left
	} else {
		s = bn.Right
	}
	var p *BinaryNode[T]
	if bn == bst.Root {
		bst.Root = s
	} else {
		p = bn.Parent
		if p.Left == bn {
			p.Left = s
		} else {
			p.Right = s
		}
	}
	if s != nil {
		s.Parent = s
	}
	bst.Elements -= 1
}