// jshint -W117
// jshint -W097
"use strict";
console.log('HELLO????');

let window = self
importScripts('../lib/synaptic.min.js');

let interval = setInterval(() => console.log('I exist'), 100)
console.log('interval:', interval);

class AIPlayer {
  constructor(inputDim) {
    console.log('making the AIPLAYER');
    this.inputDim = inputDim
    this.hiddenDim = inputDim * 1.5
    this.outputDim = 1
    console.log('input dim:', this.inputDim);
    // console.log('making the network....', new synaptic.Architect.Perceptron(5 * 40, 5 * 40 * 1.5, 1));
    this.network = new synaptic.Architect.Perceptron(5 * 40, 5 * 40 * 1.5, this.outputDim)
    console.log('made the network...');
  }

  learn(data) {
    console.log('learning...');
    this.network.propogate(0.1, data.target)
    postMessage(this.network.activate(data.input)) // .map((num, i) => num / 255)
  }
}

var ai;

onmessage = function(event) {
  console.log('worker got an event:', event);
  switch (event.data.type) {
    case 'nn-init':
      console.log('worker got init message');
      ai = new AIPlayer(event.data.inputDim)
      break;
    case 'learning-data':
      console.log('worker got learning data');
      // ai.learn(event.data)
      break;
    default:
      console.error(event.data.type, 'is not recognized as an event type');
  }
}
