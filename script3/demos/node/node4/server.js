'use strict'

let express = require('express');
let server = express();

server.use(express.static('public'));

server.listen(8081, 'localhost');

server.get('/getTime', (req, res) => {
	res.send('Zeit am Server: ' + String(new Date()));
});
