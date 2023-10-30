const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;

app.use(express.static('public'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/sendMessage', (req, res) => {
  const response = req.body.message;
  console.log('받은 메시지:', response);

  if (response === '인사말1') {
    res.send("안녕하세요");
  } else if (response === '인사말2') {
    res.send("안녕히 가세요.");
  } else if (response === '실수') {
    res.send("미안합니다.");
  } else if (response === '감사') {
    res.send("고맙습니다.");
  } else {
    res.send("확인되지 않은 메시지입니다.");
  }
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});