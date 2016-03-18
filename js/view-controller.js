// jshint -W117
// jshint -W097
'use strict';

class ViewController {
  constructor() {

    this.stage = new createjs.Stage("c");
    this.stage.canvas.width = window.innerWidth;
    this.stage.canvas.height = window.innerHeight;

    // var circle = new createjs.Shape();
    // circle.graphics
    //   .beginFill("AliceBlue")
    //   .drawCircle(0, 0, 50);
    // this.stage.addChild(circle);

    this.currentView = new GameView(this.stage)

    createjs.Ticker.addEventListener("tick", () =>
      this.currentView.tick()
    )

    $(window).on('transition', (event, ViewType) =>
      this.transition(ViewType)
    )

    $(window).resize(() => {
      this.stage.canvas.width = window.innerWidth;
      this.stage.canvas.height = window.innerHeight;
      this.stage.update();
    })

  }

  transition(ViewType) {
    this.stage.removeAllChildren()
    createjs.Ticker.removeAllEventListeners()

    this.currentView = new ViewType(this.stage)
    createjs.Ticker.addEventListener("tick", () => this.stage.update());
    setInterval(() => { this.currentView.update() }, 16)
  }
}
