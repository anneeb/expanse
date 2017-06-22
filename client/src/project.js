class Project {
  constructor(id, title, creator) {
    this.id = id
    this.title = title
    this.creator = creator
  }

  render() {
    return (
      `<div class="col s6 m6">
        <div class="card blue-grey darken-1" data-id=${this.id}>
          <div class="card-content white-text" data-id=${this.id}>
            <span class="card-title" data-id=${this.id}>${this.title}</span>
            <p data-id=${this.id}>Created by: ${this.creator}</p>
          </div>
        </div>
      </div>`
      )
  }
}

class ProjectList {
  constructor() {
    this.projects = []
    this.projectContainer = $('#projects')
  }

  renderProjects() {
    return this.projects.map(proj => proj.render()).join('')
  }

  createProjects(resp) {
    this.projects = resp.map(proj => new Project(proj.id, proj.title, proj.creator))
  }

  render() {
    this.projectContainer.html(this.renderProjects())
  }
}
