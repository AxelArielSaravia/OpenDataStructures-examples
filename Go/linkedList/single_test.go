/**
 * Author: Axel Ariel Saravia
 */

package linkedList

import "testing"

func TestSLList(t *testing.T) {
	var sll SLList[int]
	sll.AddHead(10)
	if sll.Len != 1 { t.FailNow() }
	if sll.Head.V != 10 { t.FailNow() }
	if sll.Tail.V != 10 { t.FailNow() }

	sll.AddHead(20)
	if sll.Len != 2 { t.FailNow() }
	if sll.Head.V != 20 { t.FailNow() }
	if sll.Tail.V != 10 { t.FailNow() }
	if sll.Head.Next.V != 10 { t.FailNow() }

	sll.AddHead(30)
	if sll.Len != 3 { t.FailNow() }
	if sll.Head.V != 30 { t.FailNow() }
	if sll.Tail.V != 10 { t.FailNow() }
	if sll.Head.Next.V != 20 { t.FailNow() }
	if sll.Head.Next.Next.V != 10 { t.FailNow() }

	sll.AddTail(100)
	if sll.Len != 4 { t.FailNow() }
	if sll.Head.V != 30 { t.FailNow() }
	if sll.Tail.V != 100 { t.FailNow() }
	if sll.Head.Next.V != 20 { t.FailNow() }
	if sll.Head.Next.Next.V != 10 { t.FailNow() }
	if sll.Head.Next.Next.Next.V != 100 { t.FailNow() }

	if sll.RemoveHead() != 30 { t.FailNow() }
	if sll.Len != 3 { t.FailNow() }
	if sll.Head.V != 20 { t.FailNow() }
	if sll.Tail.V != 100 { t.FailNow() }
	if sll.Head.Next.V != 10 { t.FailNow() }
	if sll.Head.Next.Next.V != 100 { t.FailNow() }

	if sll.RemoveTail() != 100 { t.FailNow() }
	if sll.Len != 2 { t.FailNow() }
	if sll.Head.V != 20 { t.FailNow() }
	if sll.Tail.V != 10 { t.FailNow() }
	if sll.Head.Next.V != 10 { t.FailNow() } 
}