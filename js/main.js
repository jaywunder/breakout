// jshint -W117
// jshint -W097
'use strict';

import ViewController from './view-controller.js'

window.addEventListener('keydown', (event) => {
  // console.log(event.which);
  switch (event.which) {
    case 37: // left
      $(window).trigger('key-left')
      break
    case 38: // up
      $(window).trigger('key-up')
      break
    case 39: // right
      $(window).trigger('key-right')
      break
    case 40: // down
      $(window).trigger('key-down')
      break
    case 27: // esc
      $(window).trigger('key-esc')
      break
    case 32: // space key
      $(window).trigger('key-space')
      break
    case 187: // plus key
      $(window).trigger('download-image')
      break
  }
})

$(window).on('download-image', () => {
  let canvas = document.querySelector('canvas')
  let data64 = canvas.toDataURL( "image/png" )
  console.log(data64)
})

new ViewController()
