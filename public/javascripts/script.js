const socket = io();

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.getElementById('input').value;
  socket.emit('chat message', message); // 서버로 메시지 전송
  document.getElementById('input').value = '';
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg;
  document.getElementById('messages').appendChild(item);
});
