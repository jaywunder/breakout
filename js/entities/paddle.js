// jshint -W117
// jshint -W097
'use strict';

class Paddle extends Entity {
  constructor() {
    super({
      x: document.getElementById('c').width / 2 - 50,
      y: document.getElementById('c').height - 50,
      maxVel: 20, maxAcc: 2,
      width: 180, height: 20,
    })

    this.body.graphics
      .beginFill('#000000')
      .drawRect(0, 0, this.width, this.height)

    $(window).on('key-left', (event) => {
      if (BREAKOUTRUNNING) this.onLeft()
    })

    $(window).on('key-right', (event) => {
      if (BREAKOUTRUNNING) this.onRight()
    })
  }

  onLeft() {
    this.x -= 15
  }

  onRight() {
    this.x += 15
  }

  render() {


    return this;
  }

  update() {

    return this;
  }
}
