document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const root = document.getElementById('root');
  const remoteMouse = document.getElementById('remote-mouse');

  document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Check if mouse is within the root element
    const rect = root.getBoundingClientRect();
    const isInRoot = mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;

    if (isInRoot) {
      socket.emit('mousePosition', { x: mouseX, y: mouseY });
    }
  });

  socket.on('remoteMousePosition', (data) => {
    const remoteMousePointer = document.getElementById('remote-mouse-pointer');
    const { x, y } = data;

    remoteMousePointer.style.left = `${x}px`;
    remoteMousePointer.style.top = `${y}px`;
  });

  // Prevent scrolling when mouse is outside root element
  root.addEventListener('mouseleave', () => {
    document.body.style.overflow = 'hidden';
  });

  root.addEventListener('mouseenter', () => {
    document.body.style.overflow = 'auto';
  });
});
