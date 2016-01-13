// jshint -W117
// jshint -W097
'use strict';

class Brick extends Entity {
  constructor(x, y, color) {
    super({
      x, y,
      width: 40, height: 20,
      maxVel: 0, maxAcc: 0
    })

    this.color = color
  }

  render(ctx) {
    // console.log('I\'m getting rendered');
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  move() {  } // bricks dont move haha

  collide(other) {
    this.acc = [0, 0]

    if (other instanceof Ball){
      this.kill()
      console.log('I\'m dead');
    }
  }
}
