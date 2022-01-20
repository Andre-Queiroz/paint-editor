class Paint {
    constructor(sketch) {
        this.sketch = sketch;
        this.dots = [];

        this.line = new line();
        this.lines = [];

        this.triangle = new triangle();
        this.triangles = [];

        this.rectangle = new rectangle();
        this.rectangles = [];

        this.polygon = new polygon();
        this.polygons = [];

        this.circles = [];

        this.setColor();
        this.setThickness();
    }

    drawDot(click) {
        let dot = {
            nome: "ponto" + (this.dots.length + 1),
            coord: [click.x, click.y],
            cor: this.hexadecimalToRgb(this.sketch.getColor()),
            esp: this.sketch.getThickness()
        };

        this.dots.push(dot);
        sketch.dot(click.x, click.y);
    }

    drawLine(click) {
        this.line.addPoint(click);
        if (this.line.isComplete()) {
            let line = {
                nome: "reta" + (this.lines.length + 1),
                pontos: [[this.line.points[0].x, this.line.points[0].y], [click.x, click.y]],
                cor: this.hexadecimalToRgb(this.sketch.getColor()),
                esp: this.sketch.getThickness()
            };

            this.lines.push(line);
            sketch.line(this.line.points[0].x, this.line.points[0].y, this.line.points[1].x, this.line.points[1].y);
            this.line.erase();

            return
        }
    }

    drawTriangle(click) {
        this.triangle.addPoint(click);
        if (this.triangle.isComplete()) {
            let triangle = {
                nome: "triangulo" + (this.triangles.length + 1),
                pontos: [
                    [this.triangle.points[0].x, this.triangle.points[0].y],
                    [this.triangle.points[1].x, this.triangle.points[1].y],
                    [click.x, click.y]
                ],
                cor: this.hexadecimalToRgb(this.sketch.getColor()),
                esp: this.sketch.getThickness()
            };
            this.triangles.push(triangle);
            sketch.triangle(this.triangle.points[0], this.triangle.points[1], click);
            this.triangle.erase();
        }
    }

    drawRectangle(click) {
        this.rectangle.addPoint(click);
        if (this.rectangle.isComplete()) {
            let rectangle = {
                nome: "retangulo" + (this.rectangles.length + 1),
                pontos: [[this.rectangle.points[0].x, this.rectangle.points[0].y], [click.x, click.y]],
                cor: this.hexadecimalToRgb(this.sketch.getColor()),
                esp: this.sketch.getThickness()
            };
            this.rectangles.push(rectangle);
            sketch.rectangle(this.rectangle.points[0], click);
            this.rectangle.erase();
        }
    }

    drawPolygon(click) {
        let lastPoint = this.polygon.getLast();
        if (lastPoint) {
            sketch.line(lastPoint.x, lastPoint.y, click.x, click.y);
        }
        this.polygon.addPoint(click);
    }

    finishPolygon() {
        let firstPoint = this.polygon.getFirst();
        let lastPoint = this.polygon.getLast();
        sketch.line(lastPoint.x, lastPoint.y, firstPoint.x, firstPoint.y);

        let polygon = {
            nome: "poligono" + (this.polygons.length + 1),
            pontos: [],
            cor: this.hexadecimalToRgb(this.sketch.getColor()),
            esp: this.sketch.getThickness()
        };

        for (let i = 0; i < this.polygon.points.length; i++) {
            polygon['pontos'].push(
                [
                    this.polygon.points[i].x,
                    this.polygon.points[i].y
                ]
            );
        }
        this.polygons.push(polygon);
        this.polygon.erase();
    }

    drawCircle(click, radius) {
        let circle = {
            nome: "circulo" + (this.circles.length + 1),
            centro: [click.x, click.y],
            raio: radius,
            cor: this.hexadecimalToRgb(this.sketch.getColor()),
            esp: this.sketch.getThickness()
        };
        this.circles.push(circle);
        sketch.circle(click, radius);
    }

    setColor() {
        let color = document.getElementById('colorinput').value;
        sketch.setColor(color);
    }

    setThickness() {
        let thickness = document.getElementById('sliderinput').value;
        sketch.setThickness(thickness);
    }

    hexadecimalToRgb(hex) {
        return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
    }

    rgdToHexadecimal(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    clear() {
        this.dots = [];
        this.lines = [];
        this.triangles = [];
        this.rectangles = [];
        this.polygons = [];
        this.sketch.clearSketch();
    }
}