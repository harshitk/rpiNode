const http= require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();


const server = http.createServer((req, res) =>{ 

    if (req.url == '/') {
        res.write('Hello Express');
        res.end();
    }

    if (req.url == '/api/test') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});
server.listen(3000);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('CH01', function (from, msg) {
        console.log('MSG', from, ' saying ', msg);
      });
    
});

console.log('Listening on Port 3000');
