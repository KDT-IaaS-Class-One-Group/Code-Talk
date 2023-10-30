const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


// POST 요청을 처리
app.post('/update', (req, res) => {
  const newText = req.body.text; // POST 요청에서 전송된 텍스트 데이터

  // 기존 index1.html 파일을 읽어온다
  fs.readFile(__dirname + '/public/index1.html', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    // 새로운 내용을 기존 내용에 추가
    const updatedHtml = data.replace('</ul>', `  <li>${newText}</li>\n</ul>`);

    // 새로운 index1.html 파일을 생성
    fs.writeFile(__dirname + '/public/index1.html', updatedHtml, 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Error writing file');
      }

      res.status(200).send('File updated successfully');
    });
  });
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
