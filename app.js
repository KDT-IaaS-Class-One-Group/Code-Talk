const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = socketIo(server);

let messages = []; // 메시지를 저장할 배열

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/send', (req, res) => {
  const message = req.body.text;
  console.log('Received message:', message);
  // 메시지를 배열에 추가
  messages.push(message);
  // 콘솔에 추가된 메시지 출력
  console.log(`배열에 "${message}" 요소가 추가되었습니다`);

  // 메시지를 기록하고 클라이언트에게 브로드캐스트
  messages.push(message);
  io.emit('chat message', message);

  res.status(200).send('Message sent');
});

app.get('/messages', (req, res) => {
  // 클라이언트에서 메시지를 조회하는 요청을 처리
  res.json(messages);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);
    messages.push(msg); // 메시지를 기록
    console.log(messages);

    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
// 서버에서 메시지 배열에 메시지 추가
app.post('/send', (req, res) => {
  const message = req.body.text;

  // 클라이언트에게 메시지 브로드캐스트
  io.emit('chat message', message);
  
  res.status(200).send('Message sent');
});

