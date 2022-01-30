const data = require('./data/data.js');
const Graph = require('./graph/graph.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/img'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");

});
// teste
app.post("", function (req, res) {
    let dinastia = req.body.dinastia
    let nome = req.body.nome
    let cidade = req.body.cidade
    let causa = req.body.causa
    res.send("Escolhido "+ dinastia + " "+nome + " "+cidade+ " "+causa);
})
//
app.listen(3000, () => console.log("servidor rodando"));



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