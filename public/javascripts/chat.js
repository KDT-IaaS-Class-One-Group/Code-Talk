const outputChat = document.getElementById("output-Chat");
const txtContent = document.getElementById("txt-Content");
const btnSend = document.getElementById("btn-Send");

btnSend.addEventListener("click", () => {
  const messageText = txtContent.value.trim();
  if (messageText !== "") {
    sendMessage(messageText);
  }
});

txtContent.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const messageText = txtContent.value.trim();
    if (messageText !== "") {
      sendMessage(messageText);
    }
  }
});

const sendMessage = (message) => {
  appendMessageToChat("You", message);
  sendToServer(message);
  txtContent.value = "";
};

const appendMessageToChat = (sender, message) => {
  const messageElement = document.createElement("li");
  messageElement.textContent = `[${sender}]: ${message}`;
  outputChat.appendChild(messageElement);
};

const sendToServer = async (message) => {
  try {
    const response = await fetch("/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    appendMessageToChat("Server", data.message);
  } catch (error) {
    console.error("Error:", error);
  }
};