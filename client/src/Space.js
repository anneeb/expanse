class Space {
  constructor() {
    this.nodeList = []
    this.nextNode = 0
    this.boxChangeLeft = 50
    this.boxChangeRight = 250
    this.lineChangeLeft = 75
    this.lineChangeRight = 275
  }

  addNode(name, body, parent) {
    var newNode = new Node(name, body, parent)
    this.nodeList.push(newNode)
  }


  nodeDim() {
    if (this.nextNode === 0) {
        return [[150, 0, 50, 50], [0]]
    } else if (this.nextNode === 1) {
        return [[150, 100, 50, 50], [175, 50, 175, 100]]
    } else if (this.nextNode % 2 === 0) {
        let x = [[this.boxChangeLeft, 100, 50, 50], [175, 50, this.lineChangeLeft, 100]]
        this.boxChangeLeft -= 100
        this.lineChangeLeft -= 100
        return x
      } else if (this.nextNode % 2 !== 0) {
        let x = [[this.boxChangeRight, 100, 50, 50], [175, 50, this.lineChangeRight, 100]]
        this.boxChangeRight += 100
        this.lineChangeRight += 100
        return x
      }
  }

  renderSpace() {
    for (let i = 0; i < this.nodeList.length; i++) {
      this.nodeList[i].render(this.nodeDim())
      this.nextNode += 1
    }
    this.nextNode = 0
    this.boxChangeLeft = 50
    this.boxChangeRight = 250
    this.lineChangeLeft = 75
    this.lineChangeRight = 275
  }

  render() {
    return this.renderSpace()
  }
}
