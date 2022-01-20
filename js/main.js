const sketch = new Sketch('#canvas', '2d');
sketch.setup();
const paint = new Paint(sketch);

function init(click, input) {
  switch (input) {
    case 'dot':
      paint.drawDot(click);
      break;
    case 'line':
      paint.drawLine(click);
      break;
    case 'triangle':
      paint.drawTriangle(click);
      break;
    case 'rectangle':
      paint.drawRectangle(click);
      break;
    case 'polygon':
      paint.drawPolygon(click);
      break;
    case 'circle':
      let radius = document.querySelector('#radiusinput').value;
      if (radius < 10) {
        radius = 10;
      }
      if (radius > 300) {
        radius = 300;
      }
      paint.drawCircle(click, radius);
      break;
  }
}