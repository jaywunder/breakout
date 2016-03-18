// jshint -W117
// jshint -W097
'use strict';

class Ball extends Entity {
  constructor(x, y, paddle) {
    super('ball', {
      x, y,
      vx: 15, vy: 15,
      width: 15, height: 15
    })
    this.paddle = paddle
    this.isFollowing = true

    this.body.graphics
      .beginFill("#dd520d")
      .drawCircle(this.width / 2, this.width / 2, this.width)

    // TODO: change to "$(window).one"
    $(window).on('key-space', () => {
      this.isFollowing = false
      this.vx = this.paddle.vx
      this.vy = -15
    })
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
