class Node {
  constructor(title, body, parent) {
    this.title = title
    this.body = body
    this.parent = parent
  }

  render(array) {
    let a = new DrawNode(this)
    a.render(array)
  }
}
