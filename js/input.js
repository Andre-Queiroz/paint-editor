canvas.addEventListener('click', clickEvent);
canvas.addEventListener('dblclick', doubleClickEvent);
document.querySelectorAll('.input-shape').forEach(item => { item.addEventListener("click", toggleRange) });
document.querySelector('#btn-import').addEventListener("click", importFile);

function clickEvent(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let click = new point(x, y);

    init(click, radioInput());
}

function doubleClickEvent() {
    if (radioInput() == 'polygon') {
        paint.finishPolygon();
    }
}

let color = document.getElementById('colorinput');
color.addEventListener('input', setColor);

let slider = document.getElementById('sliderinput');
slider.addEventListener('input', setThickness);

function setColor() {
    paint.setColor();
}

function setThickness() {
    paint.setThickness();
}

function radioInput() {
    if (document.getElementById('dot').checked) {
        return 'dot';
    }
    if (document.getElementById('line').checked) {
        return 'line';
    }
    if (document.getElementById('triangle').checked) {
        return 'triangle';
    }
    if (document.getElementById('rectangle').checked) {
        return 'rectangle';
    }
    if (document.getElementById('polygon').checked) {
        return 'polygon';
    }
    if (document.getElementById('circle').checked) {
        return 'circle';
    }
}

function toggleRange(event) {
    let range = document.querySelector('#radiusinput');
    let radio = event.target;

    if (radio.id != 'circle') {
        range.setAttribute("disabled", true);
        return;
    }

    range.removeAttribute("disabled");
}