class NodeForm {
  constructor(space) {
    this.space = space
    this.body = $('body')
    this.nodeAdapter = new NodeAdapter
  }

  formHTML() {
    return(`
      <div class="card blue-grey" style="
          position: absolute;
          z-index: 100;
          width: ${this.body.width() * .6}px;
          height: 150px;
          top: ${this.body.height() / 2 - 150}px;
          left: ${this.body.width() / 2 - this.body.width() * .3}px
        " id="form">
        <form class="card-content white-text" id="form-info">
          <input class="card-title" type="text" name="title" value="" id="title" placeholder="Title" required>
          <input type="text" name="creator" value="" id="body" placeholder="Body">
          <button class="btn-floating halfway-fab waves-effect waves-light green" type="submit">
            <i class="material-icons">add</i>
          </button>
        </form>
      </div>
    `)
  }

  render(parentId, isGod) {
    if (!$('#form')[0]) {
      this.renderNewForm(parentId, isGod)
      $("#form-info").submit(() => this.addNodeFromForm(parentId))
    }
  }

  addNodeFromForm(parentId) {
    event.preventDefault()
    let title = $('#title').val()
    let body = $('#body').val()
    $('#form').remove()
    this.nodeAdapter.createNode({
      title: title,
      body: body,
      parent_id: parentId,
      space_id: this.space.id
    })
      .then(() => this.space.fetchAndRenderNodes())
  }

  renderNewForm(parentId, isGod) {
    this.body.prepend(this.formHTML())
    if (parentId) {
      this.renderCancel()
      $("#cancel").click(() => {
        $('#form').remove()
        $('body > canvas').dblclick(() => this.space.three.clickOnNode())
      })
    }
    if (!isGod) {
      this.renderDelete()
      $("#remove").click(() => this.deleteNodeFromForm(parentId))
    }
  }

  renderCancel() {
    $('#form-info').append(`
      <a class="btn-floating halfway-fab waves-effect waves-light left blue-grey lighten-2" id="cancel"style="left: ${this.body.width() * .3 - 18}px">
      <i class="material-icons">not_interested</i></a>
    `)
  }

  renderDelete() {
    $('#form-info').append(`
      <a class="btn-floating halfway-fab waves-effect waves-light left red" id="remove"><i class="material-icons">delete</i></a>
    `)
  }

  deleteNodeFromForm(id) {
    let input = confirm('Are you sure you want to delete this node and all of its children? This action cannot be undone.')
    if (input) {
      $('#form').remove()
      this.nodeAdapter.destroyNode(id)
        .then(() => this.space.fetchAndRenderNodes())
    } else {
      $('#form').remove()
      $('body > canvas').dblclick(() => this.space.three.clickOnNode())
    }
  }

}
