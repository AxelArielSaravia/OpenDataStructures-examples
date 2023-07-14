/**
* Author: Axel Ariel Saravia
*/
package arrayQueue

import "testing"

func TestQueue(t *testing.T) {
    var q Queue[int] = CreateQueue[int]()

    q.Add(5)
    if q.content[0] != 5 {
        t.Errorf("q.content[0] != 5, got %d", q.content[0])
    }
    if cap(q.content) != 1 {
        t.Errorf("cap(q.content) != 1, got %d", cap(q.content))
    }
    if q.Len != 1 {
        t.Errorf("q.Len != 1, go %d", q.Len)
    }
    if q.Head != 0 {
        t.Errorf("q.Head != 0, go %d", q.Head)
    }

    q.Add(10)
    q.Add(15)
    q.Add(20)

    if q.content[0] != 5 {
        t.Errorf("q.content[0] != 5, got %d", q.content[0])
    }
    if q.content[1] != 10 {
        t.Errorf("q.content[1] != 10, got %d", q.content[1])
    }
    if q.content[2] != 15 {
        t.Errorf("q.content[2] != 15, got %d", q.content[2])
    }
    if q.content[3] != 20 {
        t.Errorf("q.content[3] != 20, got %d", q.content[3])
    }
    if cap(q.content) != 4 {
        t.Errorf("cap(q.content) != 4, got %d", cap(q.content))
    }
    if q.Len != 4 {
        t.Errorf("q.Len != 4, got %d", q.Len)
    }
    if q.Head != 0 {
        t.Errorf("q.Head != 0, go %d", q.Head)
    }

    q.Remove()

    if q.content[0] != 5 {
        t.Errorf("q.content[0] != 5, got %d", q.content[0])
    }
    if q.content[1] != 10 {
        t.Errorf("q.content[1] != 10, got %d", q.content[1])
    }
    if q.content[2] != 15 {
        t.Errorf("q.content[2] != 15, got %d", q.content[2])
    }
    if q.content[3] != 20 {
        t.Errorf("q.content[3] != 20, got %d", q.content[3])
    }
    if q.Len != 3 {
        t.Errorf("q.Len != 3, got %d", q.Len)
    }
    if q.Head != 1 {
        t.Errorf("q.Head != 1, go %d", q.Head)
    }

    q.Add(25)

    if q.content[1] != 10 {
        t.Errorf("q.content[1] != 10, got %d", q.content[1])
    }
    if q.content[2] != 15 {
        t.Errorf("q.content[2] != 15, got %d", q.content[2])
    }
    if q.content[3] != 20 {
        t.Errorf("q.content[3] != 20, got %d", q.content[3])
    }
    if q.content[0] != 25 {
        t.Errorf("q.content[0] != 25, got %d", q.content[0])
    }
    if q.Len != 4 {
        t.Errorf("q.Len != 4, got %d", q.Len)
    }
    if q.Head != 1 {
        t.Errorf("q.Head != 1, go %d", q.Head)
    }
}
