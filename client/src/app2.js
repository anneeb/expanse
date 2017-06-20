$(document).ready(function() {
  let app = new App
  app.render()

})

class App {
  constructor() {
    this.main = $('#main')
    this.projects = $('#projects')
    this.projectSelector = $('#project-selector')
    this.canvas =
    this.projectList = new ProjectList

    this.projects.click(this.onClick.bind(this))
  }

  render() {
    this.projectList.fetchProjects()
  }

  onClick() {
    console.log(event)
    this.main.html(`<canvas id="space" width="1000" height="1000" style="border:2px solid black;">
      Your Dumbass Browser Needs An Update - Give It A Try (Or If You Are Using InternetExplorer - Just Throw Out Your Computer And Get A New One...)
    </canvas>`)
  }
}
