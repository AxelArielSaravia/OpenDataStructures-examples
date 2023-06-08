/**
 * Author: Axel Ariel Saravia
 */

package skiplist

import "math/rand"

type inequable interface {
	~int	| ~uint 	| ~int8 	| ~uint8 	|
	~int16	| ~uint16	| ~int32	| ~uint32	|
	~int64	| ~uint64	| ~float32	| ~float64	|
	~uintptr| ~string
}

const MAX_HEIGHT = 31
func pickHeight() uint {
	var z uint = uint(rand.Int31())
	var k uint = 0
	var m uint = 0b1
	for (z & m) != 0b0 {
		k += 1
		m <<= 1
	}
	return k
}