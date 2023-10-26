const boxChatLog = document.getElementById('box-Chat-Log');
const txtInput = document.getElementById('txt-Input');
const btnSubmit = document.getElementById('btn-Submit');

const scrollToBottom = () => {
  boxChatLog.scrollTop = chatLog.scrollHeight;
}

const addNewMessage = (message) => {
  const lis = document.createElement("li");
  const spanName = document.createElement("span");
  const spanContent = document.createElement("span");
  
  boxChatLog.appendChild(lis);
  spanName.textContent = "임시";
  spanName.setAttribute("id", "span-Name");

  spanContent.textContent = message;
  spanContent.setAttribute("id", "span-Content");
  lis.appendChild(spanName);
  lis.appendChild(spanContent);

  scrollToBottom();
}
const a = document.getElementById('a');
a.addEventListener('click', () => {
  if(txtInput.value !== "") {
    addNewMessage(`${txtInput.value}`);
  }
});