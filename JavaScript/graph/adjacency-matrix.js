/**
* Author: Axel Ariel Saravia
*/

/**
AMGraph :: {
    graph: Array<Array<boolean>>,
    vertices: number,
    edges: number,
}
*/

const AdjacencyMatrix = {
    /**
    create :: (number [uint]) -> AMGraph */
    create(n) {
        const a = Array(n);
        for (let i = 0; i < n; i += 1) {
            a[i] = Array(n).fill(false)
        }
        return {
            graph: a,
            verices: n,
            edges: 0
        };
    },
    /**
    addEdge :: (AMGraph, number [uint], number [uint]) -> boolean */
    addEdge(amg, i, j) {
        const n = amg.vertices;
        if (i < 0 || j < 0 || n <= i || n <= j) {
            return false;
        }
        amg.graph[i][j] = true;
        amg.edges += 1;
        return true;
    },
    /**
    removeEdge :: (AMGraph, number [uint], number [uint]) -> boolean */
    removeEdge(amg, i, j) {
        const n = amg.vertices;
        if (amg.edges === 0 || i < 0 || j < 0 || n <= i || n <= j) {
            return false;
        }
        amg.graph[i][j] = false;
        amg.edges -= 1;
        return true;
    },
    /**
    hasEdge :: (AMGraph, number [uint], number [uint]) -> boolean */
    hasEdge(amg, i, j) {
        const n = amg.vertices
        if (i < 0 || j < 0 || n <= i || n <= j) {
            return false;
        }
        return amg.graph[i][j];
    },
    /**
    inEdges :: (AMGraph, number [uint]) -> maybe Array<number> */
    inEdges(amg, i) {
        const n = amg.vertices;
        if (i < 0 || n <= i) {
            return;
        }
        const res = Array(n);
        for (let j = 0; j < n; j += 1) {
            if (amg.grap[i][j]) {
                res[j] = j
            }
        }
        return res;
    },
    /**
    outEdges :: (AMGraph, number [uint]) -> maybe Array<boolean> */
    outEdges(amg, i) {
        const n = amg.vertices;
        if (i < 0 || n <= i) {
            return;
        }
        if (amg.edges === 0) {
            return [];
        }
        const res = Array(n);
        for (let j = 0; j < n; j += 1) {
            if (amg.graph[j][i]) {
                res[j] = j;
            }
        }
        return res;
    }
};
