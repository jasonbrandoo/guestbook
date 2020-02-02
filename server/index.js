const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const port = 3001;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

let countUser = 0;

io.on('connection', (socket) => {
  let newUser = false;

  socket.on('sign in', (username) => {
    if (newUser) return;

    socket.username = username;
    countUser += 1;
    newUser = true;
    socket.emit('signed in', { total: countUser });
    socket.broadcast.emit('user joined', {
      username: socket.username,
      total: countUser,
    });
  });

  socket.on('send message', (message) => {
    io.emit('recieve message', { name: socket.username, message });
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing user', {
      typing: `${socket.username} is typing message...`,
    });
  });

  socket.on('stop typing', (stop) => {
    socket.broadcast.emit('user stop typing', stop);
  });

  socket.on('disconnect', () => {
    if (newUser) {
      countUser -= 1;

      socket.broadcast.emit('user left', {
        name: socket.username,
        total: countUser,
      });
    }
  });
});

server.listen(process.env.port || port, () => {
  console.log(`Server run on ${port}`);
});
