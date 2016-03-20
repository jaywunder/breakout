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
    this.aiWorker = null
    this.aiPlaying = false

    this.createUIElements()
    this.createEntitites()

    let aiButton = new CanvasButton({})
    this.stage.addChild(aiButton.body)

    $(window).on('key-esc', (event) => { BREAKOUTRUNNING = !BREAKOUTRUNNING })

    $(document).on('mousemove touchstart', (event) => {
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


    // let aiButton = new CanvasButton({})
    // this.stage.addChild(aiButton.body)
    // aiButton.onClick(() => {
    //   this.onAiButtonClick()
    //
    //   $(window).trigger('key-space')
    //   if (this.aiPlaying) {
    //     aiButton.fillColor = 'rgba(0, 0, 0, 0.2)'
    //   } else {
    //     aiButton.fillColor = 'rgba(0, 0, 0, 0.01)'
    //   }
    //   aiButton.draw()
    // })
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
      }
    }

    for (let i in this.entities) {
      this.stage.addChild(this.entities[i].body)
    }
  }

  onAiMessage(event) {
    console.log(event);
  }

  onAiButtonClick() {
    this.aiPlaying = !this.aiPlaying
    if (this.aiPlaying) {
      this.aiWorker = new Worker("./js/ai.js");
      this.aiWorker.onmessage = (event) => {
        this.onAiMessage(event.data)
      }

    } else {
      this.aiWorker.terminate()
      this.aiWorker = null
    }
    this.aiWorker.postMessage('ping')
  }

  update() {
    this.checkEdges()

    // update and move all entities
    if (BREAKOUTRUNNING) {
      this.checkCollisions()

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
        if (entity instanceof Ball) this.endGame()
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
              // console.log(entity.id + ' ->*<- ' + other.id + ' at ' + entity.pos + ' and ' + other.pos);
              // console.log(`${other.id} is ${ other.alive ? 'alive' : 'dead' }`);
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
        // for debugging:
        // ball.body.x = ball.x
        // ball.body.y = ball.y
        // this.stage.update();
      }

      if (ball.x < other.x + other.width &&
          ball.x + ball.width > other.x) {
        ball.vy *= -1
      }

      if (ball.y < other.y + other.height &&
          ball.y + ball.height > other.y) {
        ball.vx *= -1
      }

      // ball.vy *= -1
      // ball.ay *= -1

    } else if (other instanceof Paddle) {
      // bounce the ball
      ball.vy *= -1

      // bounce the x direction depending on where the ball hit the paddle
      let bounceX = ball.x + (ball.width / 2) - other.x
      ball.vx = ((bounceX / other.width) - 0.5) * 20
    }
  }

  endGame() {
    // End Game Text
    let text = new createjs.Text("Game Over", "72px monospace", "#ff7700");
    let bounds = text.getBounds()
    text.x = (this.view.width / 2) - (bounds.width / 2);
    text.y = (this.view.height / 2) - (bounds.height * 3);
    text.textBaseline = "alphabetic";
    this.stage.addChild(text)

    // UI Buttons
    let centerX = this.view.width / 2
    let centerY = this.view.height / 2
    let restartButton = new CanvasButton(this.stage, {
      text: 'Restart',
      textColor: '#ff7700',
      font: '48px monospace'
    })
    restartButton.x = centerX - (restartButton.textWidth() / 2)
    restartButton.y = centerY - (restartButton.textHeight())
    restartButton.draw()
    restartButton.onClick(() => $(window).trigger('transition', GameView))

    let homeButton = new CanvasButton(this.stage, {
      text: 'Home',
      textColor: '#ff7700',
      font: '48px monospace'
    })
    homeButton.x = centerX - (homeButton.textWidth() / 2)
    homeButton.y = centerY + (homeButton.textHeight())
    homeButton.draw()
    homeButton.onClick(() => $(window).trigger('transition', StartView))

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
