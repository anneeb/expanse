class Node {
  constructor(title, body, parent) {
    this.title = title
    this.body = body
    this.parent = parent
  }

  render(array) {
    // console.log(`Title: ${this.title}`)
    // console.log(`Body: ${this.body}`)
    let a = new DrawNode(this)
    a.render(array)
  }
}
