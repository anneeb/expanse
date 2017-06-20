class Node {
  constructor(title, body) {
    this.title = title
    this.body = body
    this.container
    this.line
  }


  drawBox(array) {
    // array format: [[x, y, w, h], [startX, startY, endX, endY]]
    let container = new createjs.Container()
    let square = new createjs.Shape()
    let label = new createjs.Text(`${this.title}`, "10px Arial", "black")
    square.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,1)").drawRect(0, 0, 50, 50)
    container.x = array[0][0]
    container.y = array[0][1]
    container.addChild(square, label);
    this.container = container
  }

  drawLine(array) {
    // array format: [[x, y, w, h], [startX, startY, endX, endY]]
    let line = new createjs.Shape();
    line.graphics.setStrokeStyle(1);
    line.graphics.beginStroke("#000000");
    line.graphics.moveTo(array[1][0], array[1][1]);
    line.graphics.lineTo(array[1][2], array[1][3]);
    line.graphics.endStroke();
    this.line = line
  }

  render(array) {
    this.drawBox(array)
    this.drawLine(array)
  }
}
