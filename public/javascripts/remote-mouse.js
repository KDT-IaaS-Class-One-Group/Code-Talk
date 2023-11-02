document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  let isMouseOut = false;

  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (!isMouseOut) {
      socket.emit('mousePosition', { x: mouseX, y: mouseY });
    }
  });

  document.addEventListener('mouseout', () => {
    isMouseOut = true;
  });

  document.addEventListener('mouseover', () => {
    isMouseOut = false;
  });

  socket.on('remoteMousePosition', (data) => {
    const remoteMousePointer = document.getElementById('remote-mouse-pointer');
    const { x, y } = data;
    remoteMousePointer.style.left = `${x}px`;
    remoteMousePointer.style.top = `${y}px`;
  });
});