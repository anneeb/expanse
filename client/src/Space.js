class Space {
  constructor() {
    this.nodeList = []
    this.nextNode
    this.changeLeft = 50
    this.changeRight = 250
  }

  addNode(name, body, parent) {
    var newNode = new Node(name, body, parent)
    this.nodeList.push(newNode)
  }


  nodeDim() {
    if (this.nextNode === 0) {
      return [150, 0, 50, 50]
    } else if (this.nextNode === 1) {
      return [150, 100, 50, 50]
    } else {
      if (this.nextNode % 2 === 0) {
        let x = [this.changeLeft, 100, 50, 50]
        this.changeLeft -= 100
        return x
      } else {
        let x = [this.changeRight, 100, 50, 50]
        this.changeRight += 100
        return x
      }
    }
  }

  renderSpace() {
    this.nextNode = 0
    let renderMe = '<ul>'
    for (let i = 0; i < this.nodeList.length; i++) {
      renderMe += this.nodeList[i].render()
      this.nodeList[i].aRender(this.nodeDim())
      this.nextNode += 1
    }
    return renderMe + '</ul>'
  }

  render() {
    return this.renderSpace()
  }
}
