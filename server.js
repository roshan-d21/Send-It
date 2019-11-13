// For all server side JS

// Trial comment for commit

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const fs = require('fs');

require('dotenv').config();

let users = {};

app.use("/static", express.static('./static/'));

app.use(express.json());

app.use(express.urlencoded({extended : true}));

app.get('/signup', function(req, res) {
    // res.sendFile(__dirname + '/static/login/signup.html');
    res.render('signup.ejs');
});

app.get('/login', function(req, res) {
    // res.sendFile(__dirname + '/static/login/login.html');
    res.render('login.ejs');
});

app.post('/signup', function(req, res) {
    console.log(req.body.Username + ' ' + req.body.pass[1]);

    let userdb = JSON.parse(fs.readFileSync('users.json'));

    if (userdb[req.body.Username]) { //if username already exits, redirect to signup page
        res.redirect('../signup');
    } else {
        bcrypt.hash(req.body.pass[1], saltRounds, function (err, hash) {
            userdb[req.body.Username] = hash;

            fs.writeFileSync('users.json', JSON.stringify(userdb));

            res.redirect('../login');
        });
    }
});

app.post('/login', function(req, res) {
    let userdb = JSON.parse(fs.readFileSync('users.json'));

    if (userdb[req.body.Username] === undefined) { //if username doesn't exit, redirect to signup page
        res.redirect('../signup');
    } else {
        bcrypt.compare(req.body.pass, userdb[req.body.Username], function (err, same) {
            if (same === true) {
                // res.redirect('../');
                res.render('index.ejs', {username : req.body.Username});
            } else {
                res.redirect('../login');
            }
        });
    }
});

app.get('/', function(req, res) {
    // res.sendFile(__dirname + '/index.html');
    res.render("index.ejs");
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
