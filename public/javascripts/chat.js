// 파일 이름: chat.js
document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const outputChat = document.getElementById("output-Chat");
  const txtContent = document.getElementById("txt-Content");
  const btnSend = document.getElementById("btn-Send");

  function sendMessageToServer(message) {
    socket.emit('chat message', message);
  }

  function sendMessage() {
    const messageText = txtContent.value;

    if (messageText.trim() !== "") {
      txtContent.value = "";

      const messageElement = createMessageElement(`${socket.nickname}: ${messageText}`, new Date().toLocaleString());

      outputChat.appendChild(messageElement);
      outputChat.scrollTop = outputChat.scrollHeight;

      sendMessageToServer(messageText);
    }
  }

  function createMessageElement(message, timestamp) {
    const messageElement = document.createElement("li");
    const userIdSpan = document.createElement("span");
    const messageSpan = document.createElement("span");
    const timestampSpan = document.createElement("span");

    const regex = /^(.*?):\s(.*)$/;
    const matches = message.match(regex);

    if (matches && matches.length === 3) {
      const userName = matches[1];
      const messageText = matches[2];

      userIdSpan.textContent = userName;
      userIdSpan.classList.add("user-id");
      messageSpan.textContent = messageText;
    } else {
      messageSpan.textContent = message;
    }

    timestampSpan.textContent = timestamp;

    messageSpan.classList.add("message-text");
    timestampSpan.classList.add("timestamp");

    messageElement.appendChild(userIdSpan);
    messageElement.appendChild(messageSpan);
    messageElement.appendChild(timestampSpan);

    return messageElement;
  }

  btnSend.addEventListener("click", sendMessage);
  txtContent.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  socket.on('chat message', (msg) => {
    const messageElement = createMessageElement(msg.message, msg.timestamp);
    outputChat.appendChild(messageElement);
    outputChat.scrollTop = outputChat.scrollHeight;
  });
});
