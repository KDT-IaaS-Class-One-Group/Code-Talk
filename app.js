
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다.');

  socket.on('chat message', (msg) => {
    io.emit('chat message', { message: msg, timestamp: new Date().toLocaleString() });
  });

  socket.on('disconnect', () => {
    console.log('사용자가 연결을 해제했습니다.');
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});