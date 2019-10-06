// For all server side JS

const io = require('socket.io')(3000);

let users = {};

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