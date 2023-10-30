const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('A user connected');

  // 클라이언트로부터 메시지를 받음
  socket.on('chat message', (msg) => {
    // 메시지를 다른 클라이언트에게 브로드캐스트
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.post('/update', (req, res) => {
  const newText = req.body.text; // POST 요청에서 전송된 텍스트 데이터

  // 메시지를 클라이언트로 브로드캐스트
  io.emit('chat message', newText);

  res.status(200).send('Message sent');
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
