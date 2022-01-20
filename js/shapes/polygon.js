'use strict'

class polygon {
    constructor() {
        this.points = [];
    }

    addPoint(point) {
        this.points.push(point);
    }

    getLast() {
        if (this.points.length == 0) return;
        return this.points[this.points.length - 1];
    }

    getFirst() {
        if (this.points.length == 0) return;
        return this.points[0];
    }

    erase() {
        this.points = [];
    }
}