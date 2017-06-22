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

  drawBox(arr) {
    let geometry = new THREE.BoxGeometry(10, 10, 10);
    let node = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
    )

    node.name = this.id

    this.position.x = arr[0][0]
    this.position.y = arr[0][1]
    this.position.z = arr[0][2]

    node.position.set(arr[0][0], arr[0][1], arr[0][2]);
    node.castShadow = true;
    node.receiveShadow = true;

    this.space.three.scene.add(node);
    this.space.three.nodes.push(node);

    // array format: [[x, y, z], [startX, startY, startZ], [endX, endY, endz]]
  }

  drawLine(arr) {
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
