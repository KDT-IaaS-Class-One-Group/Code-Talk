document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  const outputChat = document.getElementById("output-Chat");

  function createMessageElement(msg) {
    const messageElement = document.createElement("li");
    const messageSpan = document.createElement("span");
    const timestampSpan = document.createElement("span");
    const userIdSpan = document.createElement("span");

    messageSpan.textContent = msg.message;
    timestampSpan.textContent = msg.timestamp;
    userIdSpan.textContent = msg.userId;

    messageSpan.classList.add("message-text");
    timestampSpan.classList.add("timestamp");
    userIdSpan.classList.add("user-id");

    messageElement.appendChild(userIdSpan);
    messageElement.appendChild(messageSpan);
    messageElement.appendChild(timestampSpan);

    return messageElement;
  }

  socket.on('chat message', (msg) => {
    const messageElement = createMessageElement(msg);
    outputChat.insertBefore(messageElement, outputChat.firstChild);
    outputChat.scrollTop = outputChat.scrollHeight;
  });

  const txtContent = document.getElementById("txt-Content");
  const btnSend = document.getElementById("btn-Send");

  function sendMessageToServer(message) {
    socket.emit('chat message', message);
  }

  function sendMessage() {
    const messageText = txtContent.value;

    if (messageText.trim() !== "") {
      txtContent.value = "";
      sendMessageToServer(messageText);
    }
  }

  btnSend.addEventListener("click", sendMessage);
  txtContent.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
