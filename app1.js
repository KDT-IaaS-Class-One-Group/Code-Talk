const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// 배열에 메시지를 저장
const messages = [];

// POST 요청을 처리
app.post('/update', (req, res) => {
  const newText = req.body.text; // POST 요청에서 전송된 텍스트 데이터
  console.log(`${newText}를 입력했습니다.`); // 서버 콘솔에 내용 출력

  // 메시지 배열에 추가
  messages.unshift(newText);

  res.status(200).send('Message updated successfully');
});

app.get('/messages', (req, res) => {
  // 메시지 배열을 JSON 형식으로 클라이언트에 전송
  res.json(messages);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
