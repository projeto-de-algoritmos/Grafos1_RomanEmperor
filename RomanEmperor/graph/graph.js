var fs = require('fs');
module.exports = class Graph {
    constructor() {
        this.vertices = [];
        this.adjacent = {};
        this.edges = 0;
        this.searchResult = [];
        this.jsonData = JSON.parse(fs.readFileSync("./data/csvjson.json"));
    }

    addVertex(v) {
        this.vertices.push(v);
        this.adjacent[v] = [];
    }

    addEdge(v, w) {
        this.adjacent[v].push(w);
        this.adjacent[w].push(v);
        this.edges++;
    }

    addNode(data) {
        data.forEach((element) => {
            this.addVertex(element);
        });
    }

    generateGraph(data, type) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < this.jsonData.length; j++) {
                if (this.jsonData[j][type] === data[i]) {
                    this.addEdge(this.jsonData[j].Name, data[i])
                }
            }
        }

    }

    bfsValuesSearch(goal, root = this.vertices[0]) {
        this.searchResult = []
        let adj = this.adjacent;
        const queue = [];
        queue.push(root);
        const discovered = [];
        discovered[root] = true;

        while (queue.length) {
            let v = queue.shift();
            if (this.arrayEquals(this.adjacent[v], goal)) {
                this.searchResult.push(v);
            } if (v === goal) {
                this.searchResult = this.adjacent[v];
                return true;
            }

            for (let i = 0; i < adj[v].length; i++) {
                if (!discovered[adj[v][i]]) {
                    discovered[adj[v][i]] = true;
                    queue.push(adj[v][i]);
                }
            }
        }
    }
    dfsNameSearch(goal, root = this.vertices[0], visited = new Set()) {
        visited.add(root);
        const values = this.adjacent[root];

        for (const value of values) {
            if (value === goal && this.searchResult.indexOf(value) === -1) {
                this.searchResult = [goal]
            } if (!visited.has(value)) {
                this.dfsNameSearch(goal, value, visited);
            }
        }

    }

    searchGraphSelect(goal, searchMethod) {
        switch (searchMethod) {
            case 'bfs':
                this.bfsValuesSearch(goal);
                break;
            case 'dfs':
                this.dfsNameSearch(goal);
                break;
        }
    }

    arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }
}