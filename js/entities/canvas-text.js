// jshint -W117
// jshint -W097
'use strict';

class CanvasText extends Entity {
  constructor(opts) {
    super(opts)

    this.text = opts.text || 'no text chosen'
    this.font = opts.font || '48px monospace'
    this.fillStyle = opts.fillStyle || 'black'
  }

  render(ctx) {
    ctx.fillStyle = this.fillStyle
    ctx.font = this.font
    ctx.fillText(this.text, this.x, this.y + this.height)
  }

  get width() {
    // from this question http://stackoverflow.com/a/118251
    var test = document.getElementById("text-width")
    test.innerHTML = this.text
    test.style.fontSize = this.font.split(' ')[0]
    test.style.fontFamily = this.font.split(' ')[1]
    return (test.clientWidth + 1)
  }

  get height() {
    var test = document.getElementById("text-width")
    test.innerHTML = this.text
    test.style.fontSize = this.font.split(' ')[0]
    test.style.fontFamily = this.font.split(' ')[1]
    return (test.clientHeight + 1)
  }

  set width(value) { new Error('can\'t set width of CanvasText object') }
  set height(value) { new Error('can\'t set height of CanvasText object') }
}
