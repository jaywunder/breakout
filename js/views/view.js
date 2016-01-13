// jshint -W117
// jshint -W097
'use strict';

class View {
  constructor(canvas) {
    this.canvas = canvas
    this.renderables = []
  }

  update() {

  }

  render(ctx) {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i in this.renderables) {
      this.renderables[i].render(ctx)
    }
  }
}
