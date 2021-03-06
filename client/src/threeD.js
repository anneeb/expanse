class ThreeD {
  constructor (space) {
    this.space = space
    this.mouse = new THREE.Vector2()
    this.nodes = null
    this.raycaster = null
    this.intersection = null
    this.renderer = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.stats = null
  }

  init() {
    this.nodes = []
    this.stats = new Stats
    this.stats.domElement.style.cssText = 'position: absolute; right: 0; top: 0; z-index: 100;'
	  document.body.appendChild(this.stats.domElement)

    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        clearColor: 0x000000
      })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    	this.renderer.shadowMap.enabled = true
    	this.renderer.shadowMapSoft = true
    	document.body.appendChild(this.renderer.domElement)
    }

    this.scene = new THREE.Scene();

  	this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000)
  	this.camera.position.set(100, 100, 100)
  	this.scene.add(this.camera)


	  this.controls = new THREE.OrbitControls(this.camera);
	  this.controls.minDistance = 10;
	  this.controls.maxDistance = 1000;

    this.raycaster = new THREE.Raycaster();

    $('body > canvas').dblclick(this.clickOnNode.bind(this))
    $('body > canvas').mousemove(this.onDocumentMouseMove.bind(this))
    // document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
  }

  clickOnNode() {
  	if (this.findIntersections() !== null) {
      $('body > canvas').off('dblclick')
      this.space.renderNodeForm(this.intersection.name, this.intersection.god)
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
			if (this.intersection != intersections[0].object) {
				this.intersection = intersections[0].object;
				if (this.nodes.find((node) => node.id === this.intersection.id)) {
					let found = this.nodes.find((node) => node.id === this.intersection.id)
					found.material.color.setHex(0xffff000)
					return this.intersection.id
        }
      }
    } else {
			this.nodes.forEach((node) => node.material.color.setHex(0xe6e6e6))
			return this.intersection
		}
  }

  animate() {
  	this.renderer.render(this.scene, this.camera);
  	this.findIntersections();
  	this.controls.update();
  	this.stats.update();
    requestAnimationFrame(this.animate.bind(this))
  }
}
//
