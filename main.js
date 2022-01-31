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
    return firstValueResult.filter(element => secondValueResult.includes(element));
};
let getNameData = (data) => {
    let response = []
    data.forEach(element1 => {
        graph.jsonData.forEach(element2 => {
            if (element1 === element2.Name) {
                response.push(element2)
            }
        });
    });
    return response
};
graph.searchGraphSelect('Caligula', "dfs");
console.log(getNameData(graph.searchResult))
console.log(" ----------------------- ")
graph.searchGraphSelect(['', 'Constantinian', 'Execution'], "bfs");
console.log(getNameData(graph.searchResult))
console.log(" ----------------------- ")
console.log(getNameData(twoElementSearch(['Constantinian', ''], "bfs")))

// teste
app.post("", function (req, res) {
    let dinastia = req.body.dinastia
    let nome = req.body.nome
    let cidade = req.body.cidade
    let causa = req.body.causa
    if (nome != null && nome != 'Nome') {
        graph.searchGraphSelect(nome, "dfs");
        res.send(getNameData(graph.searchResult));
    }
    else if ((cidade == null || cidade == 'Cidade natal') && (causa == null || causa == 'Causa da morte')) {
        graph.searchGraphSelect(dinastia, "bfs");
        res.send(getNameData(graph.searchResult));
    } else if ((causa == null || causa == 'Causa da morte') && (dinastia == null || dinastia == 'Dinastia')) {
        graph.searchGraphSelect(cidade, "bfs");
        res.send(getNameData(graph.searchResult));
    } else if ((cidade == null || cidade == 'Cidade natal') && (dinastia == null || dinastia == 'Dinastia')) {
        graph.searchGraphSelect(causa, "bfs");
        res.send(getNameData(graph.searchResult));
    }

    else if (cidade == null || cidade == 'Cidade natal') {
        res.send(getNameData(twoElementSearch([dinastia, causa], "bfs")))
    } else if (causa == null || causa == 'Causa da morte') {
        res.send(getNameData(twoElementSearch([dinastia, cidade], "bfs")))
    } else if (dinastia == null || dinastia == 'Dinastia') {
        res.send(getNameData(twoElementSearch([causa, cidade], "bfs")))
    }
    else {
        graph.searchGraphSelect([cidade, dinastia, causa], "bfs");
        res.send(getNameData(graph.searchResult));
    }
})
//
app.listen(3000, () => console.log("servidor rodando"));