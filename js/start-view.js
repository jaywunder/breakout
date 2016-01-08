// jshint -W117
// jshint -W097
'use strict';

class StartView {
  constructor(stage) {
    this.stage = stage
    this.textColor = '#ff7700'
    this.entities = []

    this.createBlocks()
    this.displayText()

    $(window).resize(() => {
      this.stage.removeAllChildren()
      this.displayText()
    })

  }

  createBlocks() {
    let blocksWidth = this.stage.canvas.width / 40
    let colors = [ "#e82014", "#ee8d0b", "#ddd51a", "#1bda23", "#145edf" ]
    for (let x = 0; x < blocksWidth; x++) {
      for (let y = 0; y < 5; y++) {
        this.entities.push(new Brick(x * 40, y * 20 + 50, colors[y]))
      }
    }

    for (let i in this.entities) {
      this.stage.addChild(this.entities[i].body)
    }
  }

  tick() {
    this.stage.update()
  }

  displayText() {
    let centerX = this.stage.canvas.width / 2
    let centerY = this.stage.canvas.height / 2

    let titleText = new createjs.Text('B R E A K O U T', '72px monospace', this.textColor);
    titleText.x = centerX - (titleText.getMeasuredWidth() / 2)
    titleText.y = centerY - (titleText.getMeasuredHeight() * 3)
    this.stage.addChild(titleText)

    let playText = new CanvasButton(this.stage, {
      text: 'Play',
      textColor: this.textColor,
      font: '48px monospace'
    })
    playText.x = centerX - (playText.textWidth() * 1.25)
    playText.y = centerY - (playText.textHeight())
    playText.draw()
    playText.onClick(() => $(window).trigger('transition', GameView))

    let infoText = new CanvasButton(this.stage, {
      text: 'Info',
      textColor: this.textColor,
      font: '48px monospace'
    })
    infoText.x = centerX + (infoText.textWidth() * 0.25)
    infoText.y = centerY - (infoText.textHeight())
    infoText.draw()
    infoText.onClick(() => $(window).trigger('transition', InfoView))

    ////////////////////////////////////
    // OLD OBSOLETE BULLSHIT FOR LOLZ //
    ////////////////////////////////////
    // let playText = new createjs.Text('Play', '48px monospace', this.textColor)
    // playText.x = centerX - (playText.getMeasuredWidth() * 1.25)
    // playText.y = centerY - (playText.getMeasuredHeight())
    // this.stage.addChild(playText)
    //
    // // make a fucking underline by hand
    // let bounds = playText.getBounds()
    // let playBorder = new createjs.Shape()
    // // playBorder.bounds = playText.getBounds()
    // playBorder.graphics
    //   .s(this.textColor).f('rgba(0, 0, 0, 0.1)').ss(5, 'round') // fill and stroke style
    //   .rr(
    //     playText.x - 15,
    //     playText.y + 5,
    //     playText.getMeasuredWidth() + 30,
    //     playText.getMeasuredHeight() + 15,
    //     3, 3, 3, 3
    //   )
    // this.stage.addChild(playBorder)
    //
    // playBorder.addEventListener('click', () => {
    //   $(window).trigger('transition', GameView)
    // })

    // let infoText = new createjs.Text('Info', '48px monospace', this.textColor)
    // infoText.x = centerX + (infoText.getMeasuredWidth() * 0.25)
    // infoText.y = centerY - (infoText.getMeasuredHeight())
    // this.stage.addChild(infoText)
    //
    // // make a fucking underline by hand
    // let bounds = infoText.getBounds()
    // let infoBorder = new createjs.Shape()//.set({x: bounds.x, y: bounds.y+bounds.height});
    // // infoBorder.bounds = infoText.getBounds()
    // infoBorder.graphics
    //   .s(this.textColor).f('rgba(0, 0, 0, 0.1)').ss(5, 'round') // fill and stroke style
    //   .rr(
    //     infoText.x - 15,
    //     infoText.y + 5,
    //     infoText.getMeasuredWidth() + 30,
    //     infoText.getMeasuredHeight() + 15,
    //     3, 3, 3, 3
    //   )
    // this.stage.addChild(infoBorder)
    //
    // infoBorder.addEventListener('click', () => {
    //   $(window).trigger('transition', InfoView)
    // })
  }
}
