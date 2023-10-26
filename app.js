const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const port = 8080; // 사용할 포트 번호
const server = http.createServer(app);
const io = socketIo(server);

// 정적 파일 제공 (HTML, CSS, JavaScript 등을 저장하는 디렉토리 지정)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true } )); // URL-encoded 데이터 파싱 미들웨어 추가

// GET 요청 처리
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// POST 요청 처리
app.post('/send', (req, res) => {
  const message = req.body.text;
  console.log('Received message:', message);

  // 클라이언트에게 메시지를 보냄
  io.emit('chat message', message);

  // 응답을 보낸 후, 추가 응답을 보내지 않음
  res.status(200).send('Message sent');
});

// 서버 시작
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // 클라이언트로부터 메시지 수신
  socket.on('chat message', (msg) => {
    console.log('Received message:', msg);

    // 클라이언트에게 메시지 브로드캐스트
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
