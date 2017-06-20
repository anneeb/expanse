class Node {
  constructor(title, body) {
    this.title = title
    this.body = body
    this.container
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

  render(array) {
    this.drawBox(array)
  }
}
