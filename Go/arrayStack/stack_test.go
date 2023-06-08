/**
 * Author: Axel Ariel Saravia
 */
package arrayStack

import "testing"

func assert(t *testing.T,exp bool, message string) {
	if !exp {
		t.Error(message)
	}
}


func TestArrayStack(t *testing.T) {
	var stackInt Stack[int] = CreateStack[int]()

	//Add an element 
	stackInt.Add(0, 5);
	if stackInt.content[0] != 5 {
		t.Error("stackInt.content[0] != 5")
	}
	if stackInt.Len != 1 {
		t.Error("stackInt.Len != 1")
	}

	//Add two more elements
	stackInt.Add(1, 10)
	stackInt.Add(2, 15)
	if stackInt.content[1] != 10 {
		t.Error("stackInt.content[1] != 10")
	}
	if stackInt.content[2] != 15 {
		t.Error("stackInt.content[2] == 15")
	}
	if stackInt.Len != 3 {
		t.Error("stackInt.Len != 3")
	}

	//Remove an element
	stackInt.Remove(1)
	if stackInt.content[1] != 15 {
		t.Error("stackInt.content[1] == 15")
	}
	if stackInt.Len != 2 {
		t.Error("stackInt.Len == 2")
	}

	stackInt.Add(1, 10)
	stackInt.Add(3, 20)
	if stackInt.content[1] != 10 {
		t.Error("stackInt.content[1] != 10")
	}
	if stackInt.content[2] != 15 {
		t.Error("stackInt.content[2] != 15")
	}
	if stackInt.content[3] != 20 {
		t.Error("stackInt.content[3] != 20")
	}
	if stackInt.Len != 4 {
		t.Error("stackInt.Len != 4")
	}
	
	if stackInt.Get(2) != stackInt.content[2] {
		t.Error("stackInt.get(2) != stackInt.content[2]")
	}

	if stackInt.Set(0, 43) != 5 {
		t.Error("stackInt.set(0, 43) != 5")
	}
	if stackInt.content[0] != 43 {
		t.Error("stackInt.content[0] != 43")
	}
}