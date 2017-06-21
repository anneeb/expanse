class Space {
  constructor() {
    this.nodeList = []
    this.nextNode = 0
    this.stage = new createjs.Stage("space")

    this.boxChangeLeft = 100
    this.boxChangeRight = 100

    this.lineChangeLeft = 75
    this.lineChangeRight = 125
  }

  addNode(title, body) {
    var newNode = new Node(title, body)
    this.nodeList.push(newNode)
  }

  // nodeDim() {
  //   if (this.nextNode === 0) {
  //       return [[150, 0, 50, 50], [0]]
  //   } else if (this.nextNode === 1) {
  //       return [[150, 100, 50, 50], [175, 50, 175, 100]]
  //   } else if (this.nextNode % 2 === 0) {
  //       let x = [[this.boxChangeLeft, 100, 50, 50], [175, 50, this.lineChangeLeft, 100]]
  //       this.boxChangeLeft -= 100
  //       this.lineChangeLeft -= 100
  //       return x
  //     } else if (this.nextNode % 2 !== 0) {
  //       let x = [[this.boxChangeRight, 100, 50, 50], [175, 50, this.lineChangeRight, 100]]
  //       this.boxChangeRight += 100
  //       this.lineChangeRight += 100
  //       return x
  //     }
  // }

  nodeDim(frank) {
    if (this.nextNode === 0) {
        return [[this.stage.canvas.width / 2, 2, 50, 50], [0]]
    } else if (this.nextNode === 1) {
        return [[this.stage.canvas.width / 2, 100, 50, 50], [(this.stage.canvas.width / 2) + 25, 50, (this.stage.canvas.width / 2) + 25, 100]]


    } else if (this.nextNode % 2 === 0) {
        let x = [[(this.stage.canvas.width / 2) - this.boxChangeLeft, 100, 50, 50], [(this.stage.canvas.width / 2) + 25, 50, (this.stage.canvas.width / 2) - this.lineChangeLeft, 100]]
        this.boxChangeLeft += 100
        this.lineChangeLeft += 100
        return x

      } else if (this.nextNode % 2 !== 0) {
        let x = [[(this.stage.canvas.width / 2) + this.boxChangeRight, 100, 50, 50], [(this.stage.canvas.width / 2) + 25, 50, (this.stage.canvas.width / 2) + this.lineChangeRight, 100]]
        this.boxChangeRight += 100
        this.lineChangeRight += 100
        return x
      }
  }

  renderSpace() {
    this.stage.removeAllChildren()
    for (let i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].render(this.nodeDim())
      this.stage.addChild(this.nodeList[i].container)
      if (this.nextNode !== 0) {this.stage.addChild(this.nodeList[i].line)}
      this.nextNode += 1
    }
    this.stage.update()
    this.nextNode = 0
    this.boxChangeLeft = 100
    this.boxChangeRight = 100
    this.lineChangeLeft = 75
    this.lineChangeRight = 125
  }

  render() {
    this.renderSpace()
  }
}
