// jshint -W117
// jshint -W097
'use strict';

var scaleX = 1
function sX(x) { return x * scaleX }

var scaleY = 1
function sY(y) { return y * scaleX }

export default class CanvasButton {
  constructor(args) {
    args = args || {}
    this.x         = args.x || 0
    this.y         = args.y || 0
    this.text      = args.text || 'Sample Text'
    this.font      = args.font || '32px monospace'
    this.textFill  = args.textFill || 0 // 0xffffff
    this.tintOn    = args.tintOn || 0xff7700
    this.tintOff   = args.tintOff || 0xe64703

    this.body = new PIXI.Container()
    let text = new PIXI.Text(this.text, { fill : this.textFill })
    let left = new PIXI.Sprite.fromImage('assets/button-left.png')
    let right = new PIXI.Sprite.fromImage('assets/button-right.png')
    let middle = PIXI.Texture.fromImage('assets/button-middle.png')

    left.tint = this.tintOn
    right.tint = this.tintOn
    this.body.addChild(left)

    let scaleX = text.width / left.width * 1.2
    let scaleY = text.height / left.height * 1.2
    // 200 is the width of the middle piece image
    // 100 is the width of the left and right curves
    for (let i = 100 * scaleX / 10; i < text.width; i += 200 * scaleX) {
      // console.log(i);
      let piece = new PIXI.Sprite(middle)
      piece.tint = this.tintOn
      piece.position.set(this.x + i, this.y)
      piece.scale.set(scaleX, scaleY)
      this.body.addChild(piece)
    }
    left.position.x = -100 * scaleX / 10
    right.position.x = text.width + 400 * (scaleX / 10)
    text.position.x = (right.position.x - left.position.x) / 2 - text.width / 2
    this.body.addChild(right)
    this.body.addChild(text)

    left.scale.set(scaleX / 10, scaleY)
    right.scale.set(scaleX / 10, scaleY)
  }

  onClick(func) {
    this.border.addEventListener('click', func)
  }
}
