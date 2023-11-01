
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const { Server } = require('socket.io');
const port = 8080;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });
});

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/sendMessage", (req, res) => {
  const message = req.body.message;
  res.json({ message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});