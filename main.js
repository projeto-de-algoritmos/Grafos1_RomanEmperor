const data = require('./data');
const Graph = require('./graph.js');


const graph = new Graph();
Object.keys(data).forEach(function eachKey(key) {
    if (key === "Name") {
        graph.addNode(data[key])
    } else {
        graph.addNode(data[key])
        graph.generateGraph(data[key], key)
    }
});
let twoElementSearch = (nodeValues, searchType) => {
    graph.searchGraphSelect(nodeValues[0], searchType);
    firstValueResult = graph.searchResult;
    graph.searchGraphSelect(nodeValues[1], searchType);
    secondValueResult = graph.searchResult;
    return firstValueResult[0].filter(element => secondValueResult[0].includes(element));
};
let getNameData = (data) => {
    data.forEach(element1 => {
        graph.jsonData.forEach(element2 => {
            if (element1 === element2.Name) {
                console.log(element1)
            }
        });
    });
};
graph.searchGraphSelect('Caligula', "dfs");
getNameData(graph.searchResult)
console.log(" ----------------------- ")
graph.searchGraphSelect(['', 'Constantinian', 'Execution'], "bfs");
getNameData(graph.searchResult)
console.log(" ----------------------- ")
getNameData(twoElementSearch(['Constantinian', ''], "bfs"))