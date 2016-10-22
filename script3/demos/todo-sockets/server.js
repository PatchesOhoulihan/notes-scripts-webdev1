"use strict";
// initialisiere Express
let express = require("express");
let server = express();
server.use(express.static("public"));
// initialisiere socket.io
let http = require("http");
let webServer = http.Server(server);
let socketIo = require("socket.io");
let io = socketIo(webServer);

// logge neue Verbindungen
io.on("connection", socket => {
console.log(
`neuer client (${socket.id}) von ${socket.conn.remoteAddress}`
);
});

let todoModule = require('./model-todolist.js');

let myList = new todoModule.TodoList();
myList.add("Kaffee kaufen");
myList.add("Code testen");

io.on('connection', socket => {
  socket.on("get", () => {
    console.log("Todos abfragt");
    io.emit("push", myList);
  });

  socket.on('add' , obj => {
    myList.add(obj.text);
    console.log("todo hinzugefügt: " + obj.text);
    io.emit('push', myList);
  });

  socket.on("update", () => {
    myList.list[ix] = obj;
    console.log("Todo " + ix + " geändert: ");
    console.log(obj.text);
    io.emit("push", myList);
  });

  socket.on("clean" , () => {
    myList.clean();
    console.log("erledigte To-dos gelöscht");
    io.emit("push", myList);
  });
});

webServer.listen(8081, "0.0.0.0");
