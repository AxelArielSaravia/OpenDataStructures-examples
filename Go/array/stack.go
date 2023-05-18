/**
 * Author: Axel Ariel Saravia
 */

package ArrayStack

type ArrayStack[T any] struct {
	content  []T
	length   uint
	capacity uint
}

func (stack *ArrayStack[T]) resize() *ArrayStack[T] {
	var new_capacity uint
	if 1 < 2*stack.length {
		new_capacity = 2 * stack.length
	} else {
		new_capacity = 1
	}
	B := make([]T, new_capacity)
	copy(B, stack.content)
	stack.content = B
	stack.capacity = new_capacity
	return stack
}

func (stack *ArrayStack[T]) size() uint {
	return stack.length
}

func (stack *ArrayStack[T]) get(i uint) T {
	return stack.content[i]
}

func (stack *ArrayStack[T]) set(i uint, x T) T {
	var res T = stack.content[i]
	stack.content[i] = x
	return res
}

func (stack *ArrayStack[T]) add(i uint, x T) *ArrayStack[T] {
	if stack.length < i {
		i = stack.length
	}
	if stack.length == stack.capacity {
		stack.resize()
	}
	for j := stack.length; i < j; j -= 1 {
		stack.content[j] = stack.content[j-1]
	}
	stack.content[i] = x
	stack.length += 1
	return stack
}

func (stack *ArrayStack[T]) remove(i uint) T {
	var last uint = stack.length - 1
	if stack.length <= i {
		i = last
	}
	var val T = stack.content[i]
	for j := i; j < last; j += 1 {
		stack.content[j] = stack.content[j+1]
	}
	stack.length -= 1
	if 3*stack.length <= stack.capacity {
		stack.resize()
	}
	return val
}

func (stack *ArrayStack[T]) clear() *ArrayStack[T] {
	stack.content = make([]T, 2)
	stack.capacity = 1
	stack.length = 0
	return stack
}

func arrayStack_int_create() ArrayStack[int] {
	return ArrayStack[int]{
		content:  make([]int, 2),
		length:   0,
		capacity: 2,
	}
}
