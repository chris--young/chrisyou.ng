(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * library/input.js
 * 
 * @description: Input class and global symbols
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

window.space = Symbol['for']('space');
window.left = Symbol['for']('left');
window.up = Symbol['for']('up');
window.right = Symbol['for']('right');

var Input = (function () {

  /**
   * Input()
   * @description: Creates a new Input
   */

  function Input() {
    _classCallCheck(this, Input);

    this.pressed = new Map();

    this.keys = {
      32: space,
      37: left,
      38: up,
      39: right
    };
  }

  /**
   * Input.change()
   * @description: Keeps track of which relevant keys are currently being pressed
   * @param: {Object} event
   */

  _createClass(Input, [{
    key: 'change',
    value: function change(event) {
      var key = this.keys[event.which];

      if (key) {
        event.preventDefault();
        this.pressed.set(key, event.type == "keydown");
      }
    }
  }]);

  return Input;
})();

exports.Input = Input;

},{}],2:[function(require,module,exports){
/**
 * library/model.js
 *
 * @description: Model class, contains a vector array for drawing a line segment and radius for checking collisions
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilitiesMiscellaneousJs = require('../utilities/miscellaneous.js');

var _utilitiesVectorJs = require('../utilities/vector.js');

var Model =

/**
 * Model()
 * @description: Creates a new Model
 * @param: {Number} radius
 * @param: {Vector Array} vectors
 */
function Model() {
  var radius = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var vectors = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  _classCallCheck(this, Model);

  (0, _utilitiesMiscellaneousJs.ensureType)(radius, "Number");
  (0, _utilitiesMiscellaneousJs.ensureType)(vectors, "Array");
  (0, _utilitiesMiscellaneousJs.ensureArrayType)(vectors, _utilitiesVectorJs.Vector);

  this.radius = radius;
  this.vectors = vectors;
};

exports.Model = Model;

},{"../utilities/miscellaneous.js":10,"../utilities/vector.js":11}],3:[function(require,module,exports){
/**
 * library/physics.js
 *
 * @description: Physics class, updates things and checks for collisions
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilitiesVectorJs = require('../utilities/vector.js');

var _utilitiesMiscellaneousJs = require('../utilities/miscellaneous.js');

var _thingsPlayerJs = require('../things/player.js');

var _thingJs = require('./thing.js');

var Physics = (function () {

  /**
   * Phyiscs()
   * @description: Creates a new Phyiscs
   */

  function Physics() {
    _classCallCheck(this, Physics);

    this.friction = 0.01;
  }

  /**
   * Physics.update()
   * @description: Applies user input, moves player, and applies friction
   * @param: {Player} player
   */

  _createClass(Physics, [{
    key: 'update',
    value: function update(player) {
      (0, _utilitiesMiscellaneousJs.ensureType)(player, _thingsPlayerJs.Player);

      if (input.pressed.get(up)) player.accelerate();

      if (input.pressed.get(right)) player.rotate(1);

      if (input.pressed.get(left)) player.rotate(-1);

      if (Math.abs(player.velocity.x) > 0) player.velocity.x = player.velocity.x > 0 ? player.velocity.x - this.friction : player.velocity.x + this.friction;

      if (Math.abs(player.velocity.y) > 0) player.velocity.y = player.velocity.y > 0 ? player.velocity.y - this.friction : player.velocity.y + this.friction;

      this.move(player);
    }

    /**
     * Physics.move()
     * @description: Moves a thing, if it moves off one side of the screen it will come back on the opposite side 
     * @param: {Thing} thing
     */
  }, {
    key: 'move',
    value: function move(thing) {
      (0, _utilitiesMiscellaneousJs.ensureType)(thing, _thingJs.Thing);

      thing.position.x += thing.velocity.x;
      thing.position.y += thing.velocity.y;

      if (thing.position.x > render.canvas.width / 2) thing.position.x -= render.canvas.width;else if (thing.position.x < render.canvas.width / -2) thing.position.x += render.canvas.width;

      if (thing.position.y > render.canvas.height / 2) thing.position.y -= render.canvas.height;else if (thing.position.y < render.canvas.height / -2) thing.position.y += render.canvas.height;
    }

    /**
     * Physics.check()
     * @description: Checks if two things are colliding
     * @param: {Thing} thing1
     * @param: {Thing} thing2
     * @returns: {Boolean{
     */
  }, {
    key: 'check',
    value: function check(thing1, thing2) {
      (0, _utilitiesMiscellaneousJs.ensureType)(thing1, _thingJs.Thing);
      (0, _utilitiesMiscellaneousJs.ensureType)(thing2, _thingJs.Thing);

      return _utilitiesVectorJs.Vector.distance(thing1.position, thing2.position) < thing1.model.radius + thing2.model.radius;
    }
  }]);

  return Physics;
})();

exports.Physics = Physics;

},{"../things/player.js":9,"../utilities/miscellaneous.js":10,"../utilities/vector.js":11,"./thing.js":5}],4:[function(require,module,exports){
/**
 * library/render.js
 *
 * @description: Render class
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilitiesMiscellaneousJs = require('../utilities/miscellaneous.js');

var _thingJs = require('./thing.js');

var Render = (function () {

  /**
   * Render()
   * @description: Create a new Render
   */

  function Render() {
    _classCallCheck(this, Render);

    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");

    if (!this.context) {
      document.querySelector("#unsupported").style.display = "block";
      throw new Error("Unsupported browser: failed to initialize CanvasRenderingContext2D");
    }

    this.canvas.height = document.body.clientHeight;
    this.canvas.width = document.body.clientWidth;

    this.backgroundColor = "#000";
    this.foregroundColor = "#fff";

    this.context.font = "18px Hyperspace";
    this.context.lineWidth = 1.5;
  }

  /**
   * Render.clear()
   * @description: Clears the canvas with a black rectangle
   */

  _createClass(Render, [{
    key: 'clear',
    value: function clear() {
      this.context.fillStyle = this.backgroundColor;
      this.context.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);

      this.context.fillStyle = this.foregroundColor;
      this.context.fillText(player.score, 10, 25);
    }

    /**
     * Render.draw()
     * @description: Paints a Thing on the canvas
     * @param: {Thing} thing
     */
  }, {
    key: 'draw',
    value: function draw(thing) {
      (0, _utilitiesMiscellaneousJs.ensureType)(thing, _thingJs.Thing);

      this.context.save();

      this.context.translate(this.canvas.width / 2 + thing.position.x, this.canvas.height / 2 + thing.position.y);
      this.context.rotate(thing.rotation);
      this.context.beginPath();

      this.context.moveTo(thing.model.vectors[0].x, thing.model.vectors[0].y);
      for (var index = 1; index < thing.model.vectors.length; index++) this.context.lineTo(thing.model.vectors[index].x, thing.model.vectors[index].y);

      this.context.closePath();
      this.context.strokeStyle = this.foregroundColor;
      this.context.stroke();

      this.context.restore();
    }
  }]);

  return Render;
})();

exports.Render = Render;

},{"../utilities/miscellaneous.js":10,"./thing.js":5}],5:[function(require,module,exports){
/**
 * library/thing.js
 *
 * @description: Thing base class for game objects
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilitiesVectorJs = require('../utilities/vector.js');

var _utilitiesMiscellaneousJs = require('../utilities/miscellaneous.js');

var _modelJs = require('./model.js');

var Thing =

/**
 * Thing()
 * @description: Creates a new Thing
 */
function Thing() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$position = _ref.position;
  var position = _ref$position === undefined ? new _utilitiesVectorJs.Vector() : _ref$position;
  var _ref$velocity = _ref.velocity;
  var velocity = _ref$velocity === undefined ? new _utilitiesVectorJs.Vector() : _ref$velocity;
  var _ref$rotation = _ref.rotation;
  var rotation = _ref$rotation === undefined ? 0 : _ref$rotation;
  var _ref$model = _ref.model;
  var model = _ref$model === undefined ? new _modelJs.Model() : _ref$model;

  _classCallCheck(this, Thing);

  (0, _utilitiesMiscellaneousJs.ensureType)(position, _utilitiesVectorJs.Vector);
  (0, _utilitiesMiscellaneousJs.ensureType)(velocity, _utilitiesVectorJs.Vector);
  (0, _utilitiesMiscellaneousJs.ensureType)(rotation, "Number");
  (0, _utilitiesMiscellaneousJs.ensureType)(model, _modelJs.Model);

  this.position = position;
  this.velocity = velocity;
  this.rotation = rotation;
  this.model = model;
};

exports.Thing = Thing;

},{"../utilities/miscellaneous.js":10,"../utilities/vector.js":11,"./model.js":2}],6:[function(require,module,exports){
/**
 * main.js
 *
 * @description: Main script
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

var _libraryRenderJs = require('./library/render.js');

var _libraryPhysicsJs = require('./library/physics.js');

var _libraryInputJs = require('./library/input.js');

var _thingsPlayerJs = require('./things/player.js');

var _thingsAsteroidJs = require('./things/asteroid.js');

var _thingsBulletJs = require('./things/bullet.js');

/**
 * initialize()
 * @description: Sets up the game on window load
 */
function initialize() {
  window.render = new _libraryRenderJs.Render();
  window.physics = new _libraryPhysicsJs.Physics();
  window.player = new _thingsPlayerJs.Player();
  window.input = new _libraryInputJs.Input();

  window.bullets = [];
  window.asteroids = [];

  window.addEventListener("keydown", input.change.bind(input));
  window.addEventListener("keyup", input.change.bind(input));

  loop();
}

/**
 * loop()
 * @description: The main game loop, updates and draws things
 */
function loop() {
  render.clear();

  physics.update(player);
  render.draw(player);

  bullets.forEach(function (bullet, index1) {
    if (bullet.check()) bullets.splice(index1, 1);

    physics.move(bullet);
    render.draw(bullet);

    asteroids.forEach(function (asteroid, index2) {
      if (physics.check(bullet, asteroid)) {
        asteroids.splice(index2, 1);
        bullets.splice(index1, 1);
        player.score++;
      }
    });
  });

  if (input.pressed.get(space)) player.shoot();

  asteroids.forEach(function (asteroid) {
    physics.move(asteroid);
    render.draw(asteroid);
  });

  if (!asteroids.length) generateAsteroids();

  requestAnimationFrame(loop);
}

/**
 * generateAsteroids()
 * @description: Adds a new group of asteroids to the game
 * @param: {Number} amount
 */
function generateAsteroids() {
  for (var count = 0; count < 8; count++) {
    asteroids.push(new _thingsAsteroidJs.Asteroid());
  }
}

if (!window.addEventListener) {
  var unsupported = document.querySelector("#unsupported");
  unsupported.style.display = "block";
} else {
  window.addEventListener("load", initialize);
}

},{"./library/input.js":1,"./library/physics.js":3,"./library/render.js":4,"./things/asteroid.js":7,"./things/bullet.js":8,"./things/player.js":9}],7:[function(require,module,exports){
/**
 * things/asteroid.js
 *
 * @description: Asteroid class
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilitiesVectorJs = require('../utilities/vector.js');

var _libraryThingJs = require('../library/thing.js');

var _libraryModelJs = require('../library/model.js');

var Asteroid = (function (_Thing) {
  _inherits(Asteroid, _Thing);

  /**
   * Asteroid()
   * Creates a new Asteroid
   */

  function Asteroid() {
    _classCallCheck(this, Asteroid);

    var position = new _utilitiesVectorJs.Vector(Math.floor(Math.random() * render.canvas.width) - render.canvas.width / 2, Math.floor(Math.random() * render.canvas.height) - render.canvas.height / 2);

    var velocity = new _utilitiesVectorJs.Vector(Math.floor(Math.random() * 4) - 2, Math.floor(Math.random() * 4) - 2);

    var rotation = Math.PI / 4 * Math.floor(Math.random() * 5) + 1;

    var model = models[Math.random() * models.length | 0];

    _get(Object.getPrototypeOf(Asteroid.prototype), 'constructor', this).call(this, { position: position, velocity: velocity, rotation: rotation, model: model });
  }

  return Asteroid;
})(_libraryThingJs.Thing);

exports.Asteroid = Asteroid;

var models = [new _libraryModelJs.Model(10, [new _utilitiesVectorJs.Vector(1, 6), new _utilitiesVectorJs.Vector(-6, 12), new _utilitiesVectorJs.Vector(-13, 6), new _utilitiesVectorJs.Vector(-13, -5), new _utilitiesVectorJs.Vector(-7, -11), new _utilitiesVectorJs.Vector(4, -11), new _utilitiesVectorJs.Vector(13, -6), new _utilitiesVectorJs.Vector(10, 1), new _utilitiesVectorJs.Vector(13, 6), new _utilitiesVectorJs.Vector(7, 12)]), new _libraryModelJs.Model(10, [new _utilitiesVectorJs.Vector(-1, 8), new _utilitiesVectorJs.Vector(-6, 12), new _utilitiesVectorJs.Vector(-13, 6), new _utilitiesVectorJs.Vector(-9, 1), new _utilitiesVectorJs.Vector(-13, -6), new _utilitiesVectorJs.Vector(-6, -12), new _utilitiesVectorJs.Vector(-3, -8), new _utilitiesVectorJs.Vector(6, -11), new _utilitiesVectorJs.Vector(13, -3), new _utilitiesVectorJs.Vector(6, 3), new _utilitiesVectorJs.Vector(13, 6), new _utilitiesVectorJs.Vector(6, 12)]), new _libraryModelJs.Model(10, [new _utilitiesVectorJs.Vector(-8, 12), new _utilitiesVectorJs.Vector(-4, 8), new _utilitiesVectorJs.Vector(-4, 6), new _utilitiesVectorJs.Vector(-13, 6), new _utilitiesVectorJs.Vector(-13, -3), new _utilitiesVectorJs.Vector(-6, -11), new _utilitiesVectorJs.Vector(3, -8), new _utilitiesVectorJs.Vector(7, -11), new _utilitiesVectorJs.Vector(13, -5), new _utilitiesVectorJs.Vector(4, 1), new _utilitiesVectorJs.Vector(13, 5), new _utilitiesVectorJs.Vector(4, 12)])];

},{"../library/model.js":2,"../library/thing.js":5,"../utilities/vector.js":11}],8:[function(require,module,exports){
/**
 * things/bullet.js
 *
 * @description: Bullet class
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilitiesVectorJs = require('../utilities/vector.js');

var _libraryThingJs = require('../library/thing.js');

var _libraryModelJs = require('../library/model.js');

var Bullet = (function (_Thing) {
  _inherits(Bullet, _Thing);

  /**
   * Bullet()
   * @description: Creates a new Bullet based on player position and rotation
   */

  function Bullet() {
    _classCallCheck(this, Bullet);

    var position = new _utilitiesVectorJs.Vector(player.position.x + Math.cos(player.rotation) + 5, player.position.y + Math.sin(player.rotation) + 5);

    var velocity = new _utilitiesVectorJs.Vector(Math.cos(player.rotation) * 4, Math.sin(player.rotation) * 4);

    var rotation = player.rotation;

    var model = new _libraryModelJs.Model(2, [new _utilitiesVectorJs.Vector(0, 2), new _utilitiesVectorJs.Vector(-2, 0), new _utilitiesVectorJs.Vector(0, -2), new _utilitiesVectorJs.Vector(2, 0)]);

    _get(Object.getPrototypeOf(Bullet.prototype), 'constructor', this).call(this, { position: position, velocity: velocity, rotation: rotation, model: model });

    this.shot = Date.now();
    this.shotLength = 1500;
  }

  /**
   * Bullet.check()
   * @description: Determines if a bullet has existed for longer than 1500 milliseconds
   * @returns {Number}
   */

  _createClass(Bullet, [{
    key: 'check',
    value: function check() {
      return Date.now() - this.shot > this.shotLength;
    }
  }]);

  return Bullet;
})(_libraryThingJs.Thing);

exports.Bullet = Bullet;

},{"../library/model.js":2,"../library/thing.js":5,"../utilities/vector.js":11}],9:[function(require,module,exports){
/**
 * things/player.js
 *
 * @description: Player class 
 * @author: Chris Young (mail@chrisyou.ng)
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _utilitiesMiscellaneousJs = require('../utilities/miscellaneous.js');

var _utilitiesVectorJs = require('../utilities/vector.js');

var _thingsBulletJs = require('../things/bullet.js');

var _libraryThingJs = require('../library/thing.js');

var _libraryModelJs = require('../library/model.js');

var Player = (function (_Thing) {
  _inherits(Player, _Thing);

  /**
   * Player()
   * @description: Creates a new Player
   */

  function Player() {
    _classCallCheck(this, Player);

    var rotation = Math.PI / -2;

    var model = new _libraryModelJs.Model(10, [new _utilitiesVectorJs.Vector(10, 0), new _utilitiesVectorJs.Vector(-10, 8), new _utilitiesVectorJs.Vector(-10, -8)]);

    _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, { rotation: rotation, model: model });

    this.shot;
    this.shotLength = 250;

    this.score = 0;
  }

  /**
   * Player.accelerate()
   * @description: Increases the player's velocity
   */

  _createClass(Player, [{
    key: 'accelerate',
    value: function accelerate() {
      this.velocity.x = Math.cos(this.rotation) * 2;
      this.velocity.y = Math.sin(this.rotation) * 2;
    }

    /**
     * Player.rotate()
     * @description: Increases the player's rotation based on direction
     * @param: {Number} direction
     */
  }, {
    key: 'rotate',
    value: function rotate(direction) {
      (0, _utilitiesMiscellaneousJs.ensureType)(direction, "Number");

      if (direction > 0) this.rotation = this.rotation < Math.PI * 2 ? this.rotation + Math.PI / 180 * 6 : 0;else this.rotation = this.rotation > 0 ? this.rotation - Math.PI / 180 * 6 : Math.PI * 2;
    }

    /**
     * Player.shoot()
     * @description: Creates a new bullet if enough time has elapsed since the last shot 
     */
  }, {
    key: 'shoot',
    value: function shoot() {
      if (Date.now() - this.shot < this.shotLength) return;

      bullets.push(new _thingsBulletJs.Bullet());
      this.shot = Date.now();
    }
  }]);

  return Player;
})(_libraryThingJs.Thing);

exports.Player = Player;

},{"../library/model.js":2,"../library/thing.js":5,"../things/bullet.js":8,"../utilities/miscellaneous.js":10,"../utilities/vector.js":11}],10:[function(require,module,exports){
/**
 * utilities/miscellaneous.js
 *
 * @description: Helper functions to check variable type
 * @author: Chris Young (mail@chrisyou.ng)
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureType = ensureType;
exports.ensureArrayType = ensureArrayType;
var types = ["Object", "Number", "Array", "String", "Boolean", "Function"];

/**
 * ensureType()
 * @description: Throws an exception if variable is unexpected type
 * @param: {*} variable
 * @param: {String|Object} type
 */

function ensureType(variable, type) {
  if (!variable) throw new ReferenceError("Unexpected undefined value for 'variable'");
  if (!type) throw new ReferenceError("Unexpected undefined value for 'type'");

  var found = Object.prototype.toString.call(variable);

  if (~types.indexOf(type)) {
    if (found !== "[object " + type + "]") throw new TypeError("Invalid type: expected '" + type + "' found '" + found + "'");
  } else {
    if (variable instanceof type !== true) throw new TypeError("Invalid type: expected instance of '" + type + "'");
  }
}

/**
 * ensureArrayType()
 * @description: Throws an errory if any element in array in unexpected type
 * @param: {Array} array
 * @param: {String|Object} type
 */

function ensureArrayType(array, type) {
  ensureType(array, "Array");
  array.forEach(function (element) {
    return ensureType(element, type);
  });
}

},{}],11:[function(require,module,exports){
/**
 * utilities/vector.js
 *
 * @description: 2D point utilitiy class
 * @author: Chris Young (mail@chrisyou.ng)
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _miscellaneousJs = require('./miscellaneous.js');

var Vector = (function () {

  /**
   * Vector()
   * @description: Creates a new Vector 
   * @param: {Number} x
   * @param: {Number} y
   */

  function Vector() {
    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, Vector);

    if (x) (0, _miscellaneousJs.ensureType)(x, "Number");
    if (y) (0, _miscellaneousJs.ensureType)(y, "Number");

    this.x = x;
    this.y = y;
  }

  /**
   * Vector.distance()
   * @description: Calculates the distance between two points
   * @param: {Vector} vector1
   * @param: {Vector} vector2
   * @returns: {Number}
   */

  _createClass(Vector, null, [{
    key: "distance",
    value: function distance(vector1, vector2) {
      (0, _miscellaneousJs.ensureType)(vector1, Vector);
      (0, _miscellaneousJs.ensureType)(vector2, Vector);

      return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) * Math.pow(vector1.y - vector2.y, 2));
    }
  }]);

  return Vector;
})();

exports.Vector = Vector;

},{"./miscellaneous.js":10}]},{},[6]);
