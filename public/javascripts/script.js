const socket = io();
const textForm = document.getElementById('textForm');
const resultDiv = document.getElementById('result');

textForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = textForm.querySelector('input[name="text"]').value;
  socket.emit('chat message', message); // 서버로 메시지 전송
  textForm.querySelector('input[name="text"]').value = '';
});

socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg;
  resultDiv.appendChild(messageElement); // 메시지를 결과 영역에 추가
});
