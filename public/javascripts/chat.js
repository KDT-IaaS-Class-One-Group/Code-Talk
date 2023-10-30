const txtContent = document.getElementById("txt-Content");
const btnSend = document.getElementById("btn-Send");
const outputChat = document.getElementById("output-Chat");

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

    axios.get("/sendMessage", { params: { message: messageText } })
      .then(response => {
        console.log("서버 응답:", response.data);

        const serverResponse = response.data;
      })
      .catch(error => {
        console.error("에러:", error);
      });
  }
}

btnSend.addEventListener("click", sendMessage);
txtContent.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

