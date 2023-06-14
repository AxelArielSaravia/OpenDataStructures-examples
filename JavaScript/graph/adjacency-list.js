/**
* Author: Axel Ariel Saravia
*/

/**
ALGraph :: {
    graph: Array<Array<number>>,
    vertices: number [uint],
    edges: number [uint]
}
*/

const AdjacencyLists = {
    /**
    create :: (number [uint]) -> ALGraph */
    create(n) {
        if (n <= 0) {
            throw Error("PANIC!: trying to create a empty or negative graph")
        }
        const a = Array(n);
        for (let i = 0; i < n; i += 1) {
            a[i] = [];
        }
        return {
            graph: a,
            vertices: n,
            edges: 0
        };
    },
    /**
    addEdge :: (ALGraph, number [uint], number [uint]) -> boolean */
    addEdge(alg, i, j) {
        const n = alg.vertices;
        if (i < 0 || j < 0 || n <= i || n <= j) {
            return false;
        }
        const a = alg.graph[i];
        for (let k = 0; k < a.length; k += 1) {
            if (j === a[k]) {
                return  true;
            }
        }
        a.push(j);
        alg.edges += 1;
        return true;
    },
    /**
    removeEdge :: (ALGraph, number [uint], number [uint]) -> boolean */
    removeEdge(alg, i, j) {
        const n = alg.vertices;
        if (alg.edges === 0 || j < 0 || i < 0 || n <= i || n <= j) {
            return false;
        }
        const a = alg.graph[i];
        for (let k = 0; k < a.length; k += 1) {
            if (a[k] === j) {
                a.splice(k, 1);
                alg.edge -= 1;
                return true;
            }
        }
        return false;
    },
    /**
    hasEdge :: (ALGraph, number [uint], number [uint]) -> boolean */
    hasEdge(alg, i, j) {
        const n = alg.vertices;
        if (i < 0 || j < 0 || n <= j || n <= i) {
            return false;
        }
        const a = alg.graph[i];
        for (let k = 0; k < a.length; k += 1) {
            if (a[k] === j) {
                return true;
            }
        }
        return false;
    },
    /**
    inEdges :: (ALGraph, number [uint]) -> Array<number> */
    inEdges(alg, i) {
        const n = alg.vertices;
        if (i < 0 || n <= i) {
            return [];
        }
        return alg.graph[i];
    },
    /**
    outEdges :: (ALGraph, number [uint]) -> Array<number> */
    outEdges(alg, i) {
        const n = alg.vertices;
        const res = [];
        if (i < 0 || n <= i) {
            return res;
        }
        for (let j = 0; j < n; j += 1) {
            if (AdjacencyLists.hasEdge(alg, j, i)) {
                res.push(j);
            }
        }
        return res;
    }
};
