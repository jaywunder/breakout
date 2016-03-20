// jshint -W117
// jshint -W097
'use strict';

import Entity from './entity.js'

export default class Ball extends Entity {
  constructor(x, y, paddle) {
    super('ball', {
      x, y,
      vx: 15, vy: 15,
      width: 15, height: 15
    })
    this.paddle = paddle
    this.isFollowing = true

    // TODO: change to "$(window).one"
    $(window).one('key-space', () => {
      this.isFollowing = false
      this.vx = this.paddle.vx
      this.vy = -15
    })
  }

  createBody() {
    let ballTexture = new PIXI.Texture.fromImage('assets/ball.png')
    let ballSprite = new PIXI.Sprite(ballTexture)
    let scale = ballSprite.width / this.width
    ballSprite.scale.set(scale * 2)
    ballSprite.tint = 0x000000
    this.body.addChild(ballSprite)
  }

  update() {
    if (this.isFollowing) {
      this.x = this.paddle.x + (this.paddle.width / 2) - (this.width)
      this.y = this.paddle.y - (this.paddle.height * 2)
      this.acc = [0, 0]
      this.vel = [0, 0]
    }
    return this;
  }
}
