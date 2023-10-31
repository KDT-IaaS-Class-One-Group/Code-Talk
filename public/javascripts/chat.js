const outputChat = document.getElementById("output-Chat");
const txtContent = document.getElementById("txt-Content");
const btnSend = document.getElementById("btn-Send");

function sendMessage() {
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

    // 새로운 메시지를 가장 마지막에 추가
    outputChat.appendChild(messageElement);

    // 스크롤을 가장 아래로 이동
    outputChat.scrollTop = outputChat.scrollHeight;

    txtContent.value = "";
  }
}


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