// jshint -W117
// jshint -W097
"use strict";

let ai = new AIPlayer()

onmessage = function (event) {
  ai.onMessage(event)
  postMessage('pong')
}

class AIPlayer {
  constructor() {

  }

  onMessage() {
    
  }
}
