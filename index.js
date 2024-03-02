const express = require('express');
require('@prisma/client');
const app = express();
require('dotenv').config();
const route = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 3000;

let corsOptions = {
  allowedHeaders: ['*'],
  maxAge: 10
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

let users = [];
let chatRooms = {};

io.on('connection', (socket) => {
  console.log(`User connected:${socket.id}`);

  socket.on('joinRoom', (data) => {
    const { roomId } = data;
    chatRooms[roomId] = chatRooms[roomId] || [];
    socket.join(roomId);
    socket.to(roomId).emit('newUserResponse', usersInRoom(roomId));
    chatRooms[roomId].push(socket.id);
    console.log(`User ${socket.id} joined room ${roomId}`);
  })

  socket.on('message', (data) => {
    const { roomId, message, username } = data;
    let __createdtime__ = new Date()

    socket.to(roomId).emit('receiveMesage', {
      message,
      username,
      __createdtime__,
    });
  });

  socket.on('message', (data) => {
    console.log("Communication", data);
    io.emit('messageResponse', data);
  })

  socket.on('newUser', (data) => {
    users.push(data);

    io.emit('newUserResponse', users);
  })

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  socket.on('disconnect', () => {
    console.log('User disconnected');
    users = users.filter((user) => user.socketID !== socket.id);

    io.emit('newUserResponse', users);
    socket.disconnect();
  })
})

app.use('/', route);

function usersInRoom(roomId) {
  return users.filter((user) => chatRooms[roomId].includes(user.socketId));
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})