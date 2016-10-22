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
// sende Text zum Client
let stdin = process.openStdin();
stdin.addListener("data", d => {
io.emit("nachricht", d.toString());
});
// starte WebSocket-Server
webServer.listen(8081, "localhost");
