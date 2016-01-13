// jshint -W117
// jshint -W097
'use strict';

class ViewController {
  constructor() {

    this.canvas = document.getElementById('c')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.currentView = new StartView(this.canvas, this.ctx)

    setInterval(() => { this.update() }, 1000 / 60)
    this.render()

    $(window).on('transition', (event, ViewType) =>
      this.transition(ViewType)
    )

    $(window).resize(() => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    })

  }

  update() {
    this.currentView.update()
  }

  render() {
    this.currentView.render(this.ctx)
    requestAnimationFrame(() => { this.render() })
  }

  transition(ViewType) {
    this.currentView = new ViewType(this.canvas, this.ctx)
  }
}
