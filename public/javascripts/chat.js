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
      const currentDate = new Date();
      const timestamp = currentDate.toLocaleString();

      const messageElement = document.createElement("li");
      const messageSpan = document.createElement("span");
      const timestampSpan = document.createElement("span");

      messageSpan.textContent = messageText;
      timestampSpan.textContent = timestamp;

      messageElement.appendChild(messageSpan);
      messageElement.appendChild(timestampSpan);

      messageSpan.classList.add("message-text");
      timestampSpan.classList.add("timestamp");

      outputChat.appendChild(messageElement);
      outputChat.scrollTop = outputChat.scrollHeight;
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

  socket.on('chat message', (msg) => {
    const messageElement = document.createElement("li");
    const messageSpan = document.createElement("span");
    const timestampSpan = document.createElement("span");

    messageSpan.textContent = msg.message;
    timestampSpan.textContent = msg.timestamp;

    messageElement.appendChild(messageSpan);
    messageElement.appendChild(timestampSpan);

    messageSpan.classList.add("message-text");
    timestampSpan.classList.add("timestamp");

    outputChat.appendChild(messageElement);
    outputChat.scrollTop = outputChat.scrollHeight;
  });
});