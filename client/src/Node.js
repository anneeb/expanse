class Node {
  constructor(title, body, parent) {
    this.title = title
    this.body = body
    this.parent = parent
  }

  render() {
    return `<li>${this.title}, ${this.body}</li>`
  }

  aRender(array) {
    let a = new DrawNode(this)
    a.render(array)
  }
}
