const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const io = new Server(server);

let remoteMouses = {};

io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다.');

  socket.on('chat message', (msg) => {
    io.emit('chat message', { message: msg, timestamp: new Date().toLocaleString() });
  });

  socket.on('mousePosition', (data) => {
    remoteMouses[socket.id] = data;
    io.emit('remoteMousesPosition', remoteMouses);
  });

  socket.on('disconnect', () => {
    delete remoteMouses[socket.id];
    io.emit('userDisconnected', socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://192.168.30.158:${port}`);
});
