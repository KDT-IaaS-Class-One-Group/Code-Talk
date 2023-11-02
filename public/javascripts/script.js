const cursor = document.querySelector('.cursor');

const animateCursor = (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;

    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

}

window.addEventListener('mousemove', animateCursor);