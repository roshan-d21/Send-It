// For all server side JS

// Trial comment for commit

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('dotenv').config();


let users = {};

app.use("/static", express.static('./static/'));

app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/static/login/signup.html');
});

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/static/login/login.html');
});


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', socket => {

    // When a new user joins the room
    socket.on('new-user', name => {
        // socket.id is unique to that room
        users[socket.id] = name;

        // Emitting user's name to everyone else when a new user joins the room
        socket.broadcast.emit('user-connected', name);
    })

    // When a user sends a message by clicking on the submit button
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message, name: users[socket.id] });
    })

    // When a user disconnects from the room
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        console.log(users);
        delete users[socket.id];
        console.log(users);
    })
});

const PORT = process.env.PORT || 5500;

//! WARNING: app.listen(PORT) will NOT work here!
server.listen(PORT);
