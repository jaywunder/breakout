// jshint -W117
// jshint -W097
'use strict';

export default class View {
  constructor(stage, renderer) {
    this.stage = stage
    this.renderer = renderer
    this.entities = []
    this.view = this.renderer.view
  }

  update() {
    for (let i in this.entities) {
      this.entities[i]
        .update()
        .move();
    }
  }
}
