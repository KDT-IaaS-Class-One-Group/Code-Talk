const txtContent = document.getElementById("txt-Content");
const btnSend = document.getElementById("btn-Send");
const outputChat = document.getElementById("output-Chat");

btnSend.addEventListener("click", sendMessage);

function sendMessage() {
  const messageText = txtContent.value;
  if (messageText.trim() !== "") {
    const messageElement = document.createElement("li"); // Change to <li>
    messageElement.textContent = messageText;
    outputChat.appendChild(messageElement);
    txtContent.value = "";

    outputChat.scrollTop = outputChat.scrollHeight;
  }
}

txtContent.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
