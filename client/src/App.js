$(document).ready(function(){
  const aSpace = new App()
})

class App {
  constructor() {
    this.nodeName = $('#node-name')
    this.nodeBody = $('#node-body')
    this.nodeParent = $('#node-parent')
    this.submitButton = $('#add')
    this.submitButton.click(this.onSubmit.bind(this))
    this.commentSpaceContainer = $('#space-list')
    this.space = new Space()
  }

  onSubmit() {
    event.preventDefault()
    this.space.addNode(this.nodeName.val(), this.nodeBody.val(), this.nodeParent.val())
    this.nodeName.val('')
    this.nodeBody.val('')
    this.nodeParent.val('')
    this.render()
  }

  render() {
    this.commentSpaceContainer.html(this.space.render())
  }
}
