class Space {
  constructor(json) {
    this.id = json.id
    this.title = json.title
    this.creator = json.creator
    this.nodeList = []
    this.howToRender = {}
    this.three = new ThreeD(this)
    this.spaceAdapter = new SpaceAdapter
    this.nodeForm = new NodeForm(this)
    this.addNodesFromJson(json)
    this.render()
  }

  fetchAndRenderNodes() {
    this.nodeList = []
    this.spaceAdapter.getSpaceById(this.id)
      .then(resp => resp.json())
      .then(json => this.addNodesFromJson(json))
      .then(() => this.render())
  }

  addNodesFromJson(json){
    if (json.nodes) {
      json.nodes.forEach(node => this.addNode(node))
    }
  }

  addNode(obj) {
    var newNode = new Node(this, obj)
    this.nodeList.push(newNode)
  }

  renderNodeForm(parentId, isGod) {
    this.nodeForm.render(parentId, isGod)
  }

  render() {
    this.renderSpace()
    if (this.nodeList.length === 0) {
      this.renderNodeForm(null, true)
    }
  }

  renderSpace() {
    this.three.init()
    for (let i = 0; i < this.nodeList.length; i++) {
      this.howToRender[`${this.nodeList[i].id}`] = {
        childMade: 0,
        boxRight: 20,
        boxLeft: 20
      }
      this.nodeList[i].render(this.nodeDim(this.nodeList[i].parentId))
    }
    this.three.animate()
    this.howToRender = {}
  }

  nodeDim(parentId) {
    if (!parentId) {
      return [[0, 0, 0], [0, 0, 0], 20]
    } else {
      let currentNodeParent = this.nodeList.find(node => node.id === parentId)
      let parentG = currentNodeParent.position.g
      let parentX = currentNodeParent.position.x
      let parentY = currentNodeParent.position.y
      let parentZ = currentNodeParent.position.z
      let parentInfo = this.howToRender[`${parentId}`]

      // array format: [[nx, ny, nz], [px, py, pz], g]

      if (parentInfo.childMade === 0) {
          this.howToRender[`${parentId}`].childMade++
          return ([
            [parentX, parentY - 20, 0],
            [parentX, parentY, 0],
            parentG * 0.5
          ])

      } else if (parentInfo.childMade % 2 === 0) {
          let x = ([
            [parentX - parentInfo.boxLeft, parentY - 20, 0],
            [parentX, parentY, 0],
            parentG * 0.5
          ])
          parentInfo.boxLeft += 20
          parentInfo.childMade++
          return x

      } else if (parentInfo.childMade % 2 !== 0) {
        let x = ([
          [parentX + parentInfo.boxRight, parentY - 20, 0],
          [parentX, parentY, 0],
          parentG * 0.5
        ])
        parentInfo.boxRight += 20
        parentInfo.childMade++
        return x
      }
    }
  }
}
