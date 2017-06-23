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
        chi: 0,
        num: this.nodeList[i].numChild,
        del: 2 * Math.PI / this.nodeList[i].numChild
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
      let parentI = this.howToRender[`${parentId}`]

      // array format: [[nx, ny, nz], [px, py, pz], g]

      if (parentI.num === 1) {
        this.howToRender[`${parentId}`].chi++
        return ([
          [parentX, parentY - parentG * 1.5, parentZ],
          [parentX, parentY, parentZ],
          parentG / 1.5
        ])

      } else {
        let rad = parentI.del * parentI.chi
        let x = Math.cos(rad)
        let z = Math.sin(rad)

        let arr = ([
          [parentX + parentG * x, parentY - parentG * 1.5, parentZ + parentG * z],
          [parentX, parentY, parentZ],
          parentG / 1.5
        ])
        this.howToRender[`${parentId}`].chi ++
        return arr
      }
    }
  }
}
