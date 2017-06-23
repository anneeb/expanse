$(document).ready(function() {
  var app = new App
  app.getProjects()
})

class App {
  constructor() {
    this.spaceAdapter = new SpaceAdapter
    this.projectList = new ProjectList

    this.main = $('#main')

    this.projects = $('#projects')
    this.projects.click(this.selectProject.bind(this))

    this.newSpaceButton = $('#new-space')
    this.newTitle = $('#new-title')
    this.newCreator = $('#new-creator')

    this.newSpaceButton.click(this.createProject.bind(this))

    this.space = null
  }

  selectProject() {
    if (event.target.classList[0] === "material-icons") {
      this.spaceAdapter.destroySpace(event.target.dataset.id)
        .then(() => this.getProjects())
    } else {
      this.spaceAdapter.getSpaceById(event.target.dataset.id)
        .then(resp => resp.json())
        .then(json => this.setSpace(json))
    }
  }

  createProject() {
    this.spaceAdapter.createSpace({
      title: this.newTitle.val(),
      creator: this.newCreator.val()
    })
      .then(resp => resp.json())
      .then(json => this.setSpace(json.data))
  }

  setSpace(json){
    $('body').html(this.spaceHTML(json))
    $('#home').click(() => window.location.reload())

    this.space = new Space(json)
  }

  getProjects() {
    this.projects.html('')
    this.spaceAdapter.getAllSpaces()
      .then(resp => resp.json())
      .then(json => this.projectList.createProjects(json))
      .then(() => this.projectList.render())
   }

   spaceHTML(json){
    return (`
      <div style="position: absolute; top: 10px; left: 10px">
      <a class="btn-floating btn-large waves-effect waves-light" id="home"><i class="material-icons">store</i></a></div>

      <h2 class="white-text" style="position: absolute; bottom: 10px; left: 40px">${json.title}</h2>
    `)
   }

}
