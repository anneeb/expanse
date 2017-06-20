$(document).ready(function(){
  const aSpace = new App()
})

class App {
  constructor() {
    this.space = new Space()
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
