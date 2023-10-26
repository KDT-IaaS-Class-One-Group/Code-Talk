const boxChatLog = document.getElementById('box-Chat-Log');
const txtInput = document.getElementById('txt-Input');
const btnSubmit = document.getElementById('btn-Submit');

const scrollToBottom = () => {
  boxChatLog.scrollTop = chatLog.scrollHeight;
}

// 예를 들어, 새 메시지를 추가할 때 아래와 같이 스크롤 함수를 호출
const addNewMessage = (message) => {
  let newMessage = document.createElement("li");
  newMessage.textContent = message;
  boxChatLog.appendChild(newMessage);
  scrollToBottom();
}

const a = document.getElementById('a');
a.addEventListener('click', () => {
  if(txtInput.value !== "") {
    addNewMessage(txtInput.value);
  }
})