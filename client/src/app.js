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
    this.canvas = null

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
    this.addCanvas()
    this.setCanvas()
    this.space = new Space(json)
  }

  addCanvas() {
    this.main.html(`
      <canvas id="canvas" style="border:2px solid black;">
      Your Dumbass Browser Needs An Update - Give It A Try
      (Or If You Are Using InternetExplorer - Just Throw Out Your Computer And Get A New One...)
      </canvas>
      <button onClick="window.location.reload()">go home</button>
    `)
  }

  setCanvas() {
    let canvas = document.getElementById('canvas')
    let p = canvas.parentNode
    canvas.height = p.clientWidth * 0.8 * (canvas.height/canvas.width)
    canvas.width = p.clientWidth
  }

  getProjects() {
    this.spaceAdapter.getAllSpaces()
      .then(resp => resp.json())
      .then(json => this.projectList.createProjects(json))
      .then(() => this.projectList.render())
   }

}
