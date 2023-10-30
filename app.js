const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.port || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sendMessage', (req, res) => {
  const message = req.query.message;
  const currentDate = new Date();
  const timestamp = currentDate.toLocaleString();

  // 여기서 받은 메시지 및 시간 정보를 클라이언트로 반환
  const response = { message, timestamp };
  res.json(response);
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});