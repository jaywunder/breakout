// jshint -W117
// jshint -W097
'use strict';

import GameView from './views/game-view.js'
import StartView from './views/start-view.js'

export default class ViewController {
  constructor() {

    this.renderer = PIXI.autoDetectRenderer(
      window.innerWidth, window.innerHeight, { backgroundColor : 0xffffff }
    );
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();

    setInterval(() => { this.currentView.update() }, 1000 / 60)
    this.currentView = new GameView(this.stage, this.renderer)

    $(window).on('transition', (event, ViewType) =>
      this.transition(ViewType)
    )

    // TODO: Handle Resizing

    this.render()
  }

  render() {
    requestAnimationFrame( () => this.render() )
    this.renderer.render(this.stage);
  }

  transition(ViewType) {
    this.stage.removeAllChildren()
    this.currentView = new ViewType(this.stage)
  }
}
