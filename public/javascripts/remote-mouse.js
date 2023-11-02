document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const remoteMousesElement = document.getElementById('remote-mouses');

  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // 사용자마다 무작위 색상 생성
    const userColor = getRandomColor();

    socket.emit('mousePosition', { x: mouseX, y: mouseY, color: userColor });
  });

  socket.on('remoteMousesPosition', (remoteMouses) => {
    remoteMousesElement.innerHTML = '';
    for (let id in remoteMouses) {
      const userColor = remoteMouses[id].color;
      const isCurrentUser = id === socket.id;

      const pointer = document.createElement('div');
      pointer.className = 'remote-mouse-pointer';
      pointer.style.left = remoteMouses[id].x + 'px';
      pointer.style.top = remoteMouses[id].y + 'px';
      pointer.style.backgroundColor = isCurrentUser ? 'transparent' : userColor;
      remoteMousesElement.appendChild(pointer);
    }
  });

  socket.on('userDisconnected', (disconnectedUserId) => {
    const disconnectedPointer = document.querySelector(`.remote-mouse-pointer[data-user="${disconnectedUserId}"]`);
    if (disconnectedPointer) {
      disconnectedPointer.remove();
    }
  });

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
});
