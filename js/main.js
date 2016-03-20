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
  }
})

new ViewController()



// var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
// document.body.appendChild(renderer.view);
//
// // create the root of the scene graph
// var stage = new PIXI.Container();
//
// // create a texture from an image path
// var texture = PIXI.Texture.fromImage('assets/bunny.png');
//
// // create a new Sprite using the texture
// var bunny = new PIXI.Sprite(texture);
//
// // center the sprite's anchor point
// bunny.anchor.x = 0.5;
// bunny.anchor.y = 0.5;
//
// // move the sprite to the center of the screen
// bunny.position.x = 200;
// bunny.position.y = 150;
//
// stage.addChild(bunny);
//
// // start animating
// animate();
// function animate() {
//     requestAnimationFrame(animate);
//
//     // just for fun, let's rotate mr rabbit a little
//     bunny.rotation += 0.1;
//
//     // render the container
//     renderer.render(stage);
// }
