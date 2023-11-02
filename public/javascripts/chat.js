// 파일 이름: chat.js
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
      txtContent.value = "";

      const messageElement = document.createElement("li");
      const messageSpan = document.createElement("span");
      const timestampSpan = document.createElement("span");

      messageSpan.textContent = `${socket.nickname}: ${messageText}`;
      timestampSpan.textContent = new Date().toLocaleString();

      messageElement.appendChild(messageSpan);
      messageElement.appendChild(timestampSpan);

      messageSpan.classList.add("message-text");
      timestampSpan.classList.add("timestamp");

      outputChat.appendChild(messageElement);
      outputChat.scrollTop = outputChat.scrollHeight;

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
  
    // 정규표현식을 사용하여 사용자 이름과 메시지 내용 추출
    const regex = /^(.*?):\s(.*)$/;
    const matches = msg.message.match(regex);
  
    if (matches && matches.length === 3) {
      const userName = matches[1]; // 첫 번째 그룹: 사용자 이름
      const messageText = matches[2]; // 두 번째 그룹: 메시지 내용
  
      // 사용자 이름, 메시지 내용, 타임스탬프를 각각의 <span>에 넣어줌
      messageSpan.textContent = messageText;
      timestampSpan.textContent = msg.timestamp;
  
      // 사용자 이름을 표시하는 <span> 태그를 생성하고 스타일을 추가
      const userIdSpan = document.createElement("span");
      userIdSpan.textContent = userName;
      userIdSpan.classList.add("user-id");
  
      // <li> 태그에 각각의 <span> 태그를 추가
      messageElement.appendChild(userIdSpan);
      messageElement.appendChild(messageSpan);
      messageElement.appendChild(timestampSpan);
      
      // 스타일 클래스 추가
      messageSpan.classList.add("message-text");
      timestampSpan.classList.add("timestamp");
    } else {
      // 매치되지 않는 경우 기본적으로 전체 메시지를 표시
      messageSpan.textContent = msg.message;
      messageElement.appendChild(messageSpan);
      messageElement.appendChild(timestampSpan);
      messageSpan.classList.add("message-text");
      timestampSpan.classList.add("timestamp");
    }
  
    outputChat.appendChild(messageElement);
    outputChat.scrollTop = outputChat.scrollHeight;
  });
  });