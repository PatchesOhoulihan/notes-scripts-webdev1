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


let todoModule = require("./todomodule.js");

let myList = new todoModule.TodoList();
myList.add("Kaffee kaufen");
myList.add("Code testen");

io.on("connection", socket => {

  // hole alle To-dos
  socket.on("get", () => {
    console.log("To-dos abgefragt");
    io.emit("push", myList);
  });

  // füge To-do hinzu
  socket.on("add", obj => {
    myList.add(obj.text);
    console.log("To-do hinzugefügt: " + obj.text);
    io.emit("push", myList);
  });

  // update (ändere) To-do ix 
  socket.on("update", (ix, obj) => {
    myList.list[ix] = obj;
    console.log("To-do " + ix + " geändert: ");
    console.log(obj.text);
    io.emit("push", myList);
  });

  // lösche (erledigte) To-dos
  socket.on("clean", () => {
    myList.clean();
    console.log("erledigte To-dos gelöscht");
    io.emit("push", myList);
  });

});

// starte WebSocket-Server
webServer.listen(8081, "0.0.0.0");
