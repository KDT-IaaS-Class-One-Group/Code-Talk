const txtContent = document.getElementById("txt-Content");
const btnSend = document.getElementById("btn-Send");
const outputChat = document.getElementById("output-Chat");

btnSend.addEventListener("click", sendMessage);

function sendMessage() {
  const messageText = txtContent.value;
  if (messageText.trim() !== "") {
    const messageElement = document.createElement("li");
    
    // 현재 날짜와 시간을 생성
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();
    
    // 메시지 텍스트와 날짜/시간을 함께 표시
    messageElement.textContent = `${timestamp} - ${messageText}`;
    
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

