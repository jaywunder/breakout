// jshint -W117
// jshint -W097
"use strict";

let window = self
importScripts('../lib/synaptic.min.js');

let interval = setInterval(() => console.log('I exist'), 100)
console.log('interval:', interval);

class NNPlayer {
  constructor(inputDim) {
    this.dataPoints = 0
    this.maxDataPoints = 1000

    this.inputDim = inputDim
    this.hiddenDim = Math.round(inputDim * 1.2)
    this.outputDim = 1
    this.network = new synaptic.Architect.Perceptron(this.inputDim, this.hiddenDim, this.outputDim)
  }

  activate(input, target) {
    if (this.dataPoints === this.maxDataPoints) console.log('finished learning');
    if (this.dataPoints++ < this.maxDataPoints)
      this.network.propagate(0.01, [target])

    postMessage(this.network.activate(input))
  }
}

var ai;

onmessage = function(event) {
  // console.log('worker got an event:', event);
  switch (event.data.type) {
    case 'nn-init':
      ai = new NNPlayer(event.data.inputDim)
      break;
    case 'learning-data':
      ai.activate(event.data.input, event.data.target)
      break;
    default:
      console.error(event.data.type, 'is not recognized as an event type');
  }
}
