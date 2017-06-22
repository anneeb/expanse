class Node {
  constructor(space, obj) {
    this.space = space
    this.id = obj.id
    this.parentId = obj.parent_id
    this.title = obj.title
    this.body = obj.body
    this.spaceId = obj.space_id
    this.numChild = obj.num_child
    this.container = null
    this.line = null
  }

  drawBox(array) {
    // array format: [[x, y, w, h], [startX, startY, endX, endY]]
    let container = new createjs.Container()
    let square = new createjs.Shape()
    let label = new createjs.Text(`${this.title}`, "10px Arial", "white")
    square.name = this.id
    square.graphics.setStrokeStyle(1).beginStroke("black").beginFill("black").drawRect(0, 0, 50, 50)
    container.x = array[0][0]
    container.y = array[0][1]
    container.addChild(square, label)
    this.container = container
  }

  drawLine(array) {
    // array format: [[x, y, w, h], [startX, startY, endX, endY]]
    let line = new createjs.Shape()
    line.graphics.setStrokeStyle(1)
    line.graphics.beginStroke("black")
    line.graphics.moveTo(array[1][0], array[1][1])
    line.graphics.lineTo(array[1][2], array[1][3])
    this.line = line
  }

  render(array) {
    this.drawBox(array)
    this.drawLine(array)
  }
}
