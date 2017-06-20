class DrawNode {
  constructor(node) {
    this.node = node // .title + .body
    this.canvas = document.getElementById('space')// 300 x 300
    this.ctx = this.canvas.getContext('2d')

  }

  formateNode() {

  }

  renderNode(array) {
    // array format: [x, y, w, h]
    this.ctx.strokeRect(array[0], array[1], array[2], array[3])
  }


  render(array) {
    this.renderNode(array)
  }


}
