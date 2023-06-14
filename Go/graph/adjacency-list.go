/**
* Author: Axel Ariel Saravia
 */

package graph

type ALGraph struct {
    Graph [][]uint
    Vertices uint
    Edges uint
}

func NewALGraph(n uint) ALGraph {
    a := make([][]uint, n);
    return ALGraph{
        Graph: a,
        Vertices: n,
        Edges: 0,
    }
}

func (alg *ALGraph) AddEdge(i, j uint) bool {
    n := alg.Vertices
    if n <= i || n <= j {
        return false
    }
    a := alg.Graph[i]
    for k := 0; k < len(a); k += 1 {
        if j == a[k] {
            return true
        }
    }
    alg.Graph[i] = append(alg.Graph[i], j)
    alg.Edges += 1
    return true
}

func (alg *ALGraph) RemoveEdge(i, j uint) bool {
    n := alg.Vertices
    if alg.Edges == 0 || n <= i || n <= j {
        return false
    }
    a := alg.Graph[i]
    for k := 0; k < len(a); k += 1 {
        if a[k] == j {
            alg.Graph[i] = append(a[:k], a[k+1:]...)
            alg.Edges -= 1;
            return true
        }
    }
    return false
}

func (alg *ALGraph) HasEdge(i, j uint) bool {
    n := alg.Vertices
    if n <= i || n <= j {
        return false
    }
    a := alg.Graph[i]
    for k := 0; k < len(a); k += 1 {
        if a[k] == j {
            return true
        }
    }
    return false
}

func (alg *ALGraph) InEdges(i uint) []uint {
    if alg.Vertices <= i {
        return nil
    }
    return alg.Graph[i]
}

func (alg *ALGraph) OutEdge(i uint) []uint {
    n := alg.Vertices
    if n <= i {
        return nil
    }
    res := make([]uint, 0)
    for j := uint(0); j < n; j += 1 {
        if alg.HasEdge(j, i) {
            res = append(res, j)
        }
    }
    return res
}
