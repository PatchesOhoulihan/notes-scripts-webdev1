'use strict';

let express = require('express');
let bodyparser = require('body-parser');

let server = express();
server.use(express.static('public'));
server.use(bodyparser.json());

let todoModule = require('./model-todolist.js');

let myList = new todoModule.TodoList();
myList.add("Kaffee kaufen");
myList.add("Code testen");

//hole alle TodoListe
server.get('/todos', (req, res) =>{
  console.log('Todos abgefragt');
  res.send(myList);
});

//füge todos hinzu
server.post('/todos', (req, res) => {
  let text = req.body.text;
  myList.add(text);
  console.log('To-do hinzufügen: ' + text);
  res.send();
});

//update (ändere) To-do ix
server.put('/todos/:ix', (req, res) => {
  let ix = req.params.ix;
  let todo = req.body;

  myList.getList()[ix] = todo;
  console.log('To-Do ' + ix + " geändert: ");
  console.log(todo);

  res.send();
});

server.delete('/todos', (req, res) => {
  myList.clean();
  console.log('erledigte To-dos gelöscht');

  res.send();
});

server.listen(8081, 'localhost');
