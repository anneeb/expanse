class Space {
  constructor(id, title, creator) {
    this.id = id
    this.title = title
    this.creator = creator
    this.adapter = new Adapter
    this.nodeList = []
    this.howToRender = {}
    this.nextNode = 0
    this.stage = new createjs.Stage("space")
    this.stage.enableDOMEvents(true)
    this.stage.on("click", this.setParent.bind(this))
  }

  fetchNodes() {
    this.adapter.getSpaceById(this.id)
      .then(resp => resp.json())
      .then(json => {
        this.nodeList = []
        json.nodes.forEach(node => this.addNode(node))
      })
      .then(() => {
        this.render()
        if (this.nodeList.length === 0) {
          this.renderForm()
        }})
  }

  addNode(obj) {
    var newNode = new Node(this, obj.id, obj.title, obj.body, obj.space_id, obj.parent_id, obj.num_child)
    this.nodeList.push(newNode)
  }

  nodeDim(parentId) {
    if (!parentId) {
      return [[this.stage.canvas.width / 2 - 25, 5, 50, 50], [0]]
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
    let parentId
    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].container.children[0].name === event.target.name) {
        parentId = event.target.name
      }
    }
    this.renderForm(parentId)
  }

  renderForm(parentId) {
    if (!$('#form')[0]) {
      $('#main').append(`
        <div class="card blue-grey" style="
            width: ${this.stage.canvas.width * .6}px;
            height: 150px;
            top: ${-this.stage.canvas.height}px;
            left: ${this.stage.canvas.width / 2 - this.stage.canvas.width * .3}px
          " id="form">
          <form class="card-content white-text" id="form-info">
            <input class="card-title" type="text" name="title" value="" id="title" placeholder="Title" required>
            <input type="text" name="creator" value="" id="body" placeholder="Body">
            <button class="btn-floating halfway-fab waves-effect waves-light green" type="submit" value="Submit">
              <i class="material-icons">add</i>
            </button>
          </form>
        </div>
        `)



      $("#form-info").submit(this.addNodeFromForm.bind(this, parentId))

      if (parentId) {
        $('#form-info').append(`
          <a class="btn-floating halfway-fab waves-effect waves-light left red" id="remove"><i class="material-icons">delete</i></a>
          <a class="btn-floating halfway-fab waves-effect waves-light left blue-grey lighten-2" id="cancel"style="left: ${this.stage.canvas.width * .3 - 18}px">
          <i class="material-icons">not_interested</i></a>
        `)
        $("#remove").click(this.deleteNodeFromForm.bind(this, parentId))

        $("#cancel").click(() => $('#form').remove())
      }
    }
  }

  addNodeFromForm(parentId) {
    event.preventDefault()
    let title = $('#title').val()
    let body = $('#body').val()
    $('#form').remove()
    this.adapter.createNode({
      title: title,
      body: body,
      parent_id: parentId,
      space_id: this.id
    })
      .then(resp => resp.json())
      .then(() => this.fetchNodes())

  }

  deleteNodeFromForm(id) {
    $('#form').remove()
    this.adapter.destroyNode(id)
      .then(() => this.fetchNodes())
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
