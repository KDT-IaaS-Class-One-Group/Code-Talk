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

    axios.post("/sendMessage", { message: messageText })
    .then(response => {
      console.log("서버로부터 받은 응답:", response.data);
      // 여기에서 서버로부터 받은 응답 데이터를 처리할 수 있습니다.
      const serverResponse = response.data;

      // 예를 들어, 받은 응답을 outputChat에 추가하려면:
      const serverResponseElement = document.createElement("li");
      const responseSpan = document.createElement("span");
      responseSpan.textContent = serverResponse;
      serverResponseElement.appendChild(responseSpan);

      outputChat.appendChild(serverResponseElement);
      outputChat.scrollTop = outputChat.scrollHeight;
    })
    .catch(error => {
      console.error("에러 발생:", error);
    });
  }
}

btnSend.addEventListener("click", sendMessage);
txtContent.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

