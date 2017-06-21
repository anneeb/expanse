class Space {
  constructor() {
    this.nodeList = []
    this.nextNode = 0
    this.stage = new createjs.Stage("space")
    this.stage.enableDOMEvents(true)
    this.stage.on("click", this.test.bind(this))
    this.boxChangeLeft = 100
    this.boxChangeRight = 100
    this.lineChangeLeft = 75
    this.lineChangeRight = 125
  }

  addNode(title, body) {
    var newNode = new Node(title, body)
    this.nodeList.push(newNode)
  }

  nodeDim(frank) {
    if (this.nextNode === 0) {
        return [[this.stage.canvas.width / 2, 5, 50, 50], [0]]
    } else if (this.nextNode === 1) {
        return [[this.stage.canvas.width / 2, 100, 50, 50], [(this.stage.canvas.width / 2) + 25, 55, (this.stage.canvas.width / 2) + 25, 100]]
    } else if (this.nextNode % 2 === 0) {
        let x = [[(this.stage.canvas.width / 2) - this.boxChangeLeft, 100, 50, 50], [(this.stage.canvas.width / 2) + 25, 55, (this.stage.canvas.width / 2) - this.lineChangeLeft, 100]]
        this.boxChangeLeft += 100
        this.lineChangeLeft += 100
        return x
      } else if (this.nextNode % 2 !== 0) {
        let x = [[(this.stage.canvas.width / 2) + this.boxChangeRight, 100, 50, 50], [(this.stage.canvas.width / 2) + 25, 55, (this.stage.canvas.width / 2) + this.lineChangeRight, 100]]
        this.boxChangeRight += 100
        this.lineChangeRight += 100
        return x
      }
  }

  test(event) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].container.children[0].name === event.target.name) {
        console.log(`What Should I Do With: ${this.nodeList[i].container.children[0].name}`);
      }
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
