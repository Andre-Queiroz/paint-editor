let jsonBtn = document.querySelector('#jsonbtn');
jsonBtn.addEventListener('click', jsonButtonHandler);

let btnCopy = document.querySelector('#btn-copy');
btnCopy.addEventListener('click', copyButtonHandler);

let textArea = document.querySelector('#txt-area');

function toJson(data) {
    var myModal = document.getElementById('exampleModal');
    myModal.addEventListener('shown.bs.modal', function () { });
    textArea.value = JSON.stringify(data);
}

function jsonButtonHandler() {
    let data = {};
    data['pontos'] = paint.dots;
    data['retas'] = paint.lines;
    data['circulos'] = paint.circles;
    data['triangulos'] = paint.triangles;
    data['retangulos'] = paint.rectangles;
    data['poligonos'] = paint.polygons;
    toJson(data);
}

function copyButtonHandler() {
    navigator.clipboard.writeText(textArea.value).then(() => {
        modal.hide();
    });
}