// 파일 이름: app.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('사용자가 연결되었습니다.');

  // 사용자 닉네임 설정
  const userId = `사용자${io.engine.clientsCount}`;
  socket.nickname = userId;

  socket.on('chat message', (msg) => {
    io.emit('chat message', { message: `${socket.nickname}: ${msg}`, timestamp: new Date().toLocaleString() });
  });

  socket.on('disconnect', () => {
    console.log('사용자가 연결을 해제했습니다.');
  });
});

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`);
});
