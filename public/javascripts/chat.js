document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const outputChat = document.getElementById("output-Chat");
  const txtContent = document.getElementById("txt-Content");
  const btnSend = document.getElementById("btn-Send");

  function createMessageElement(msg) {
    const messageElement = document.createElement("li");
    const userIdSpan = document.createElement("span");
    const messageSpan = document.createElement("span");
    const timestampSpan = document.createElement("span");
  
    userIdSpan.textContent = msg.userId;
    userIdSpan.classList.add("user-id");
    messageSpan.textContent = msg.message.substring(msg.userId.length + 2); // 사용자 ID 길이와 ": "를 제거합니다.
    timestampSpan.textContent = msg.timestamp;
  
    messageSpan.classList.add("message-text");
    timestampSpan.classList.add("timestamp");
  
    messageElement.appendChild(userIdSpan);
    messageElement.appendChild(messageSpan);
    messageElement.appendChild(timestampSpan);
  
    return messageElement;
  }
  

  socket.on('chat message', (msg) => {
    const messageElement = createMessageElement(msg);
    outputChat.insertBefore(messageElement, outputChat.firstChild);
  });

  function sendMessageToServer(message) {
    socket.emit('chat message', message);
  }

  function sendMessage() {
    const messageText = txtContent.value;

    if (messageText.trim() !== "") {
      txtContent.value = "";
      const message = messageText;
      const timestamp = new Date().toLocaleString();

      const messageObject = {
        message: message,
        userId: socket.nickname,
        timestamp: timestamp
      };

      sendMessageToServer(messageObject);
    }
  }

  btnSend.addEventListener("click", sendMessage);
  txtContent.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
