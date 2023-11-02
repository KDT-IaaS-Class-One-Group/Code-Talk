document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const root = document.getElementById('root');
  const remoteMouse = document.getElementById('remote-mouse');
  const remoteMousePointer = document.getElementById('remote-mouse-pointer');
  const pointerSize = 10; // 원격 마우스 포인터의 크기

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
    const { x, y } = data;

    // 현재 root 요소의 위치
    const rootRect = root.getBoundingClientRect();

    // 포인터가 root 내에 위치하도록 보정
    let adjustedX = x - rootRect.left - pointerSize / 2;
    let adjustedY = y - rootRect.top - pointerSize / 2;

    // 루트를 벗어나지 않도록 보정
    adjustedX = Math.min(Math.max(adjustedX, 0), rootRect.width - pointerSize);
    adjustedY = Math.min(Math.max(adjustedY, 0), rootRect.height - pointerSize);

    remoteMousePointer.style.left = `${adjustedX}px`;
    remoteMousePointer.style.top = `${adjustedY}px`;
  });

  // Prevent scrolling when mouse is outside root element
  root.addEventListener('mouseleave', () => {
    document.body.style.overflow = 'hidden';
  });

  root.addEventListener('mouseenter', () => {
    document.body.style.overflow = 'auto';
  });
});
