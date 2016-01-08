// jshint -W117
// jshint -W097
"use strict";

window.BREAKOUTRUNNING = true; // global variable because I'm lazy and dumb

class GameView {
  constructor(stage) {
    this.entities = []
    this.stage = stage
    this.aiWorker = null
    this.aiPlaying = false

    this.createUIElements()
    this.createEntitites()

    $(window).on('key-esc', (event) => {
      BREAKOUTRUNNING = !BREAKOUTRUNNING
    })
  }

  createUIElements() {
    let spaceText = new createjs.Text('Press Space to Start', '48px monospace', '#ff7700')
    spaceText.set({
      x: (this.stage.canvas.width / 2) - (spaceText.getMeasuredWidth() / 2),
      y: (this.stage.canvas.height / 2) - (spaceText.getMeasuredHeight() / 2)
    })
    this.stage.addChild(spaceText)

    $(window).one('key-space', (event) => {
      this.stage.removeChild(spaceText)
    })

    let aiButton = new CanvasButton(this.stage, {
      text: 'AI Player',
      textColor: '#ff7700',
      font: '32px monospace',
      fillColor: 'rgba(0, 0, 0, 0.01)'
    })
    aiButton.x = 2 // this.stage.canvas.width - aiButton.textWidth() - 20
    aiButton.y = 2
    aiButton.draw()
    aiButton.onClick(() => {
      this.onAiButtonClick()

      $(window).trigger('key-space')
      if (this.aiPlaying) {
        aiButton.fillColor = 'rgba(0, 0, 0, 0.2)'
      } else {
        aiButton.fillColor = 'rgba(0, 0, 0, 0.01)'
      }
      aiButton.draw()
    })
  }

  createEntitites() {
    this.entities.push(new Paddle())
    this.entities.push(new Ball(0, 200, this.entities[0]))

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

  tick() {
    this.checkEdges()

    // update, render, and move all entities
    if (BREAKOUTRUNNING) {
      this.checkCollisions()

      for (let i in this.entities) {
        this.entities[i]
          .update()
          .render()
          .move();
      }

      // garbage collect dead entities after all updates
      for (let i in this.entities) {
        if (this.entities[i].alive === false){
          this.stage.removeChild(this.entities[i].body)
          this.entities.splice(i, 1)
        }
      }
    }

    this.stage.update();
  }

  checkEdges() {
    let canvas = this.stage.canvas;

    for (let i in this.entities) {
      let entity = this.entities[i]

      if (entity.x + entity.width > canvas.width){
        entity.x = canvas.width - entity.width
        entity.vx *= -1
      }

      if (entity.x < 0) {
        entity.x = 0
        entity.vx *= -1
      }

      if (entity.y + entity.height > canvas.height){
        entity.y = canvas.height - entity.height
        entity.vy *= -1

        // kill the ball if it hit's the floor
        if (entity instanceof Ball) {
          this.end()
        }
      }

      if (entity.y < 0){
        entity.y = 0
        entity.vy *= -1
      }
    }
  }

  checkCollisions() {
    for (let i in this.entities) {
      let entity = this.entities[i]

      if (entity instanceof Ball) {
        // console.log('found the ball');

        for (let j in this.entities) {
          if (i === j) continue // so the entity doesn't collide with itself
          let other = this.entities[j]
          if (other instanceof Follower) continue // followers don't collide

          if (entity.x < other.x + other.width &&
              entity.x + entity.width > other.x &&
              entity.y < other.y + other.height &&
              entity.height + entity.y > other.y)
            { // sorry for ugly brace...
              // console.log(entity.id + ' ->*<- ' + other.id + ' at ' + entity.pos + ' and ' + other.pos);
              this.collide(entity, other)
          }
        }
      }
    }
  }

  collide(ball, other) {
    if (other instanceof Brick) {
      // kill the brick
      other.kill();

      // // bounce the ball
      // if (ball.x < other.x + other.width &&
      //     ball.x + ball.width > other.x) {
      //   // console.log('balls to the floor!?');
      //   ball.vy *= -1
      //   ball.ay *= -1
      // }

      // if (ball.y < other.y + other.height &&
      //     ball.height + ball.y > other.y) { //GAUGH DUDUDE THIS IS FUSTRATING
      //   // console.log('balls to the wall!!');
      //   ball.vx *= -1
      //   ball.ax *= -1
      // }

      ball.vy *= -1
      ball.ay *= -1
    } else if (other instanceof Paddle) {
      // bounce the ball
      ball.vy *= -1

      // bounce the x direction depending on where the ball hit the paddle
      let bounceX = ball.x + (ball.width / 2) - other.x
      ball.vx = ((bounceX / other.width) - 0.5) * 20
    }
  }

  end() {
    // End Game Text
    let text = new createjs.Text("Game Over", "72px monospace", "#ff7700");
    let bounds = text.getBounds()
    text.x = (this.stage.canvas.width / 2) - (bounds.width / 2);
    text.y = (this.stage.canvas.height / 2) - (bounds.height * 3);
    text.textBaseline = "alphabetic";
    this.stage.addChild(text)

    // UI Buttons
    let centerX = this.stage.canvas.width / 2
    let centerY = this.stage.canvas.height / 2
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