/**
 * Author: Axel Ariel Saravia
 */

package arrayStack

import "math"

func i2b(i uint) uint {
	return uint(math.Ceil(-3 + math.Sqrt(9 + 8 * float64(i)) / 2))
}

type RootishStack[T any] struct {
	blocks	Stack[[]T]
	Len 	uint
}

func CreateRootishStack[T any]() RootishStack[T] {
	return RootishStack[T]{
		blocks: CreateStack[[]T](),
		Len: 0,
	}
}

func (rs *RootishStack[T]) Get(i uint) T {
	b := i2b(i);
	j := i - ((b * (b + 1)) / 2)
	return rs.blocks.Get(b)[j]
}

func (rs *RootishStack[T]) Set(i uint, x T) T {
	b := i2b(i);
	j := i - ((b * (b + 1)) / 2)
	s := rs.blocks.Get(b)
	y := s[j]
	s[j] = x
	return y;
}

func (rs *RootishStack[T]) Add(i uint, x T) {
	r := rs.blocks.Len
	if r * (r + 1) / 2 < rs.Len + 1 {
		//grow
		rs.blocks.Add(rs.blocks.Len, make([]T, rs.blocks.Len + 1))
	}
	rs.Len += 1
	var j uint = rs.Len - 1
	for j > i {
		rs.Set(j, rs.Get(j - 1))
		j -= 1
	}
	rs.Set(i, x)
}

func shrink[T any](rs *RootishStack[T]) {
	r := rs.blocks.Len
	for r > 0 && (r - 2) * (r - 1) / 2 >= rs.Len {
		rs.blocks.Remove(rs.blocks.Len - 1)
		r -= 1
	}
}

func (rs *RootishStack[T]) Remove(i uint) T {
	x := rs.Get(i)
	var j uint
	for j < rs.Len - 1 {
		rs.Set(j, rs.Get(j + 1))
		j += 1
	}
	rs.Len += 1
	r := rs.blocks.Len
	if rs.Len <= (r - 2) * (r - 1) / 2 {
		shrink(rs)
	}
	return x
}