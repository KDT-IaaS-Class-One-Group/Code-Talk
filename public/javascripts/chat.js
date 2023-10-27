const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatMessages = document.getElementById("chat-messages");

sendButton.addEventListener("click", sendMessage);

function sendMessage() {
  const messageText = messageInput.value;
  if (messageText.trim() !== "") {
    const messageElement = document.createElement("li");
    messageElement.textContent = messageText;
    chatMessages.appendChild(messageElement);
    messageInput.value = "";

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

messageInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage(isOwnMessage) {
  const messageText = messageInput.value;
  if (messageText.trim() !== "") {
    const messageElement = document.createElement("li");
    messageElement.textContent = messageText;

    if (isOwnMessage) {
      messageElement.classList.add("own-message"); // Add a class for own messages
    }

    chatMessages.appendChild(messageElement);
    messageInput.value = "";

    // Scroll to the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

// When sending your own message
sendButton.addEventListener("click", () => {
  sendMessage(true);
});

// When receiving a message (simulate a received message)
function receiveMessage() {
  const messageText = "This is a received message.";
  sendMessage(false);
}

