
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
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

  // 채팅 메시지 이벤트를 수신하기 위한 리스너
  socket.on('chat message', (msg) => {
    // 받은 메시지를 모든 연결된 클라이언트에 브로드캐스트합니다.
    io.emit('chat message', { message: msg, timestamp: new Date().toLocaleString() });
  });

  socket.on('disconnect', () => {
    console.log('사용자가 연결을 해제했습니다.');
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});