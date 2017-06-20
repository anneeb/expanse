class DrawNode {
  constructor(node) {
    this.node = node // .title + .body
    this.canvas = document.getElementById('space')// 300 x 300
    this.ctx = this.canvas.getContext('2d')

  }

  formateNode() {

  }

  renderNode(array) {
    // array format: [[x, y, w, h], [startX, startY, endX, endY]]
    
    //title, body, parent

    this.ctx.strokeRect(array[0][0], array[0][1], array[0][2], array[0][3])
    if (array[1][0] !== 0) {
      this.ctx.moveTo(array[1][0], array[1][1])
      this.ctx.lineTo(array[1][2], array[1][3])
      this.ctx.stroke()
    }
  }

  render(array) {
    this.renderNode(array)
  }
}
