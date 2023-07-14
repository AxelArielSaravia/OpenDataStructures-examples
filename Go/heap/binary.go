/**
* Author: Axel Ariel Saravia
*/

package heap

import "errors"

type BinaryHeap[T inequable] struct {
    content []T
    Len int
}

func CreateBinaryHeap[T inequable](size int) BinaryHeap[T] {
    return BinaryHeap[T]{
        content: make([]T, size),
        Len: 0,
    }
}

func bubbleUp[T inequable](bh *BinaryHeap[T], i int) {
    p := (i - 1) / 2 // parent index
    a := bh.content
    for 0 < i && a[i] < a[p] {

    }
}

func (bh *BinaryHeap[T]) Add(x T) bool {
    if (len(bh.content) == bh.Len) {
        return false;
    }
    bh.content[bh.Len] = x
    bh.Len += 1
    bubbleUp(bh, bh.Len - 1)
    return true
}

func trickleDown[T inequable](bh *BinaryHeap[T], i int) {
    a := bh.content;
    for 0 <= i {
        j := -1
        r := 2 * (i + 1)
        l := (2 * i) + 1
        if r < bh.Len && a[r] < a[i] {
            if a[l] < a[r] {
                j = l
            } else {
                j = r
            }
        } else {
            if l < bh.Len && a[l] < a[i] {
                j = l
            }
        }
        if 0 <= j {
            a[j], a[i] = a[i], a[j]
        }
        i = j
    }
}

func (bh *BinaryHeap[T]) Remove() (T, error) {
    var res T
    if (bh.Len > 0) {
        res := bh.content[0]
        bh.content[0] = bh.content[bh.Len - 1]
        bh.Len -= 1
        trickleDown(bh, 0)
        return res, nil
    }
    return res, errors.New("There is no content to remove")
}
