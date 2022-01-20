let np = null;

function importFile() {
    let textArea = document.querySelector('#txt-area-import').value;
    if (!textArea) {
        alert("Enter text in JSON format.");
        return;
    }

    let parsed = JSON.parse(textArea);
    if (!parsed) {
        alert("Invalid format.");
        return;
    }

    parsed.pontos.forEach(item => {
        sketch.setColor(paint.rgdToHexadecimal(item.cor[0], item.cor[1], item.cor[2]));
        sketch.setThickness(item.esp);

        np = new point(item.coord[0], item.coord[1]);
        paint.drawDot(np);
    });

    parsed.retas.forEach(item => {
        sketch.setColor(paint.rgdToHexadecimal(item.cor[0], item.cor[1], item.cor[2]));
        sketch.setThickness(item.esp);
        item.pontos.forEach(p => {
            np = new point(p[0], p[1]);
            paint.drawLine(np);
        })
    });

    parsed.triangulos.forEach(item => {
        sketch.setColor(paint.rgdToHexadecimal(item.cor[0], item.cor[1], item.cor[2]));
        sketch.setThickness(item.esp);
        item.pontos.forEach(p => {
            np = new point(p[0], p[1]);
            paint.drawTriangle(np);
        })
    });

    parsed.retangulos.forEach(item => {
        sketch.setColor(paint.rgdToHexadecimal(item.cor[0], item.cor[1], item.cor[2]));
        sketch.setThickness(item.esp);
        item.pontos.forEach(p => {
            np = new point(p[0], p[1]);
            paint.drawRectangle(np);
        })
    });

    parsed.poligonos.forEach(item => {
        sketch.setColor(paint.rgdToHexadecimal(item.cor[0], item.cor[1], item.cor[2]));
        sketch.setThickness(item.esp);
        item.pontos.forEach((p) => {
            np = new point(p[0], p[1]);
            paint.drawPolygon(np);
        });

        paint.finishPolygon();
    });

    parsed.circulos.forEach(item => {
        sketch.setColor(paint.rgdToHexadecimal(item.cor[0], item.cor[1], item.cor[2]));
        sketch.setThickness(item.esp);

        np = new point(item.centro[0], item.centro[1]);
        let radius = item.raio;

        paint.drawCircle(np, radius);
    });
}