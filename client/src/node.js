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

    // Test Sprite
    var spritey = this.makeTextSprite(""+ this.title  + "", arr[2])
  	spritey.position.set(arr[0][0],arr[0][1],arr[0][2])
  	this.space.three.scene.add( spritey )

    // array format: [[nx, ny, nz], [px, py, pz], g]
  }


  makeTextSprite(message, fontSize){
    console.log(fontSize);

  	var fontface = "Arial";
  	var fontsize = fontSize
  	var borderThickness = 4;
  	var borderColor =  {r:100, g:100, b:255, a:1};
  	var backgroundColor = {r:255, g:100, b:100, a:1};
    // vvv Is desprected vvv
  	// var spriteAlignment = THREE.SpriteAlignment.topLeft;

  	var spriteAlignment = new THREE.Vector2( 1, -1 );

  	var canvas = document.createElement('canvas');
  	var context = canvas.getContext('2d');
  	context.font = "Bold " + fontsize + "px " + fontface;

  	// get size data (height depends only on font size)
  	var metrics = context.measureText( message );
  	var textWidth = metrics.width;

  	// text color
  	context.fillStyle = "rgba(255, 0, 0, 1)";

  	context.fillText( message, borderThickness, fontsize + borderThickness);

  	// canvas contents will be used for a texture
  	var texture = new THREE.Texture(canvas)
  	texture.needsUpdate = true;

  	var spriteMaterial = new THREE.SpriteMaterial(
  		{ map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
  	var sprite = new THREE.Sprite( spriteMaterial );
  	sprite.scale.set(100,50,1.0);
  	return sprite;
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
