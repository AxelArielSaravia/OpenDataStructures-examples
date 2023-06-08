/**
 * Author: Axel Ariel Saravia
 */

package linkedList

type DLNode[T any] struct {
	Prev *DLNode[T]
	Next *DLNode[T]
	Value T
}

type DLList[T any] struct {
	Dummy *DLNode[T]
	Len uint
}

func CreateDLList[T any]() DLList[T] {
	dll := DLList[T]{
		Dummy: new(DLNode[T]),
		Len: 0,
	}
	dll.Dummy.Prev = dll.Dummy
	dll.Dummy.Next = dll.Dummy
	return dll;
} 

func (dll *DLList[T]) GetNode(i uint) *DLNode[T] {
	var dln *DLNode[T]
	if dll.Len <= i {
		i = (i - 1) % dll.Len
	}
	if i < dll.Len / 2 {
		dln = dll.Dummy.Next
		for i > 0 {
			dln = dln.Next
			 i -= 1
		}
	} else {
		j := dll.Len - i
		dln = dll.Dummy
		for j > 0 {
			dln = dln.Prev
			j -= 1
		}
	}
	return dln
}

func (dll *DLList[T]) Get(i uint) T {
	return dll.GetNode(i).Value
}

func (dll *DLList[T]) Set(i uint, v T) T {
	var res T
	dln := dll.GetNode(i)
	res, dln.Value = dln.Value, v
	return res
}

func (dll *DLList[T]) Remove(i uint) T {
	dln := dll.GetNode(i)
	res := dln.Value
	dln.Prev.Next = dln.Next
	dln.Next.Prev = dln.Prev
	dll.Len -= 1
	return res
}

func (dll *DLList[T]) Clear() {
	dll.Len = 0
	dll.Dummy.Next = dll.Dummy
	dll.Dummy.Prev = dll.Dummy
}