// attach Socket.io to our HTTP server
//var io =
//io = socketio.listen(server);
const http = require('http');
const express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);

var io = require('socket.io').listen(server);
// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

// now, it's easy to send a message to just the clients in a given room
room = "abc123";
io.sockets.in(room).emit('message', 'what is going on, party people?');

// this message will NOT go to the client defined above
io.sockets.in('foobar').emit('message', 'anyone in this room yet?');
