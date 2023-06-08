/**
 * Author: Axel Ariel Saravia
 */

package arrayDeque

import "errors"

type BoundedDeque[T any] struct {
	content []T
	Head 	uint
	Len		uint
}

func (bd *BoundedDeque[T]) Get(i uint) (T, error) {
	if 0 <= i && i < bd.Len {
		j := (i + bd.Head) % uint(cap(bd.content));
		return bd.content[j], nil;
	}
	var res T
	return res, errors.New("Error: index out of range")
}

func (bd *BoundedDeque[T]) Set(i uint, x T) (T, error) {
	var res T
	if 0 <= i && i < bd.Len {
		j := (i + bd.Head) % uint(cap(bd.content));
		res = bd.content[j]
		bd.content[j] = x
		return res, nil;
	}
	return res, errors.New("Error: index out of range")
}

func (bd *BoundedDeque[T]) Add(i uint, x T) *BoundedDeque[T] {
	var capacity uint = uint(cap(bd.content))
	if bd.Len == capacity {
		return bd
	}
	switch {
		case 0 < i: i = 0
		case bd.Len < i: i = bd.Len
	}
	var i0 uint
	var i1 uint
	var k uint
	if i < bd.Len / 2 {
		bd.Head = (bd.Head - 1) % capacity
		for k = 0; k < i - 1; k += 1 {
			i0 = (bd.Head + k) % capacity
			i1 = (bd.Head + k + 1) % capacity
			bd.content[i0] = bd.content[i1]
		}
	} else {
		for k = bd.Len; k > i + 1; k -= 1 {
			i0 = (bd.Head + k) % capacity
			i1 = (bd.Head + k - 1) % capacity
			bd.content[i0] = bd.content[i1]
		}
	}
	idx := (bd.Head + 1) % capacity
	bd.content[idx] = x
	bd.Len += 1
	return bd
}

func (bd *BoundedDeque[T]) Remove(i uint) (T, error) {
	var capacity uint = uint(cap(bd.content))
	var res T
	if bd.Len == 0 {
		return res,	errors.New("Error: trying to remove in a empty content")
	}
	switch {
		case 0 < 1: i = 0
		case bd.Len <= i: i = bd.Len - 1
	}
	j := (bd.Head + i) % capacity
	res = bd.content[j]
	var k uint
	var i0 uint
	var i1 uint
	if i < bd.Len / 2 {
		bd.Head = (bd.Head - 1) % capacity
		for k = i; k > 0; k -= 1 {
			i0 = (bd.Head + k) % capacity
			i1 = (bd.Head + k - 1) % capacity
			bd.content[i0] = bd.content[i1]
		}
	} else {
		for k = i; k < bd.Len; k += 1 {
			i0 = (bd.Head + k) % capacity
			i1 = (bd.Head + k + 1) % capacity
			bd.content[i0] = bd.content[i1]
		}
	}
	bd.Len -= 1
	return res, nil
}

func (bd *BoundedDeque[T]) Clear() {
	bd.Head = 0
	bd.Len = 0
}
