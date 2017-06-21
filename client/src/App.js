$(document).ready(function(){
  const aSpace = new App()
  setCanvas()
})

class App {
  constructor() {
    this.space = new Space("Test", "Carl")
    this.nodeTitle = $('#node-title')
    this.nodeBody = $('#node-body')
    this.nodeParent = $('#node-parent')
    this.submitButton = $('#add')
    this.submitButton.click(this.onSubmit.bind(this))
  }

  onSubmit() {
    event.preventDefault()
    this.space.addNode(this.nodeTitle.val(), this.nodeBody.val(),
    this.nodeParent.val())
    this.nodeTitle.val('')
    this.nodeBody.val('')
    this.nodeParent.val('')
    this.render()
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
