// jshint -W117
// jshint -W097
'use strict';

class CanvasButton {
  constructor(parent, args) {
    this.parent      = parent
    this.textColor   = args.textColor || '#FFFFFF'
    this.x           = args.x || 0
    this.y           = args.y || 0
    this.text        = args.text || 'Sample Text'
    this._centeredX  = args.centeredX || false
    this._centeredY  = args.centeredY || false
    this.font        = args.font || '12px Cursive'
    this.fillColor   = args.fillColor || 'rgba(0, 0, 0, 0.1)'
    this.strokeWidth = args.strokeWidth || 5
    this.capStyle    = args.capStyle || 'round'

    this.bounds = this.text.getBounds()

    this.draw()
    return this
  }

  onClick(func) {
    this.parent.addEventListener('click', (event) => {
      if (event.pageX > this.x &&
          event.pageX < this.x + this.width &&
          event.pageY > this.y &&
          event.pageY > this.y + this.height)
        {

        console.log('click!');
        func(event)

      }
    }, false)
  }

  draw() {
    this.parent.removeChild(this.text)
    if (this._centeredX) {
      this.text.x = (document.getElementById('c').width / 2) - (this.text.getMeasuredWidth() * 1.25)
    } else {
      this.text.x = this.x // - (this.text.getMeasuredWidth() * 1.25)
    }

    if (this._centeredY) {
      this.text.y = (document.getElementById('c').height / 2) - (this.text.getMeasuredHeight() * 1.25)
    } else {
      this.text.y = this.y // - (this.text.getMeasuredHeight() * 1.25)
    }

    this.border.graphics
      .clear()
    this.border.graphics
      .s(this.textColor)
      .f(this.fillColor)
      .ss(this.strokeWidth, this.capStyle)
      .rr(
        this.text.x - 15,
        this.text.y + 5,
        this.text.getMeasuredWidth() + 30,
        this.text.getMeasuredHeight() + 15,
        3, 3, 3, 3 // CHANGE ROUNDED CORNERS HERE IF YOU NEED TO IN THE FUTURE
      )

    this.parent.addChild(this.border)
    this.parent.addChild(this.text)
    this.parent.update()
  }

  get width() {
    // from this question http://stackoverflow.com/a/118251
    var test = document.getElementById("text-width")
    test.innerHTML = this.text
    test.style.fontSize = this.font.split(' ')[0]
    test.style.fontFamily = this.font.split(' ')[1]
    return (test.clientWidth + 1 + (2 * this.strokeWidth) + (test.clientWidth / 5))
  }

  get height() {
    var test = document.getElementById("text-width")
    test.innerHTML = this.text
    test.style.fontSize = this.font.split(' ')[0]
    test.style.fontFamily = this.font.split(' ')[1]
    return (test.clientHeight + 1 + (2 * this.strokeWidth) + (test.clientHeight / 5))
  }

  set width(value) { new Error('can\'t set width of CanvasText object') }
  set height(value) { new Error('can\'t set height of CanvasText object') }

  centeredX() {
    this._centeredX = true
    return this
  }

  uncenteredX() {
    this._centeredX = false
    return this
  }

  centeredY() {
    this._centeredY = true
    return this
  }

  uncenteredY() {
    this._centeredY = false
    return this
  }
}
