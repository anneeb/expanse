class NodeForm {
  constructor(space) {
    this.space = space
    this.canvas = $('#canvas')
    this.nodeAdapter = new NodeAdapter
  }

  formHTML() {
    return(`
      <div class="card blue-grey" style="
          width: ${this.canvas.width() * .6}px;
          height: 150px;
          top: ${-this.canvas.height()}px;
          left: ${this.canvas.width() / 2 - this.canvas.width() * .3}px
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

  render(parentId) {
    if (!$('#form')[0]) {
      this.renderNewForm(parentId)
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

  renderNewForm(parentId) {
    $('#main').append(this.formHTML())
    if (parentId) {
      this.renderParentForm(parentId)
      $("#remove").click(() => this.deleteNodeFromForm(parentId))
      $("#cancel").click(() => $('#form').remove())
    }
  }

  renderParentForm(parentId) {
    $('#form-info').append(`
      <a class="btn-floating halfway-fab waves-effect waves-light left red" id="remove"><i class="material-icons">delete</i></a>
      <a class="btn-floating halfway-fab waves-effect waves-light left blue-grey lighten-2" id="cancel"style="left: ${this.canvas.width() * .3 - 18}px">
      <i class="material-icons">not_interested</i></a>
    `)
  }

  deleteNodeFromForm(id) {
    $('#form').remove()
    this.nodeAdapter.destroyNode(id)
      .then(() => this.space.fetchAndRenderNodes())
  }

}
