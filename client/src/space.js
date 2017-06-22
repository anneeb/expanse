class Space {
  constructor(json) {
    this.id = json.id
    this.title = json.title
    this.creator = json.creator

    this.nodeList = []
    this.howToRender = {}

    this.three = new ThreeD

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

  setParent(event) {
    let parentId
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].container.children[0].name === event.target.name) {
        parentId = event.target.name
      }
    }
    this.renderNodeForm(parentId)
  }

  renderNodeForm(parentId) {
    this.nodeForm.render(parentId)
  }

  render() {
    this.renderSpace()
    if (this.nodeList.length === 0) {
      this.renderNodeForm()
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
      return [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    } else {
      let currentNodeParent = this.nodeList.find(node => node.id === parentId)
      let parentX = currentNodeParent.position.x
      let parentY = currentNodeParent.position.y
      let parentZ = currentNodeParent.position.z
      let parentInfo = this.howToRender[`${parentId}`]

      // array format: [[nx, ny, nz], [px, py, pz]]

      if (parentInfo.childMade === 0) {
          this.howToRender[`${parentId}`].childMade++
          return ([
            [parentX, parentY - 20, 0],
            [parentX, parentY, 0]
          ])

      } else if (parentInfo.childMade % 2 === 0) {
          let x = ([
            [parentX - parentInfo.boxLeft, parentY - 20, 0],
            [parentX, parentY, 0],
          ])
          parentInfo.boxLeft += 20
          parentInfo.childMade++
          return x

      } else if (parentInfo.childMade % 2 !== 0) {
        let x = ([
          [parentX + parentInfo.boxRight, parentY - 20, 0],
          [parentX, parentY, 0],
        ])
        parentInfo.boxRight += 20
        parentInfo.childMade++
        return x
      }
    }
  }
}
