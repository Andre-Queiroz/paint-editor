class Sketch {
    constructor(canvasId, context) {
        if (context != '2d') context = '2d';

        this.canvasId = canvasId;
        this.canvas = document.querySelector(canvasId);
        this.context = this.canvas.getContext(context);
    }

    /**
     * Set canvas
     */
    setup() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }

    /**
     * Set canvas' fillStyle with color
     * 
     * @param {string} color 
     */
    setColor(color) {
        this.context.fillStyle = color;
    }

    getColor() {
        return this.context.fillStyle;
    }

    /**
     * Get canvas width
     * @returns float
     */
    getCanvasWidth() {
        return this.canvas.width;
    }

    /**
     * Get canvas height
     * @returns float
     */
    getCanvasHeight() {
        return this.canvas.height;
    }

    /**
     * Clear canvas for redrawing
     */
    clearSketch() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    setThickness(thickness) {
        this.width = thickness;
        this.height = thickness;
    }

    getThickness() {
        return this.height;
    }

    /**
     * Prints a dot on screen
     * 
     * @param {integer x coordinate} x
     * @param {integer y coordinate} y
     * @param {width of the dot} width
     * @param {height of the dot} height
     */
    dot(x, y) {
        this.context.fillRect(x, y, this.width, this.height);
    }

    /**
     * 
     * Draws a line between the start point and the end point
     * using Bresenham's line algorithm.
     * 
     * @param {x coordinate of the starting point} x1 
     * @param {y coordinate of the starting point} y1 
     * @param {x coordinate of the endpoint} x2 
     * @param {y coordinate of the endpoint} y2 
     */
    line(x1, y1, x2, y2) {
        x1 |= 0;
        y1 |= 0;
        x2 |= 0;
        y2 |= 0;

        var dx = x2 - x1;
        var dy = y2 - y1;

        var sx = (dx > 0) - (dx < 0);
        var sy = (dy > 0) - (dy < 0);

        dx *= sx;
        dy *= sy;

        this.dot(x1, y1);

        if (!(dx || dy)) {
            return;
        }

        var d = 0;
        var x = x1;
        var y = y1;
        var v;

        if (dy < dx) {
            for (v = 0 | (dy << 15) / dx * sy; x ^ x2; x += sx, d &= 32767) {
                this.dot(x, y += (d += v) >> 15);
            }
        }
        else {
            for (v = 0 | (dx << 15) / dy * sx; y ^ y2; y += sy, d &= 32767) {
                this.dot(x += (d += v) >> 15, y);
            }
        }
    }

    triangle(p1, p2, p3) {
        this.line(p1.x, p1.y, p2.x, p2.y);
        this.line(p2.x, p2.y, p3.x, p3.y);
        this.line(p3.x, p3.y, p1.x, p1.y);
    }

    rectangle(p1, p2) {
        let p3 = new point(p2.x, p1.y);
        let p4 = new point(p1.x, p2.y);

        this.line(p1.x, p1.y, p3.x, p3.y);
        this.line(p3.x, p3.y, p2.x, p2.y);
        this.line(p2.x, p2.y, p4.x, p4.y);
        this.line(p4.x, p4.y, p1.x, p1.y);
    }

    circle(origin, radius) {
        for (var i = 0; i < 720; i++) {
            var x = origin.x + Math.cos(i) * radius;
            var y = origin.y + Math.sin(i) * radius;
            this.dot(x, y);
        }
    }
}