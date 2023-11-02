document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const remoteMousesElement = document.getElementById('remote-mouses');

  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    socket.emit('mousePosition', { x: mouseX, y: mouseY });
  });

  document.addEventListener('click', (event) => {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'click-effect';
    
    const x = event.clientX;
    const y = event.clientY;
    
    clickEffect.style.left = `${x}px`;
    clickEffect.style.top = `${y}px`;
    
    remoteMousesElement.appendChild(clickEffect);

    // 클릭 효과가 서서히 사라지도록 설정 (예: 0.5초 후 삭제)
    setTimeout(() => {
      clickEffect.remove();
    }, 500); // 0.5초 (500ms)

    socket.emit('mouseClick', { x, y });
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

  socket.on('clickEffect', (data) => {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'click-effect';
    clickEffect.style.left = `${data.x}px`;
    clickEffect.style.top = `${data.y}px`;
    
    remoteMousesElement.appendChild(clickEffect);

    // 클릭 효과가 서서히 사라지도록 설정 (예: 0.5초 후 삭제)
    setTimeout(() => {
      clickEffect.remove();
    }, 500); // 0.5초 (500ms)
  });
});
