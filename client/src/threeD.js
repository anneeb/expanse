class ThreeD {
  constructor () {
    this.nodes = []
    this.mouse = new THREE.Vector2

    this.raycaster = null
    this.intersection = null
    this.renderer = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.stats = null
  }

  init() {
    this.stats = new Stats
    this.stats.domElement.style.cssText = 'position: absolute; right: 0; top: 0; z-index: 100;'
	  document.body.appendChild(this.stats.domElement)

    this.renderer = new THREE.WebGLRenderer({
      alpha: 1,
      antialias: true
      // clearColor: 0xffffff
    })
  	this.renderer.setSize(window.innerWidth, window.innerHeight)
  	this.renderer.shadowMap.enabled = true
  	this.renderer.shadowMapSoft = true
  	document.body.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene();

  	this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000)
  	this.camera.position.set(100, 100, 100)
  	this.scene.add(this.camera)


	  this.controls = new THREE.OrbitControls(this.camera);
	  this.controls.minDistance = 10;
	  this.controls.maxDistance = 1000;

    this.raycaster = new THREE.Raycaster();

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('click', this.clickOnNode, false);
  }

  clickOnNode() {
  	if (this.findIntersections() !== null) {
  		console.log(intersection.id); //REMEMBER TO GRAB BY NAME WHICH WILL BE OUR ID
  	}
  }

  onDocumentMouseMove(event) {
  	event.preventDefault();
  	this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  findIntersections() {
		this.raycaster.setFromCamera(this.mouse, this.camera);
		let intersections = this.raycaster.intersectObjects(this.nodes);

		if (intersections.length > 0) {
			if (intersection != intersections[0].object) {
				intersection = intersections[0].object;
				if (this.nodes.find((node) => node.id === intersection.id)) {
					let found = this.nodes.find((node) => node.id === intersection.id)
					found.material.color.setHex(0xffff000)
					return intersection.id
        }
      }
    } else {
			intersection = null;
			this.nodes.forEach((node) => node.material.color.setHex(0x00ff00))
			return intersection
		}
  }

  animate() {
  	this.renderer.render(this.scene, this.camera);
  	this.findIntersections();
  	this.controls.update();
  	this.stats.update();
    requestAnimationFrame(animate);
  }
}