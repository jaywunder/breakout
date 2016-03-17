// jshint -W117
// jshint -W097
'use strict';

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

$('#c').height(window.innerWidth)

// new ViewController()

Physics((world) => {
  let renderer = Physics.renderer('canvas', {
    el: 'c',
    width: $('#c').width(),
    height: $('#c').height()
  })

  world.add(renderer)

  var square = Physics.body('rectangle', {
    x: 250,
    y: 250,
    width: 50,
    height: 50
  });
  world.add( square );
  world.render();

  Physics.util.ticker.on(function( time, dt ){
    world.step( time );
  });

  // start the ticker
  Physics.util.ticker.start();

  world.on('step', function(){
    world.render();
  });
})
