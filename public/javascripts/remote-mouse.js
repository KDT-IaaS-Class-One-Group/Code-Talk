document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const remoteMousesElement = document.getElementById('remote-mouses');

  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // socket.emit('mousePosition', { x: mouseX, y: mouseY });
  });

  socket.on('remoteMousesPosition', (remoteMouses) => {
    remoteMousesElement.innerHTML = '';
    for (let id in remoteMouses) {
      if (id !== socket.id) { // 현재 사용자의 마우스를 숨깁니다
        const pointer = document.createElement('div');
        pointer.className = 'remote-mouse-pointer';
        pointer.style.left = remoteMouses[id].x + 'px';
        pointer.style.top = remoteMouses[id].y + 'px';
        remoteMousesElement.appendChild(pointer);
      }
    }
  });

  socket.on('userDisconnected', (disconnectedUserId) => {
    const disconnectedPointer = document.querySelector(`.remote-mouse-pointer[data-user="${disconnectedUserId}"]`);
    if (disconnectedPointer) {
      disconnectedPointer.remove();
    }
  });
});
