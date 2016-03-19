// jshint -W117
// jshint -W097
'use strict';

import Entity from './entity.js'

export default class Paddle extends Entity {
  constructor(yOffset) {
    super('paddle', {
      x: document.getElementById('c').width / 2 - 50,
      y: document.getElementById('c').height - yOffset,
      maxVel: 20, maxAcc: 2,
      width: document.getElementById('c').width / 5,
      height: 20,
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
