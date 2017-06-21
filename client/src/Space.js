class Space {
  constructor(title, creator) {
    this.id
    this.title = title
    this.creator = creator
    this.adapter = new Adapter
    this.nodeList = []
    this.howToRender = {}
    this.nextNode = 0
    this.stage = new createjs.Stage("space")
    this.stage.enableDOMEvents(true)
    this.stage.on("click", this.setParent.bind(this))
    this.parentIdInput = $("#node-parent-id")
    this.save()
  }

  save(){
    this.adapter.createSpace({title: this.title, creator: this.creator})
      .then(resp => resp.json())
      .then(json => this.id = json.data.id)
  }

  fetchNodes() {
    this.adapter.getSpaceById(this.id)
      .then(resp => resp.json())
      .then(json => {
        this.nodeList = []
        json.nodes.forEach(node => this.addNode(node))
      })
      .then(() => this.render())
  }

  addNode(obj) {
    var newNode = new Node(this, obj.id, obj.title, obj.body, obj.space_id, obj.parent_id, obj.num_child)
    this.nodeList.push(newNode)
  }

  nodeDim(parentId) {
    if (!parentId) {
      return [[this.stage.canvas.width / 2, 5, 50, 50], [0]]
    } else {
      let currentNodeParent = this.nodeList.find(node => node.id === parentId)
      let parentX = currentNodeParent.container.x
      let parentY = currentNodeParent.container.y
      let parentInfo = this.howToRender[`${parentId}`]

      // array format: [[x, y, w, h], [startX, startY, endX, endY]]
      if (parentInfo.childMade === 0) {
          this.howToRender[`${parentId}`].childMade++
          return [[parentX, parentY + 100, 50, 50], [parentX + 25, parentY + 50, parentX + 25, parentY + 100]]

      } else if (parentInfo.childMade % 2 === 0) {
          let x = [
            [parentX - parentInfo.boxLeft, parentY + 100, 50, 50],
            [parentX + 25, parentY + 50, parentX - parentInfo.lineLeft, parentY + 100]
          ]
          parentInfo.boxLeft += 100
          parentInfo.lineLeft += 100
          parentInfo.childMade++
          return x

        } else if (parentInfo.childMade % 2 !== 0) {
          let x = [
            [parentX + parentInfo.boxRight, parentY + 100, 50, 50],
            [parentX + 25, parentY + 50, parentX + parentInfo.lineRight, parentY + 100]
          ]
          parentInfo.boxRight += 100
          parentInfo.lineRight += 100
          parentInfo.childMade++
          return x
        }
      }
  }

  setParent(event) {
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].container.children[0].name === event.target.name) {
        this.parentIdInput.val(event.target.name)
      }
    }
  }

  renderSpace() {
    this.stage.removeAllChildren()
    for (let i = 0; i < this.nodeList.length; i++) {
      this.howToRender[`${this.nodeList[i].id}`] = {
        childMade: 0,
        boxLeft: 100,
        boxRight: 100,
        lineLeft: 75,
        lineRight: 125
      }

      this.nodeList[i].render(this.nodeDim(this.nodeList[i].parentId))

      this.stage.addChild(this.nodeList[i].container)

      if (this.nodeList[i].parentId) {this.stage.addChild(this.nodeList[i].line)}
    }
    this.stage.update()
    this.howToRender = {}
  }

  render() {
    this.renderSpace()
  }
}
