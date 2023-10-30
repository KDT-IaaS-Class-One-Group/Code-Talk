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

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/sendMessage?message=${messageText}`, true);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // 서버 응답을 처리하고 싶은 경우 여기에 작성
        // 여기에서 서버로부터 받은 응답 데이터를 처리할 수 있습니다.
        console.log("서버로부터 받은 응답:", xhr.responseText);
      }
    };
  }
}

btnSend.addEventListener("click", sendMessage);
txtContent.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

