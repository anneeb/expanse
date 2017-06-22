$(document).ready(function() {
  app = new App
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
    this.spaceAdapter.getSpaceById(event.target.dataset.id)
      .then(resp => resp.json())
      .then(json => this.setSpace(json))
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
    $('body').html('')
    this.space = new Space(json)
  }

  getProjects() {
    this.spaceAdapter.getAllSpaces()
      .then(resp => resp.json())
      .then(json => this.projectList.createProjects(json))
      .then(() => this.projectList.render())
   }

}
