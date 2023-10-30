const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const port = process.env.port || 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sendMessage', (req, res) => {
  const message = req.query.message;
  res.send(message);
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});