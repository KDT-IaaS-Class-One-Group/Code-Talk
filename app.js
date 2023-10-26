const express = require('express');
const app = express();
const port = 8080; // 사용할 포트 번호

// 정적 파일 제공 (HTML, CSS, JavaScript 등을 저장하는 디렉토리 지정)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱 미들웨어 추가

// GET 요청 처리
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// POST 요청 처리
app.post('/send', (req, res) => {
    const text = req.body.text; // POST 요청에서 전달된 텍스트 데이터를 가져옵니다.
    
    console.log(text);

    res.json(text);
});

// 서버 시작
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});