// jshint -W117
// jshint -W097
'use strict';

import Entity from './entity.js'

export default class Paddle extends Entity {
  constructor(yOffset) {
    super('paddle', {
      x: document.querySelector('canvas').width / 2 - document.querySelector('canvas').width / 10,
      y: document.querySelector('canvas').height - yOffset,
      maxVel: 20, maxAcc: 2,
      width: document.querySelector('canvas').width / 5,
      height: 20,
    })

    $(window).on('key-left', (event) => { if (BREAKOUTRUNNING) this.onLeft() })
    $(window).on('key-right', (event) => { if (BREAKOUTRUNNING) this.onRight() })
  }

  createBody() {
    let paddleTexture = new PIXI.Texture.fromImage('assets/paddle-piece.png')
    for (let i = 0; i < this.width; i += 10){
      let paddleSprite = new PIXI.Sprite(paddleTexture)
      paddleSprite.x = i
      paddleSprite.tint = '0xaaaaaa'
      this.body.addChild(paddleSprite)
    }
  }

  onLeft() {
    this.x -= 15
  }

  onRight() {
    this.x += 15
  }
}
