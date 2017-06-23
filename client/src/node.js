class Node {
  constructor(space, obj) {
    this.space = space
    this.id = obj.id
    this.parentId = obj.parent_id
    this.title = obj.title
    this.body = obj.body
    this.spaceId = obj.space_id
    this.numChild = obj.num_child
    this.position = {}
  }

  // array format: [[nx, ny, nz], [px, py, pz], g]

  drawBox(arr) {
    let geometry = new THREE.BoxGeometry(arr[2], arr[2], arr[2]);
    let node = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({color: 0xe6e6e6})
    )

    node.name = this.id

    if (!this.parentId) {
      node.god = true
    } else {
      node.god = false
    }

    this.position.g = arr[2]

    this.position.x = arr[0][0]
    this.position.y = arr[0][1]
    this.position.z = arr[0][2]

    node.position.set(arr[0][0], arr[0][1], arr[0][2]);
    node.castShadow = true;
    node.receiveShadow = true;

    this.space.three.scene.add(node);
    this.space.three.nodes.push(node);

    // array format: [[nx, ny, nz], [px, py, pz], g]
  }

  drawLine(arr) {
    let material = new THREE.LineBasicMaterial({color: 0x00ffb3})
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(arr[1][0], arr[1][1], arr[1][2]))
    geometry.vertices.push(new THREE.Vector3(arr[0][0], arr[0][1], arr[0][2]))

    let line = new THREE.Line(geometry, material)
    this.space.three.scene.add(line)
  }

  render(array) {
    this.drawBox(array)
    this.drawLine(array)
  }
}
