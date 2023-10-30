const express = require('express');
const http = require('http');
const path = require('path');
const readline = require("readline");
const app = express();
const server = http.createServer(app);
const port = process.env.port || 8080;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

app.use(express.static('public'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/sendMessage', (req, res) => {
  const message = req.body.message;
  console.log('받은 메시지:', message);
  res.send("hi");
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});