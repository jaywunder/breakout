(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = require('./entity.js');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ball = function (_Entity) {
  _inherits(Ball, _Entity);

  function Ball(x, y, paddle) {
    _classCallCheck(this, Ball);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ball).call(this, 'ball', {
      x: x, y: y,
      vx: 15, vy: 15,
      width: 15, height: 15
    }));

    _this.paddle = paddle;
    _this.isFollowing = true;

    $(window).one('key-space touchstart', function () {
      _this.isFollowing = false;
      _this.vx = _this.paddle.vx;
      _this.vy = -15;
    });
    return _this;
  }

  _createClass(Ball, [{
    key: 'createBody',
    value: function createBody() {
      var ballTexture = new PIXI.Texture.fromImage('assets/ball.png');
      var ballSprite = new PIXI.Sprite(ballTexture);
      var scale = this.width / ballSprite.width;
      ballSprite.scale.set(scale);
      ballSprite.tint = 0x000000;
      this.body.addChild(ballSprite);
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.isFollowing) {
        this.x = this.paddle.x + this.paddle.width / 2 - this.width;
        this.y = this.paddle.y - this.paddle.height * 2;
        this.acc = [0, 0];
        this.vel = [0, 0];
      }
      return this;
    }
  }]);

  return Ball;
}(_entity2.default);

exports.default = Ball;

},{"./entity.js":3}],2:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = require('./entity.js');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Brick = function (_Entity) {
  _inherits(Brick, _Entity);

  function Brick(x, y, color) {
    _classCallCheck(this, Brick);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Brick).call(this, 'brick', {
      x: x, y: y,
      width: 80, height: 40,
      maxVel: 0, maxAcc: 0
    }));

    _this.color = color;
    _this.brickSprite.tint = _this.color;
    return _this;
  }

  _createClass(Brick, [{
    key: 'createBody',
    value: function createBody() {
      var brickTexture = new PIXI.Texture.fromImage('assets/brick.png');
      this.brickSprite = new PIXI.Sprite(brickTexture);
      this.body.addChild(this.brickSprite);
    }
  }, {
    key: 'move',
    value: function move() {
      this.body.x = this.x;
      this.body.y = this.y;
      return this;
    } // bricks dont move haha

  }, {
    key: 'collide',
    value: function collide(other) {
      this.acc = [0, 0];

      if (other instanceof Ball) {
        this.kill();
        console.log('I\'m dead');
      }
    }
  }]);

  return Brick;
}(_entity2.default);

exports.default = Brick;

},{"./entity.js":3}],3:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Entity = function () {
  function Entity(type, opts) {
    _classCallCheck(this, Entity);

    this.type = type;
    this.id = this.type + '#' + Math.floor(Math.random() * 10000);
    this.alive = true;

    this.pos = [opts.x || 0, opts.y || 0];
    this.vel = [opts.vx || 0, opts.vy || 0];
    this.acc = [opts.ax || 0, opts.ay || 0];
    this.size = [opts.width || 0, opts.height || 0];
    this.maxVel = opts.maxVel || 15;
    this.maxAcc = opts.maxAcc || 1;

    this.body = new PIXI.Container();

    this.createBody();
  }

  _createClass(Entity, [{
    key: 'createBody',
    value: function createBody() {}
  }, {
    key: 'render',
    value: function render() {

      return this;
    }
  }, {
    key: 'update',
    value: function update() {

      return this;
    }
  }, {
    key: 'collide',
    value: function collide(other) {}
  }, {
    key: 'kill',
    value: function kill() {
      this.alive = false;
    }
  }, {
    key: 'move',
    value: function move() {
      if (this.vx > this.maxVel) this.vx = this.maxVel;
      if (this.vy > this.maxVel) this.vy = this.maxVel;
      if (this.vx < -this.maxVel) this.vx = -this.maxVel;
      if (this.vy < -this.maxVel) this.vy = -this.maxVel;

      if (this.ax > this.maxAcc) this.ax = this.maxAcc;
      if (this.ay > this.maxAcc) this.ay = this.maxAcc;
      if (this.ax < -this.maxAcc) this.ax = -this.maxAcc;
      if (this.ay < -this.maxAcc) this.ay = -this.maxAcc;

      this.x += this.vx;
      this.y += this.vy;

      this.vx += this.ax;
      this.vy += this.ay;

      this.body.x = this.x;
      this.body.y = this.y;

      return this;
    }
  }, {
    key: 'x',
    get: function get() {
      return this.pos[0];
    },
    set: function set(value) {
      this.pos[0] = value;
    }
  }, {
    key: 'y',
    get: function get() {
      return this.pos[1];
    },
    set: function set(value) {
      this.pos[1] = value;
    }
  }, {
    key: 'vx',
    get: function get() {
      return this.vel[0];
    },
    set: function set(value) {
      this.vel[0] = value;
    }
  }, {
    key: 'vy',
    get: function get() {
      return this.vel[1];
    },
    set: function set(value) {
      this.vel[1] = value;
    }
  }, {
    key: 'ax',
    get: function get() {
      return this.acc[0];
    },
    set: function set(value) {
      this.acc[0] = value;
    }
  }, {
    key: 'ay',
    get: function get() {
      return this.acc[1];
    },
    set: function set(value) {
      this.acc[1] = value;
    }
  }, {
    key: 'width',
    get: function get() {
      return this.size[0];
    },
    set: function set(value) {
      this.size[0] = value;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.size[1];
    },
    set: function set(value) {
      this.size[1] = value;
    }
  }]);

  return Entity;
}();

exports.default = Entity;

},{}],4:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = require('./entity.js');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Follower = function (_Entity) {
  _inherits(Follower, _Entity);

  function Follower(other) {
    _classCallCheck(this, Follower);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Follower).call(this, 'follower', {
      x: 0, y: 0
    }));

    _this.other = other;

    _this.body.graphics.beginFill('#000000').drawCircle(_this.x, _this.y, 10);
    return _this;
  }

  _createClass(Follower, [{
    key: 'moveTo',
    value: function moveTo(other) {
      this.other = other;
    }
  }, {
    key: 'update',
    value: function update() {
      this.pos = this.other.pos;

      return this;
    }
  }]);

  return Follower;
}(_entity2.default);

exports.default = Follower;

},{"./entity.js":3}],5:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = require('./entity.js');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paddle = function (_Entity) {
  _inherits(Paddle, _Entity);

  function Paddle(yOffset) {
    _classCallCheck(this, Paddle);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Paddle).call(this, 'paddle', {
      x: document.querySelector('canvas').width / 2 - document.querySelector('canvas').width / 10,
      y: document.querySelector('canvas').height - yOffset,
      maxVel: 20, maxAcc: 2,
      width: document.querySelector('canvas').width / 5,
      height: 20
    }));

    $(window).on('key-left', function (event) {
      if (BREAKOUTRUNNING) _this.onLeft();
    });
    $(window).on('key-right', function (event) {
      if (BREAKOUTRUNNING) _this.onRight();
    });
    return _this;
  }

  _createClass(Paddle, [{
    key: 'createBody',
    value: function createBody() {
      var paddleTexture = new PIXI.Texture.fromImage('assets/paddle-piece.png');
      for (var i = 0; i < this.width; i += 10) {
        var paddleSprite = new PIXI.Sprite(paddleTexture);
        paddleSprite.x = i;
        paddleSprite.tint = 0x000000;
        this.body.addChild(paddleSprite);
      }
    }
  }, {
    key: 'onLeft',
    value: function onLeft() {
      this.x -= 15;
    }
  }, {
    key: 'onRight',
    value: function onRight() {
      this.x += 15;
    }
  }]);

  return Paddle;
}(_entity2.default);

exports.default = Paddle;

},{"./entity.js":3}],6:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

var _viewController = require('./view-controller.js');

var _viewController2 = _interopRequireDefault(_viewController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('keydown', function (event) {
  // console.log(event.which);
  switch (event.which) {
    case 37:
      // left
      $(window).trigger('key-left');
      break;
    case 38:
      // up
      $(window).trigger('key-up');
      break;
    case 39:
      // right
      $(window).trigger('key-right');
      break;
    case 40:
      // down
      $(window).trigger('key-down');
      break;
    case 27:
      // esc
      $(window).trigger('key-esc');
      break;
    case 32:
      // space key
      $(window).trigger('key-space');
      break;
  }
});

new _viewController2.default();

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

},{"./view-controller.js":8}],7:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = require('../entities/entity.js');

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasButton = function (_Entity) {
  _inherits(CanvasButton, _Entity);

  function CanvasButton(args) {
    _classCallCheck(this, CanvasButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CanvasButton).call(this, '', {}));

    args = args || {};
    _this.x = args.x || 0;
    _this.y = args.y || 0;
    _this.text = args.text || 'Sample Text';
    _this.font = args.font || '32px monospace';
    _this.textFill = args.textFill || 0xffffff;
    _this.tintOn = args.tintOn || 0xff7700;
    _this.tintOff = args.tintOff || 0xe64703;

    _this.listeners = [];

    var text = new PIXI.Text(_this.text, { fill: _this.textFill });
    var left = new PIXI.Sprite.fromImage('assets/button-left.png');
    var right = new PIXI.Sprite.fromImage('assets/button-right.png');
    var middle = PIXI.Texture.fromImage('assets/button-middle.png');

    left.tint = _this.tintOn;
    right.tint = _this.tintOn;
    _this.body.addChild(left);

    var scaleX = text.width / left.width * 1.2;
    var scaleY = text.height / left.height * 1.2;
    // 200 is the width of the middle piece image
    // 100 is the width of the left and right curves
    for (var i = 100 * scaleX / 10; i < text.width; i += 200 * scaleX) {
      // console.log(i);
      var piece = new PIXI.Sprite(middle);
      piece.tint = _this.tintOn;
      piece.position.set(_this.x + i, _this.y);
      piece.scale.set(scaleX, scaleY);
      _this.body.addChild(piece);
    }
    left.position.x = -100 * scaleX / 10;
    right.position.x = text.width + 400 * (scaleX / 10);
    text.position.x = (right.position.x - left.position.x) / 2 - text.width / 2;
    _this.body.addChild(right);
    _this.body.addChild(text);

    left.scale.set(scaleX / 10, scaleY);
    right.scale.set(scaleX / 10, scaleY);

    for (var _i in _this.body.children) {
      var child = _this.body.children[_i];
      child.interactive = true;
      child.on('mousedown', function (event) {
        for (var _i2 in _this.listeners) {
          _this.listeners[_i2](event);
        }
      });

      child.on('touchstart', function (event) {
        for (var _i3 in _this.listeners) {
          _this.listeners[_i3](event);
        }
      });
    }
    return _this;
  }

  _createClass(CanvasButton, [{
    key: 'onClick',
    value: function onClick(func) {
      this.listeners.push(func);
    }
  }]);

  return CanvasButton;
}(_entity2.default);

exports.default = CanvasButton;

},{"../entities/entity.js":3}],8:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameView = require('./views/game-view.js');

var _gameView2 = _interopRequireDefault(_gameView);

var _startView = require('./views/start-view.js');

var _startView2 = _interopRequireDefault(_startView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewController = function () {
  function ViewController() {
    _classCallCheck(this, ViewController);

    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
      backgroundColor: 0xffffff
    });
    document.body.appendChild(this.renderer.view);

    this.loadAssets();
    // TODO: Handle Resizing
  }

  _createClass(ViewController, [{
    key: 'loadAssets',
    value: function loadAssets() {
      var _this = this;

      var loader = new PIXI.loaders.Loader();

      loader.add('ball', 'assets/ball.png');
      loader.add('brick', 'assets/brick.png');
      loader.add('bunny', 'assets/bunny.png');
      loader.add('button-left', 'assets/button-left.png');
      loader.add('button-right', 'assets/button-right.png');
      loader.add('button-middle', 'assets/button-middle.png');
      loader.add('paddle-piece', 'assets/paddle-piece.png');
      loader.once('complete', function () {
        return _this.onAssetsLoaded();
      });
      loader.load();
    }
  }, {
    key: 'onAssetsLoaded',
    value: function onAssetsLoaded() {
      var _this2 = this;

      this.currentView = new _gameView2.default(this.stage, this.renderer);
      setInterval(function () {
        _this2.currentView.update();
      }, 1000 / 60);
      $(window).on('transition', function (event, ViewType) {
        return _this2.transition(ViewType);
      });

      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      requestAnimationFrame(function () {
        return _this3.render();
      });
      this.renderer.render(this.stage);
    }
  }, {
    key: 'transition',
    value: function transition(ViewType) {
      // console.log(this.stage.children.length);
      // for (let i in this.stage.children) {
      //   console.log(i);
      //   this.stage.removeChild(this.stage.children[i])
      // }
      // console.log(this.stage.children.length);
      this.stage.children = [];
      this.currentView = new ViewType(this.stage, this.renderer);
    }
  }]);

  return ViewController;
}();

exports.default = ViewController;

},{"./views/game-view.js":9,"./views/start-view.js":10}],9:[function(require,module,exports){
// jshint -W117
// jshint -W097
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ball = require('../entities/ball.js');

var _ball2 = _interopRequireDefault(_ball);

var _brick = require('../entities/brick.js');

var _brick2 = _interopRequireDefault(_brick);

var _paddle = require('../entities/paddle.js');

var _paddle2 = _interopRequireDefault(_paddle);

var _follower = require('../entities/follower.js');

var _follower2 = _interopRequireDefault(_follower);

var _button = require('../ui/button.js');

var _button2 = _interopRequireDefault(_button);

var _view = require('./view.js');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.BREAKOUTRUNNING = true; // global variable because I'm lazy and dumb

var GameView = function (_View) {
  _inherits(GameView, _View);

  function GameView(stage, renderer) {
    _classCallCheck(this, GameView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameView).call(this, stage, renderer));

    BREAKOUTRUNNING = true;
    _this.aiWorker = null;
    _this.aiPlaying = false;
    _this.bricksTotal = 0;
    _this.bricksKilled = 0;

    _this.createUIElements();
    _this.createEntitites();

    $(window).on('key-esc', function (event) {
      BREAKOUTRUNNING = !BREAKOUTRUNNING;
    });

    $(document).on('mousemove touchstart', function (event) {
      var _pointerEventToXY = pointerEventToXY(event);

      var x = _pointerEventToXY.x;
      var y = _pointerEventToXY.y;

      if (_this.paddle) _this.paddle.x = x - _this.paddle.width / 2;
    });
    return _this;
  }

  _createClass(GameView, [{
    key: 'createUIElements',
    value: function createUIElements() {
      var _this2 = this;

      var spaceText = new PIXI.Text('Press Space to Start', {
        font: '48px monospace',
        fill: '#ff7700',
        align: 'center'
      });

      spaceText.position.set((window.innerWidth - spaceText.width) / 2, (window.innerHeight - spaceText.height) / 2);
      this.stage.addChild(spaceText);

      $(window).one('key-space', function (event) {
        _this2.stage.removeChild(spaceText);
      });

      // let aiButton = new CanvasButton({})
      // this.stage.addChild(aiButton.body)
      // aiButton.onClick(() => {
      //   this.onAiButtonClick()
      //   $(window).trigger('key-space')
      // })
    }
  }, {
    key: 'createEntitites',
    value: function createEntitites() {
      var yOffset = this.view.height / 8;
      this.paddle = new _paddle2.default(yOffset);
      this.entities.push(this.paddle);
      this.entities.push(new _ball2.default(0, 0, this.paddle));

      var blocksWidth = this.view.width / 80;

      var colors = [0xe82014, 0xee8d0b, 0xddd51a, 0x1bda23, 0x145edf];
      for (var x = 0; x < blocksWidth; x++) {
        for (var y = 0; y < 5; y++) {
          this.entities.push(new _brick2.default(x * 80, y * 40 + yOffset, colors[y]));
          this.bricksTotal++;
        }
      }

      for (var i in this.entities) {
        this.stage.addChild(this.entities[i].body);
      }
    }
  }, {
    key: 'onAiMessage',
    value: function onAiMessage(event) {
      console.log(event);
    }
  }, {
    key: 'onAiButtonClick',
    value: function onAiButtonClick() {
      var _this3 = this;

      this.aiPlaying = !this.aiPlaying;
      if (this.aiPlaying) {
        this.aiWorker = new Worker("./js/ai.js");
        this.aiWorker.onmessage = function (event) {
          _this3.onAiMessage(event.data);
        };
      } else {
        this.aiWorker.terminate();
        this.aiWorker = null;
      }
      this.aiWorker.postMessage('ping');
    }
  }, {
    key: 'update',
    value: function update() {
      this.checkEdges();

      // update and move all entities
      if (BREAKOUTRUNNING) {
        this.checkCollisions();

        // garbage collect dead entities after all updates
        for (var i in this.entities) {
          if (!this.entities[i].alive) {
            this.stage.removeChild(this.entities[i].body);
            this.entities.splice(i, 1);
          }
        }

        for (var _i in this.entities) {
          this.entities[_i].update().move();
        }
      }
    }
  }, {
    key: 'checkEdges',
    value: function checkEdges() {

      for (var i in this.entities) {
        var entity = this.entities[i];

        if (entity.x + entity.width > this.view.width) {
          entity.x = this.view.width - entity.width;
          entity.vx *= -1;
        } else if (entity.x < 0) {
          entity.x = 0;
          entity.vx *= -1;
        } else if (entity.y < 0) {
          entity.y = 0;
          entity.vy *= -1;
        } else if (entity.y + entity.height > this.view.height) {
          entity.y = this.view.height - entity.height;
          entity.vy *= -1;
          if (entity instanceof _ball2.default) this.loseGame();
        }
      }
    }
  }, {
    key: 'checkCollisions',
    value: function checkCollisions() {
      for (var i in this.entities) {
        var entity = this.entities[i];

        if (entity instanceof _ball2.default) {

          for (var j in this.entities) {
            if (i === j) continue; // so the entity doesn't collide with itself
            var other = this.entities[j];
            if (other instanceof _follower2.default) continue; // followers don't collide

            if (this.isColliding(entity, other)) {
              // console.log(entity.id + ' ->*<- ' + other.id + ' at ' + entity.pos + ' and ' + other.pos);
              // console.log(`${other.id} is ${ other.alive ? 'alive' : 'dead' }`);
              this.collide(entity, other);
            }
          }
        }
      }
    }
  }, {
    key: 'isColliding',
    value: function isColliding(entity, other) {
      return entity.x < other.x + other.width && entity.x + entity.width > other.x && entity.y < other.y + other.height && entity.height + entity.y > other.y;
    }
  }, {
    key: 'collide',
    value: function collide(ball, other) {
      if (other instanceof _brick2.default) {
        // kill the brick
        other.kill();
        if (++this.bricksKilled === this.bricksTotal) this.winGame();

        // http://gamedev.stackexchange.com/a/5430
        // we need to do some time travelling to prevent overlapping entities
        for (var t = 1; t > 0.01; t *= 0.5) {
          if (this.isColliding(ball, other)) {
            ball.x += -ball.vx;
            ball.y += -ball.vy;
          } else {
            ball.x += ball.vx;
            ball.y += ball.vy;
          }
        }

        if (ball.x < other.x + other.width && ball.x + ball.width > other.x) {
          ball.vy *= -1;
        }

        if (ball.y < other.y + other.height && ball.y + ball.height > other.y) {
          ball.vx *= -1;
        }

        // ball.vy *= -1
        // ball.ay *= -1
      } else if (other instanceof _paddle2.default) {
          // bounce the ball
          ball.vy *= -1;

          // bounce the x direction depending on where the ball hit the paddle
          var bounceX = ball.x + ball.width / 2 - other.x;
          ball.vx = (bounceX / other.width - 0.5) * 20;
        }
    }
  }, {
    key: 'winGame',
    value: function winGame() {
      var text = new PIXI.Text('You Won!', {
        font: '72px monospace',
        fill: '#ff7700',
        align: 'center'
      });

      text.x = this.view.width / 2 - text.width / 2;
      text.y = this.view.height / 2 - text.height * 3;
      this.stage.addChild(text);

      // UI Buttons
      var centerX = this.view.width / 2;
      var centerY = this.view.height / 2;
      var restartButton = new _button2.default({
        text: 'Restart',
        font: '48px monospace'
      });
      restartButton.x = centerX - restartButton.width / 2;
      restartButton.y = centerY - restartButton.height;
      restartButton.onClick(function () {
        return $(window).trigger('transition', GameView);
      });
      restartButton.move();
      this.stage.addChild(restartButton.body);

      BREAKOUTRUNNING = false;
    }
  }, {
    key: 'loseGame',
    value: function loseGame() {
      // End Game Text
      var text = new PIXI.Text('Game Over', {
        font: '72px monospace',
        fill: '#ff7700',
        align: 'center'
      });

      text.x = this.view.width / 2 - text.width / 2;
      text.y = this.view.height / 2 - text.height * 3;
      this.stage.addChild(text);

      // UI Buttons
      var centerX = this.view.width / 2;
      var centerY = this.view.height / 2;
      var restartButton = new _button2.default({
        text: 'Restart',
        font: '48px monospace'
      });
      restartButton.x = centerX - restartButton.width / 2;
      restartButton.y = centerY - restartButton.height;
      restartButton.onClick(function () {
        return $(window).trigger('transition', GameView);
      });
      restartButton.move();
      this.stage.addChild(restartButton.body);

      // let homeButton = new CanvasButton(this.stage, {
      //   text: 'Home',
      //   textColor: '#ff7700',
      //   font: '48px monospace'
      // })
      // homeButton.x = centerX - (homeButton.textWidth() / 2)
      // homeButton.y = centerY + (homeButton.textHeight())
      // homeButton.draw()
      // homeButton.onClick(() => $(window).trigger('transition', StartView))

      BREAKOUTRUNNING = false;
    }
  }]);

  return GameView;
}(_view2.default);

// http://stackoverflow.com/a/16284281


exports.default = GameView;
function pointerEventToXY(e) {
  var out = { x: 0, y: 0 };
  if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    out.x = touch.pageX;
    out.y = touch.pageY;
  } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover' || e.type == 'mouseout' || e.type == 'mouseenter' || e.type == 'mouseleave') {
    out.x = e.pageX;
    out.y = e.pageY;
  }
  return out;
}

},{"../entities/ball.js":1,"../entities/brick.js":2,"../entities/follower.js":4,"../entities/paddle.js":5,"../ui/button.js":7,"./view.js":11}],10:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StartView = function () {
  function StartView(stage) {
    var _this = this;

    _classCallCheck(this, StartView);

    this.stage = stage;
    this.textColor = '#ff7700';
    this.entities = [];

    this.createBlocks();
    this.displayText();

    $(window).resize(function () {
      _this.stage.removeAllChildren();
      _this.displayText();
    });
  }

  _createClass(StartView, [{
    key: 'createBlocks',
    value: function createBlocks() {
      var blocksWidth = this.stage.canvas.width / 40;
      var colors = ["#e82014", "#ee8d0b", "#ddd51a", "#1bda23", "#145edf"];
      for (var x = 0; x < blocksWidth; x++) {
        for (var y = 0; y < 5; y++) {
          this.entities.push(new Brick(x * 40, y * 20 + 50, colors[y]));
        }
      }

      for (var i in this.entities) {
        this.stage.addChild(this.entities[i].body);
      }
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.stage.update();
    }
  }, {
    key: 'displayText',
    value: function displayText() {
      var centerX = this.stage.canvas.width / 2;
      var centerY = this.stage.canvas.height / 2;

      var titleText = new createjs.Text('B R E A K O U T', '72px monospace', this.textColor);
      titleText.x = centerX - titleText.getMeasuredWidth() / 2;
      titleText.y = centerY - titleText.getMeasuredHeight() * 3;
      this.stage.addChild(titleText);

      var playText = new CanvasButton(this.stage, {
        text: 'Play',
        textColor: this.textColor,
        font: '48px monospace'
      });
      playText.x = centerX - playText.textWidth() * 1.25;
      playText.y = centerY - playText.textHeight();
      playText.draw();
      playText.onClick(function () {
        return $(window).trigger('transition', GameView);
      });

      var infoText = new CanvasButton(this.stage, {
        text: 'Info',
        textColor: this.textColor,
        font: '48px monospace'
      });
      infoText.x = centerX + infoText.textWidth() * 0.25;
      infoText.y = centerY - infoText.textHeight();
      infoText.draw();
      infoText.onClick(function () {
        return $(window).trigger('transition', InfoView);
      });

      ////////////////////////////////////
      // OLD OBSOLETE BULLSHIT FOR LOLZ //
      ////////////////////////////////////
      // let playText = new createjs.Text('Play', '48px monospace', this.textColor)
      // playText.x = centerX - (playText.getMeasuredWidth() * 1.25)
      // playText.y = centerY - (playText.getMeasuredHeight())
      // this.stage.addChild(playText)
      //
      // // make a fucking underline by hand
      // let bounds = playText.getBounds()
      // let playBorder = new createjs.Shape()
      // // playBorder.bounds = playText.getBounds()
      // playBorder.graphics
      //   .s(this.textColor).f('rgba(0, 0, 0, 0.1)').ss(5, 'round') // fill and stroke style
      //   .rr(
      //     playText.x - 15,
      //     playText.y + 5,
      //     playText.getMeasuredWidth() + 30,
      //     playText.getMeasuredHeight() + 15,
      //     3, 3, 3, 3
      //   )
      // this.stage.addChild(playBorder)
      //
      // playBorder.addEventListener('click', () => {
      //   $(window).trigger('transition', GameView)
      // })

      // let infoText = new createjs.Text('Info', '48px monospace', this.textColor)
      // infoText.x = centerX + (infoText.getMeasuredWidth() * 0.25)
      // infoText.y = centerY - (infoText.getMeasuredHeight())
      // this.stage.addChild(infoText)
      //
      // // make a fucking underline by hand
      // let bounds = infoText.getBounds()
      // let infoBorder = new createjs.Shape()//.set({x: bounds.x, y: bounds.y+bounds.height});
      // // infoBorder.bounds = infoText.getBounds()
      // infoBorder.graphics
      //   .s(this.textColor).f('rgba(0, 0, 0, 0.1)').ss(5, 'round') // fill and stroke style
      //   .rr(
      //     infoText.x - 15,
      //     infoText.y + 5,
      //     infoText.getMeasuredWidth() + 30,
      //     infoText.getMeasuredHeight() + 15,
      //     3, 3, 3, 3
      //   )
      // this.stage.addChild(infoBorder)
      //
      // infoBorder.addEventListener('click', () => {
      //   $(window).trigger('transition', InfoView)
      // })
    }
  }]);

  return StartView;
}();

exports.default = StartView;

},{}],11:[function(require,module,exports){
// jshint -W117
// jshint -W097
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(stage, renderer) {
    _classCallCheck(this, View);

    this.stage = stage;
    this.renderer = renderer;
    this.entities = [];
    this.view = this.renderer.view;
  }

  _createClass(View, [{
    key: 'update',
    value: function update() {
      for (var i in this.entities) {
        this.entities[i].update().move();
      }
    }
  }]);

  return View;
}();

exports.default = View;

},{}]},{},[6]);
