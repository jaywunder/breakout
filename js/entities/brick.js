// jshint -W117
// jshint -W097
'use strict';

import Entity from './entity.js'

export default class Brick extends Entity {
  constructor(x, y, color) {
    super('brick', {
      x, y,
      width: 80, height: 40,
      maxVel: 0, maxAcc: 0
    })

    this.body.graphics
      .beginFill(color || '#000000')
      .drawRect(this.x, this.y, this.width, this.height)
  }

  move() { return this } // bricks dont move haha

  collide(other) {
    this.acc = [0, 0]

    if (other instanceof Ball){
      this.kill()
      console.log('I\'m dead');
    }
  }
}