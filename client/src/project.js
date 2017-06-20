class Project {
  constructor(id, title, creator) {
    this.id = id
    this.title = title
    this.creator = creator
  }

  render() {
    return (
      `<div class="col s6 m6" data-id=${this.id}>
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">${this.title}</span>
            <p>Created by: ${this.creator}</p>
          </div>
        </div>
      </div>`
      )
  }
}

class ProjectList {
  constructor() {
    this.adapter = new Adapter()
    this.projects = []
    this.projectContainer = $('#projects')
  }

  renderProjects() {
    return this.projects.map(p => p.render()).join('')
  }

  fetchProjects() {
    this.adapter.getAllSpaces()
      .then(r => this.parseJson(r))
      .then(r => this.createProjects(r))
      .then(this.render.bind(this))
  }

  parseJson(resp) {
    return resp.json()
  }

  createProjects(resp) {
    this.projects = resp.map(p => new Project(p.id, p.title, p.creator))
  }

  render() {
    this.projectContainer.html(this.renderProjects())
  }
}
