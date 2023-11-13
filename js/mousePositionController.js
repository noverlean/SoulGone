let mousePosition = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
    mousePosition = { x: event.clientX, y: event.clientY };
});