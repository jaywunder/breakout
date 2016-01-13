// jshint -W117
// jshint -W097
'use strict';

class StartView extends View {
  constructor(canvas) {
    super(canvas)

    this.textColor = '#ff7700'
    this.entities = []

    this.createBlocks()
    this.createText()

    $(window).resize((e) => {
      // only runs when the window is done resizing
      clearTimeout(resizeTimer)
      var resizeTimer = setTimeout(() => {
        this.renderables = []
        this.createBlocks()
        this.createText()
      }, 250);
    });
  }

  createBlocks() {
    let blocksWidth = this.canvas.width / 40
    let colors = [ "#e82014", "#ee8d0b", "#ddd51a", "#1bda23", "#145edf" ]
    for (let x = 0; x < blocksWidth; x++) {
      for (let y = 0; y < 5; y++) {
        this.entities.push(new Brick(x * 40, y * 20 + 50, colors[y]))
      }
    }

    for (let i in this.entities) {
      this.renderables.push(this.entities[i])
    }
  }

  tick() {

  }

  createText() {
    let centerX = this.canvas.width / 2
    let centerY = this.canvas.height / 2

    let titleText = new CanvasText({
      text: 'B R E A K O U T',
      font: '72px monospace',
      fillStyle: this.textColor
    })

    titleText.x = centerX - (titleText.width / 2)
    titleText.y = centerY - titleText.height
    this.renderables.push(titleText)

    let playText = new CanvasButton(this.stage, {
      text: 'Play',
      font: '48px monospace',
      fillStyle: this.textColor
    })
    playText.x = centerX - (playText.width * 1.25)
    playText.y = centerY - (playText.height)
    playText.onClick(() => $(window).trigger('transition', GameView))

    let infoText = new CanvasButton(this.stage, {
      text: 'Info',
      font: '48px monospace',
      textStyle: this.textColor
    })
    infoText.x = centerX + (infoText.width * 0.25)
    infoText.y = centerY - (infoText.height)
    infoText.onClick(() => $(window).trigger('transition', InfoView))
  }
}
