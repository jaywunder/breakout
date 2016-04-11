// jshint -W117
// jshint -W097
"use strict";

window.BREAKOUTRUNNING = true; // global variable because I'm lazy and dumb
import Ball from '../entities/ball.js'
import Brick from '../entities/brick.js'
import Paddle from '../entities/paddle.js'
import Follower from '../entities/follower.js'
import CanvasButton from '../ui/button.js'
import View from './view.js'

export default class GameView  extends View {
  constructor(stage, renderer) {
    super(stage, renderer)
    BREAKOUTRUNNING = true
    this.aiWorker = null
    this.aiPlaying = false
    this.bricksTotal = 0
    this.bricksKilled = 0

    this.scaledCanvas = $(`<canvas id="ai-render" width="40" height="40"></canvas>`)[0]
    this.scaleCanvasWidth = this.scaledCanvas.width / this.view.width
    this.scaleCanvasHeight = this.scaledCanvas.height / this.view.height
    $('body').append(this.scaledCanvas)
    this.scaledCtx = this.scaledCanvas.getContext('2d')
    this.transferImage = new Image()
    this.transferImage.onload = () => {
      let width = this.scaledCanvas.width
      let height = this.scaledCanvas.height
      this.scaledCtx.drawImage(
        this.transferImage, 0, 0, this.scaledCanvas.width, this.scaledCanvas.height / 2
      );
      this.scaledCtx.fillStyle = '#000000'
      let x = this.entities[1].x * this.scaleCanvasWidth
      this.scaledCtx.fillRect(x - 1, 0, 2, 20)
    }
    this.transferBinImage = new Image()
    this.transferBinImage.onload = () => {
      this.scaledCtx.drawImage(
        this.transferBinImage, 0, this.transferImage.height, this.scaledCanvas.width, this.scaledCanvas.height
      )
    }

    // TODO: also display getAIData info

    this.createUIElements()
    this.createEntitites()

    $(window).on('key-esc', (event) => { BREAKOUTRUNNING = !BREAKOUTRUNNING })

    $(document).on('mousemove touchstart touchmove', (event) => {
      if (this.aiPlaying) return
      var {x, y} = pointerEventToXY(event)
      if (this.paddle) this.paddle.x = x - this.paddle.width / 2
    })
  }

  createUIElements() {
    let spaceText = new PIXI.Text('Press Space to Start', {
      font: '48px monospace',
      fill: '#ff7700',
      align: 'center'
    })

    spaceText.position.set(
      (window.innerWidth - spaceText.width) / 2,
      (window.innerHeight - spaceText.height) / 2
    )
    this.stage.addChild(spaceText)

    $(window).one('key-space', (event) => {
      this.stage.removeChild(spaceText)
    })

    let aiButton = new CanvasButton({
      text: 'Toggle AI'
    })
    this.stage.addChild(aiButton.body)
    aiButton.onClick(() => {
      this.onAiButtonClick()
      $(window).trigger('key-space')
    })
  }

  createEntitites() {
    let yOffset = this.view.height / 8
    this.paddle = new Paddle(yOffset)
    this.entities.push(this.paddle)
    this.entities.push(new Ball(0, 0, this.paddle))

    let blocksWidth = this.view.width / 80

    let colors = [ 0xe82014, 0xee8d0b, 0xddd51a, 0x1bda23, 0x145edf ]
    for (let x = 0; x < blocksWidth; x++) {
      for (let y = 0; y < 5; y++) {
        this.entities.push(new Brick(x * 80, y * 40 + yOffset, colors[y]))
        this.bricksTotal++
      }
    }

    for (let i in this.entities) {
      this.stage.addChild(this.entities[i].body)
    }
  }

  onAiMessage(event) {
    console.log(event.data)
    this.paddle.x = event.data * this.view.width
  }

  getAIData() {
    let inData = this.scaledCtx.getImageData(0, 0, this.scaledCanvas.width, this.scaledCanvas.height).data
    let outData = new Uint8Array(inData.length / 8)
    for (let i = 0; i < inData.length / 2; i += 4) {
      if (inData[i] < 240 || inData[i+1] < 240 || inData[i+2] < 240)
        outData[i / 4] = 1
      else
        outData[i / 4] = 0
    }
    return outData
  }

  onAiButtonClick() {
    this.aiPlaying = !this.aiPlaying
    if (this.aiPlaying) {
      console.log('AI PLAYING');
      this.aiWorker = new Worker("./js/ai.js")
      this.aiWorker.onmessage = (event) => this.onAiMessage(event)
      this.aiWorker.postMessage({
        type: 'nn-init',
        inputDim: this.getAIData().length
      })
    } else {
      console.log('AI NOT PLAYING');
      this.aiWorker.terminate()
      this.aiWorker = null
    }
  }

  update() {
    if (BREAKOUTRUNNING) {
      if (this.aiPlaying){
        // console.log('trying to post a message to the worker', this.aiWorker);
        this.aiWorker.postMessage({
          type: 'learning-data',
          input: this.getAIData(),
          target: this.entities[1].x / this.view.width // normalize the ball's x value
        })
      }

      this.checkEdges()
      this.checkCollisions()
      this.updateTinyCanvas()

      // garbage collect dead entities after all updates
      for (let i in this.entities) {
        if (!this.entities[i].alive){
          this.stage.removeChild(this.entities[i].body)
          this.entities.splice(i, 1)
        }
      }

      for (let i in this.entities) {
        this.entities[i]
          .update()
          .move();
      }
    }
  }

  updateTinyCanvas() {
    this.transferImage.src = this.view.toDataURL()
    let binImageData = this.scaledCtx.createImageData(40, 20)
    let aiData = this.getAIData()
    for (let i = 0; i < aiData.length; i++) {
      binImageData.data[i * 4 + 0] = aiData[i] * 255
      binImageData.data[i * 4 + 1] = aiData[i] * 255
      binImageData.data[i * 4 + 2] = aiData[i] * 255
      binImageData.data[i * 4 + 3] = 255
    }
    this.scaledCtx.putImageData(binImageData, 0, 20)
  }

  checkEdges() {
    for (let i in this.entities) {
      let entity = this.entities[i]

      if (entity.x + entity.width > this.view.width){
        entity.x = this.view.width - entity.width
        entity.vx *= -1
      } else if (entity.x < 0) {
        entity.x = 0
        entity.vx *= -1
      } else if (entity.y < 0){
        entity.y = 0
        entity.vy *= -1
      } else if (entity.y + entity.height > this.view.height){
        entity.y = this.view.height - entity.height
        entity.vy *= -1
        // TODO: fix this eventually
        // if (entity instanceof Ball) this.loseGame()
      }
    }
  }

  checkCollisions() {
    for (let i in this.entities) {
      let entity = this.entities[i]

      if (entity instanceof Ball) {

        for (let j in this.entities) {
          if (i === j) continue // so the entity doesn't collide with itself
          let other = this.entities[j]
          if (other instanceof Follower) continue // followers don't collide

          if (this.isColliding(entity, other)) {
            this.collide(entity, other)
          }
        }
      }
    }
  }

  isColliding(entity, other) {
    return (
      entity.x < other.x + other.width &&
      entity.x + entity.width > other.x &&
      entity.y < other.y + other.height &&
      entity.height + entity.y > other.y
    )
  }

  collide(ball, other) {
    if (other instanceof Brick) {
      // kill the brick
      other.kill();
      if (++this.bricksKilled === this.bricksTotal) this.winGame()

      // http://gamedev.stackexchange.com/a/5430
      // we need to do some time travelling to prevent overlapping entities
      for (let t = 1; t > 0.01; t *= 0.5) {
        if (this.isColliding(ball, other)) {
          ball.x += -ball.vx
          ball.y += -ball.vy
        } else {
          ball.x += ball.vx
          ball.y += ball.vy
        }
      }

      if (ball.x < other.x + other.width &&
          ball.x + ball.width > other.x) {
        ball.vy *= -1
        ball.ay *= -1
      }

      if (ball.y < other.y + other.height &&
          ball.y + ball.height > other.y) {
        ball.vx *= -1
        ball.ax *= -1
      }

    } else if (other instanceof Paddle) {
      // bounce the ball
      ball.vy *= -1

      // bounce the x direction depending on where the ball hit the paddle
      let bounceX = ball.x + (ball.width / 2) - other.x
      ball.vx = ((bounceX / other.width) - 0.5) * 20
    }
  }

  winGame() {
    let text = new PIXI.Text('You Won!', {
      font: '72px monospace',
      fill: '#ff7700',
      align: 'center'
    });

    text.x = (this.view.width / 2) - (text.width / 2);
    text.y = (this.view.height / 2) - (text.height * 3);
    this.stage.addChild(text)

    // UI Buttons
    let centerX = this.view.width / 2
    let centerY = this.view.height / 2
    let restartButton = new CanvasButton({
      text: 'Restart',
      font: '48px monospace'
    })
    restartButton.x = centerX - (restartButton.width / 2)
    restartButton.y = centerY - (restartButton.height)
    restartButton.onClick(() => $(window).trigger('transition', GameView))
    restartButton.move()
    this.stage.addChild(restartButton.body)

    BREAKOUTRUNNING = false
  }

  loseGame() {
    // End Game Text
    let text = new PIXI.Text('Game Over', {
      font: '72px monospace',
      fill: '#ff7700',
      align: 'center'
    });

    text.x = (this.view.width / 2) - (text.width / 2);
    text.y = (this.view.height / 2) - (text.height * 3);
    this.stage.addChild(text)

    // UI Buttons
    let centerX = this.view.width / 2
    let centerY = this.view.height / 2
    let restartButton = new CanvasButton({
      text: 'Restart',
      font: '48px monospace'
    })
    restartButton.x = centerX - (restartButton.width / 2)
    restartButton.y = centerY - (restartButton.height)
    restartButton.onClick(() => $(window).trigger('transition', GameView))
    restartButton.move()
    this.stage.addChild(restartButton.body)

    BREAKOUTRUNNING = false
  }
}


// http://stackoverflow.com/a/16284281
function pointerEventToXY (e){
  var out = {x:0, y:0};
  if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    out.x = touch.pageX;
    out.y = touch.pageY;
  } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
    out.x = e.pageX;
    out.y = e.pageY;
  }
  return out;
}
