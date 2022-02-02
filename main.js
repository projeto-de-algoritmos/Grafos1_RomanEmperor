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


app.set('view engine', 'pug')
app.post("/linhagem", function (req, res) {
    let dinastia = req.body.dinastia;
    let nome = req.body.nome;
    let cidade = req.body.cidade;
    let causa = req.body.causa;
    if (nome != null && nome != 'Nome') {
        graph.searchGraphSelect(nome, "dfs");
        var resposta = getNameData(graph.searchResult);
        var html = contarHitoria(resposta);
        res.render('../views/index', {
            title: 'Linhagens', message: html
        });
        //res.send(resposta);} 
    }
    else if ((cidade == null || cidade == 'Cidade natal') && (causa == null || causa == 'Causa da morte')) {
        graph.searchGraphSelect(dinastia, "bfs");
        var resposta2 = getNameData(graph.searchResult);
        var html = contarHitoria(resposta2);
        res.render('../views/index', {
            title: 'Linhagens',
            message: html
        });
        // res.send(resposta2);
    } else if ((causa == null || causa == 'Causa da morte') && (dinastia == null || dinastia == 'Dinastia')) {
        graph.searchGraphSelect(cidade, "bfs");
        var resposta2 = getNameData(graph.searchResult);
        var html = contarHitoria(resposta2);
        res.render('../views/index', {
            title: 'Linhagens',
            message: html
        });

    } else if ((cidade == null || cidade == 'Cidade natal') && (dinastia == null || dinastia == 'Dinastia')) {
        graph.searchGraphSelect(causa, "bfs");
        var resposta2 = (getNameData(graph.searchResult));
        var html = contarHitoria(resposta2);
        res.render('../views/index', {
            title: 'Linhagens',
            message: html
        });
    }

    else if (cidade == null || cidade == 'Cidade natal') {
        var resposta2 = (getNameData(twoElementSearch([dinastia, causa], "bfs")))
        var html = contarHitoria(resposta2);
        res.render('../views/index', {
            title: 'Linhagens',
            message: html
        });

    } else if (causa == null || causa == 'Causa da morte') {
        var resposta2 = (getNameData(twoElementSearch([dinastia, cidade], "bfs")))
        var html = contarHitoria(resposta2);
        res.render('../views/index', {
            title: 'Linhagens',
            message: html
        });
    } else if (dinastia == null || dinastia == 'Dinastia') {
        var resposta2 = (getNameData(twoElementSearch([causa, cidade], "bfs")))
        var html = contarHitoria(resposta2);
        res.render('../views/index', {
            title: 'Linhagens',
            message: html
        });
    }
    else {
        graph.searchGraphSelect([cidade, dinastia, causa], "bfs");
        var resposta2 = (getNameData(graph.searchResult));
        var html = contarHitoria(resposta2);
        res.render('../views/index', {
            title: 'Linhagens',
            message: html
        });
    }
})
//
function contarHitoria(resposta2) {
    var html = " ";
    for (var i = 0; i < resposta2.length; i++) {
        console.log(resposta2[i].Name + '\n');
        html += "Encontrado no index: " + resposta2[i].Index;
        html += " O imperador " + resposta2[i].Name;
        html += " que possui o nome completo de " + resposta2[i].FullName;
        html += " nasceu em " + resposta2[i].BirthCity + " na provincia de " + resposta2[i].BirthProvince;
        html += " e fazia parte da dinastia " + resposta2[i].Dynasty;
        html += " e teve como causa da morte " + resposta2[i].Cause + '\n';
        html += " ,viveu de " + resposta2[i].Birth + " ate " + resposta2[i].Death;
        html += " e tem como sucessao " + resposta2[i].Succession + ";  ";
    }

    return html;

}
app.listen(3001, () => console.log("servidor rodando"));