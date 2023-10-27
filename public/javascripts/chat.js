const txtContent = document.getElementById("txt-Content");
const btnSend = document.getElementById("btn-Send");
const outputChat = document.getElementById("output-Chat");

btnSend.addEventListener("click", sendMessage);

const endMessage = () => {
  const messageText = txtContent.value;
  if (messageText.trim() !== "") {
    const messageElement = document.createElement("li");

    // 현재 날짜와 시간을 생성
    const currentDate = new Date();
    const timestamp = currentDate.toLocaleString();

    // 메시지와 날짜/시간을 각각 <span> 요소로 분리
    const messageSpan = document.createElement("span");
    messageSpan.textContent = messageText;

    const timestampSpan = document.createElement("span");
    timestampSpan.textContent = timestamp;

    // 각각의 <span> 요소를 <li>에 추가
    messageElement.appendChild(messageSpan);
    messageElement.appendChild(timestampSpan);

    // CSS 클래스를 추가하여 스타일링 가능
    messageSpan.classList.add("message-text");
    timestampSpan.classList.add("timestamp");

    outputChat.appendChild(messageElement);
    txtContent.value = "";

    outputChat.scrollTop = outputChat.scrollHeight;
  }
}

txtContent.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

