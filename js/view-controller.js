// jshint -W117
// jshint -W097
'use strict';

import GameView from './views/game-view.js'
import StartView from './views/start-view.js'

export default class ViewController {
  constructor() {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      backgroundColor: 0xffffff
    });
    document.body.appendChild(this.renderer.view);

    this.loadAssets()
    // TODO: Handle Resizing
  }

  loadAssets() {
    let loader = new PIXI.loaders.Loader();

    loader.add('ball', 'assets/ball.png')
    loader.add('brick', 'assets/brick.png')
    loader.add('bunny', 'assets/bunny.png')
    loader.add('button-left', 'assets/button-left.png')
    loader.add('button-right', 'assets/button-right.png')
    loader.add('button-middle', 'assets/button-middle.png')
    loader.add('paddle-piece', 'assets/paddle-piece.png')
    loader.once('complete', () => this.onAssetsLoaded())
    loader.load();
  }

  onAssetsLoaded() {
    this.currentView = new GameView(this.stage, this.renderer)
    setInterval(() => { this.currentView.update() }, 1000 / 60)
    $(window).on('transition', (event, ViewType) => this.transition(ViewType) )

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
