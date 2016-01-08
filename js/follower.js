// jshint -W117
// jshint -W097
'use strict';

class Follower extends Entity {
  constructor(other) {
    super('follower', {
      x: 0, y: 0
    })
    this.other = other

    this.body.graphics
      .beginFill('#000000')
      .drawCircle(this.x, this.y, 10)
  }

  moveTo(other) {
    this.other = other
  }

  update() {
    this.pos = this.other.pos

    return this
  }
}
