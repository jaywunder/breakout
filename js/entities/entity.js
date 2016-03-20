// jshint -W117
// jshint -W097
'use strict'

export default class Entity {
  constructor(type, opts) {
    this.type = type
    this.id = this.type + '#' + (Math.floor(Math.random() * 10000))
    this.alive = true

    this.pos = [opts.x  || 0, opts.y  || 0]
    this.vel = [opts.vx || 0, opts.vy || 0]
    this.acc = [opts.ax || 0, opts.ay || 0]
    this.size = [opts.width || 0, opts.height || 0]
    this.maxVel = opts.maxVel || 15;
    this.maxAcc = opts.maxAcc || 1;

    this.body = new PIXI.Container();

    this.createBody()
  }

  get x() { return this.pos[0] }
  get y() { return this.pos[1] }
  set x(value) { this.pos[0] = value }
  set y(value) { this.pos[1] = value }

  get vx() { return this.vel[0] }
  get vy() { return this.vel[1] }
  set vx(value) { this.vel[0] = value }
  set vy(value) { this.vel[1] = value }

  get ax() { return this.acc[0] }
  get ay() { return this.acc[1] }
  set ax(value) { this.acc[0] = value }
  set ay(value) { this.acc[1] = value }

  get width()  { return this.size[0] }
  get height() { return this.size[1] }
  set width(value)  { this.size[0] = value }
  set height(value) { this.size[1] = value }

  render() {


    return this
  }

  update() {


    return this
  }

  collide(other) {

  }

  kill() {
    this.alive = false
  }

  move() {
    if (this.vx > this.maxVel) this.vx = this.maxVel
    if (this.vy > this.maxVel) this.vy = this.maxVel
    if (this.vx < -this.maxVel) this.vx = -this.maxVel
    if (this.vy < -this.maxVel) this.vy = -this.maxVel

    if (this.ax > this.maxAcc) this.ax = this.maxAcc
    if (this.ay > this.maxAcc) this.ay = this.maxAcc
    if (this.ax < -this.maxAcc) this.ax = -this.maxAcc
    if (this.ay < -this.maxAcc) this.ay = -this.maxAcc

    this.x += this.vx
    this.y += this.vy

    this.vx += this.ax
    this.vy += this.ay

    this.body.x = this.x;
    this.body.y = this.y;

    return this
  }
}
