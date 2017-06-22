class SpaceAdapter {
  constructor () {
    this.url = 'http://localhost:3000/api/v1/spaces/'
  }

  getAllSpaces() {
    return fetch(this.url)
  }

  getSpaceById(space_id) {
    return fetch(this.url + space_id)
  }

  createSpace(obj) {
    let form = new FormData
    form.append("space[title]", obj['title'])
    form.append("space[creator]", obj['creator'])
    return fetch(this.url, {
      method: 'post',
      body: form
    })
  }

  destroySpace(space_id) {
    return fetch(this.url + space_id, {method: 'delete'})
  }

}

class NodeAdapter {
  constructor () {
    this.url = 'http://localhost:3000/api/v1/nodes/'
  }

  getNodeById(node_id) {
    return fetch(this.url + node_id)
  }

  createNode(obj) {
    let form = new FormData
    form.append("node[title]", obj['title'])
    form.append("node[body]", obj['body'])
    form.append("node[parent_id]", obj['parent_id'])
    form.append("node[space_id]", obj['space_id'])

    return fetch(this.url, {
      method: 'post',
      body: form
    })
  }

  destroyNode(node_id) {
    return fetch(this.url + node_id, {method: 'delete'})
  }

}
