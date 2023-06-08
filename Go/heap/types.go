/**
 * Author: Axel Ariel Saravia
 */

package heap

type inequable interface {
	~int	| ~uint 	| ~int8 	| ~uint8 	|
	~int16	| ~uint16	| ~int32	| ~uint32	|
	~int64	| ~uint64	| ~float32	| ~float64	|
	~uintptr| ~string
}