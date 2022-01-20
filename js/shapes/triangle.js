'use strict'

class triangle {
    constructor() {
        this.points = [];
    }

    addPoint(point) {
        if (this.isComplete()) return;
        this.points.push(point);
    }

    erase() {
        this.points = [];
    }

    isComplete() {
        return this.points.length == 3;
    }
}