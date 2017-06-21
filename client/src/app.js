$(document).ready(function() {
  let app = new App
  app.render()

})

class App {
  constructor() {
    this.adapter = new Adapter
    this.main = $('#main')
    this.projects = $('#projects')

    this.projectList = new ProjectList

    this.projects.click(this.selectProject.bind(this))

    this.newSpaceButton = $('#new-space')
    this.newTitle = $('#new-title')
    this.newCreator = $('#new-creator')

    this.newSpaceButton.click(this.createProject.bind(this))

  }

  render() {
    this.projectList.fetchProjects()
  }

  setSpace(json){
    this.main.html(
      `<canvas id="space" style="border:2px solid black;">
      Your Dumbass Browser Needs An Update - Give It A Try
      (Or If You Are Using InternetExplorer - Just Throw Out Your Computer And Get A New One...)
      </canvas>`
    )
    this.setCanvas()
    this.space = new Space(json.id, json.title, json.creator)
    this.space.fetchNodes()
  }

  selectProject() {
    this.adapter.getSpaceById(event.target.dataset.id)
      .then(resp => resp.json())
      .then(json => this.setSpace(json))
  }

  createProject() {
    this.adapter.createSpace({
      title: this.newTitle.val(),
      creator: this.newCreator.val()
    })
      .then(resp => resp.json())
      .then(json => this.setSpace(json.data))
  }

  setCanvas() {
    var canvasNode = document.getElementById('space')

    var pw = canvasNode.parentNode.clientWidth
    var ph = canvasNode.parentNode.clientHeight

    canvasNode.height = pw * 0.8 * (canvasNode.height/canvasNode.width)
    canvasNode.width = pw * 1
    canvasNode.style.top = (ph-canvasNode.height)/2 + "px"
    canvasNode.style.left = (pw-canvasNode.width)/2 + "px"
  }

}
