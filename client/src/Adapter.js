class Adapter {
  constructor () {
    this.baseUrl = 'http://localhost:3000/api/v1/'
    this.spaces = this.baseUrl + 'spaces/'
    this.nodes = this.baseUrl + 'nodes/'
  }

  getAllSpaces() {
    return fetch(this.spaces)
  }

  getSpaceById(id) {
    return fetch(this.spaces + id)
  }

  getNodeById(id) {
    return fetch(this.nodes + id)
  }

  createSpace(obj) {
    var form = new FormData
    form.append("space[title]", obj['title'])
    form.append("space[creator]", obj['creator'])
    return fetch(this.spaces, {
      method: 'post',
      body: form
    })
  }

  createNode(obj) {
    var form = new FormData
    form.append("node[title]", obj['title'])
    form.append("node[body]", obj['body'])
    form.append("node[parent_id]", obj['parent_id'])
    form.append("node[space_id]", obj['space_id'])

    return fetch(this.nodes, {
      method: 'post',
      body: form
    })
  }

  destroySpace(space_id) {
    return fetch(this.spaces + space_id, {method: 'delete'})
  }

  destroyNode(node_id) {
    return fetch(this.nodes + node_id, {method: 'delete'})
  }

}
