/**
* Author: Axel Ariel Saravia
*/

package graph

type AMGraph struct {
    Graph [][]bool;
    Vertices uint;
    Edges uint;
};

func NewAMGraph(n uint) AMGraph {
    m := make([][]bool, n);
    for i := uint(0); i < n; i += 1 {
        m[i] = make([]bool, n)
    }
    return AMGraph{
        Graph: m,
        Vertices: n,
        Edges: 0,
    }
}

func (amg *AMGraph) AddEdge(i, j uint) bool {
    if amg.Vertices <= i || amg.Vertices <= j {
        return false
    }
    amg.Graph[i][j] = true
    amg.Edges += 1
    return true
}

func (amg *AMGraph) RemoveEdge(i, j uint) bool {
    if amg.Edges == 0 || amg.Vertices <= i || amg.Vertices <= j {
        return false
    }
    amg.Graph[i][j] = false
    amg.Edges -= 1
    return true
}

func (amg *AMGraph) HasEdge(i, j uint) bool {
    if amg.Vertices <= i || amg.Vertices <= j {
        return false
    }
    return amg.Graph[i][j]
}

func (amg *AMGraph) InEdges(i uint) []uint {
    res := make([]uint, 0)
    if amg.Vertices <= i {
        return res
    }
    for j := uint(0); j < amg.Vertices; j += 1 {
        if amg.Graph[i][j] {
            res = append(res, j)
        }
    }
    return res
}

func (amg *AMGraph) OutEdges(i uint) []uint {
    res := make([]uint, 0)
    if amg.Vertices <= i {
        return res
    }
    for j := uint(0); j < amg.Vertices; j += 1 {
        if amg.Graph[j][i] {
            res = append(res, j)
        }
    }
    return res
}
