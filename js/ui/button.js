// jshint -W117
// jshint -W097
'use strict';

import Entity from '../entities/entity.js';


export default class CanvasButton extends Entity {
  constructor(args) {
    super('', {})
    args = args || {}
    this.x         = args.x || 0
    this.y         = args.y || 0
    this.text      = args.text || 'Sample Text'
    this.font      = args.font || '32px monospace'
    this.textFill  = args.textFill || 0xffffff
    this.tintOn    = args.tintOn || 0xff7700
    this.tintOff   = args.tintOff || 0xe64703

    this.listeners = []
    this.canActivate = true

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

    for (let i in this.body.children) {
      let child = this.body.children[i]
      child.interactive = true;
      child.on('mousedown', (event) => { this.activate() })

      child.on('touchstart', (event) => { this.canActivate() })
    }
  }

  activate() {
    if ( this.canActivate ) for ( let i in this.listeners ) {
      this.listeners[i](event)
    }
    this.delayActivation()
  }

  delayActivation() {
    this.canActivate = false
    setTimeout( _ => this.canActivate = true, 200 )
  }

  onClick(func) {
    this.listeners.push(func)
  }
}
