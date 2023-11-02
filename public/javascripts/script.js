const cousor = document.querySelector('.cousor');

const animateCursor = (e) => {
    cousor.style.left = `${e.pageX}px`;
    cousor.style.top = `${e.pageY}px`;
}
window.addEventListener('mousemove', animateCursor);