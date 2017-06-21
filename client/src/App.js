$(document).ready(function(){
  const aSpace = new App()
  setCanvas()
})

class App {
  constructor() {
    this.space = new Space("Test", "Carl")
    this.nodeTitle = $('#node-title')
    this.nodeBody = $('#node-body')
    this.nodeParent = $('#node-parent-id')
    this.submitButton = $('#add')
    this.adapter = new Adapter
    this.submitButton.click(this.onSubmit.bind(this))
  }

  onSubmit() {
    event.preventDefault()
    this.adapter.createNode({
      title: this.nodeTitle.val(),
      body: this.nodeBody.val(),
      parent_id: this.nodeParent.val(),
      space_id: this.space.id
    })
      .then(resp => resp.json())
      .then(() => this.space.fetchNodes())

    this.nodeTitle.val('')
    this.nodeBody.val('')
    this.nodeParent.val('')
  }

  render() {
    this.space.render()
  }
}

function setCanvas(){
 var canvasNode = document.getElementById('space')

 var pw = canvasNode.parentNode.clientWidth
 var ph = canvasNode.parentNode.clientHeight

 canvasNode.height = pw * 0.8 * (canvasNode.height/canvasNode.width)
 canvasNode.width = pw * 1
 canvasNode.style.top = (ph-canvasNode.height)/2 + "px"
 canvasNode.style.left = (pw-canvasNode.width)/2 + "px"
}
