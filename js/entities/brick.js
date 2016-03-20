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
    this.color = color
    this.brickSprite.tint = this.color
  }

  createBody() {
    let brickTexture = new PIXI.Texture.fromImage('assets/brick.png')
    this.brickSprite = new PIXI.Sprite(brickTexture)
    this.body.addChild(this.brickSprite)
  }

  move() {
    this.body.x = this.x;
    this.body.y = this.y;
    return this
  } // bricks dont move haha

  collide(other) {
    this.acc = [0, 0]

    if (other instanceof Ball){
      this.kill()
      console.log('I\'m dead');
    }
  }
}
