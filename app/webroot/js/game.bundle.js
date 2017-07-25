webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONFIG = [];

CONFIG.COLORS = [{ name: "赤", color: "#eb0d0d", class: "red" }, { name: "青", color: "#0879ff", class: "blue" }, { name: "黄", color: "#ccdd09", class: "yellow" }, { name: "緑", color: "#00c926", class: "green" }, { name: "橙", color: "#ee861a", class: "orange" }, { name: "紫", color: "#b514e6", class: "purple" }, { name: "茶", color: "#8c6604", class: "brown" }, { name: "黒", color: "#000", class: "black" }];

exports.CONFIG = CONFIG;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _underscore = __webpack_require__(1);

var _underscore2 = _interopRequireDefault(_underscore);

var _config = __webpack_require__(2);

var _CardUI = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    // 配列初期化
    this.colors = [];
    this.cardUI = new _CardUI.CardUI();

    this.bind();
    this.setColors();
  }

  _createClass(Game, [{
    key: 'bind',
    value: function bind() {
      var _this = this;

      this.cardUI.on('selected', function (clickTargetIndex) {
        _this.openCard(clickTargetIndex);
      }).on('opened', function () {
        _this.openedCard();
      });
    }

    /**
     * 色情報の配列を2つ分格納してシャッフル
     */

  }, {
    key: 'setColors',
    value: function setColors() {

      this.colors = _config.CONFIG.COLORS.concat(_config.CONFIG.COLORS);

      this.colors = _underscore2.default.shuffle(this.colors);
    }
  }, {
    key: 'openCard',
    value: function openCard(clickTargetIndex) {

      this.cardUI.open(clickTargetIndex, this.colors);
    }
  }, {
    key: 'openedCard',
    value: function openedCard() {

      var $openCards = (0, _jquery2.default)('li.open');
      var $openCardsLength = $openCards.length;

      if ($openCardsLength === 2) {
        var firstCard = $openCards[0];
        var secondCard = $openCards[1];

        var firstCardColor = (0, _jquery2.default)(firstCard).text();
        var secondCardColor = (0, _jquery2.default)(secondCard).text();
        this.judge(firstCardColor, secondCardColor);
      }
    }
  }, {
    key: 'judge',
    value: function judge(firstCardColor, secondCardColor) {

      if (firstCardColor === secondCardColor) {
        this.match();
      } else {
        this.cardUI.close();
      }
    }
  }, {
    key: 'match',
    value: function match() {

      var $openCards = (0, _jquery2.default)('li.open');
      $openCards.removeClass('open');
      $openCards.addClass('match');

      var matchCardsLength = (0, _jquery2.default)('li.match').length;
      if (matchCardsLength === 16) {
        alert('success !');
        this.restart();
      }
    }
  }, {
    key: 'restart',
    value: function restart() {

      this.setColors();
      this.cardUI.closeAllCards();
    }
  }]);

  return Game;
}();

new Game();

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardUI = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(0);

var _jquery2 = _interopRequireDefault(_jquery);

var _events2 = __webpack_require__(10);

var _events3 = _interopRequireDefault(_events2);

var _velocityAnimate = __webpack_require__(3);

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

__webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardUI = exports.CardUI = function (_events) {
  _inherits(CardUI, _events);

  function CardUI() {
    _classCallCheck(this, CardUI);

    var _this = _possibleConstructorReturn(this, (CardUI.__proto__ || Object.getPrototypeOf(CardUI)).call(this));

    (0, _jquery2.default)(function () {

      var $cards = (0, _jquery2.default)('li');

      $cards.on('click', function (e) {

        var clickTarget = e.currentTarget;

        // 既に開かれている場合は処理しない
        if (!(0, _jquery2.default)(clickTarget).hasClass('open')) {
          var clickTargetIndex = $cards.index((0, _jquery2.default)(clickTarget));
          _this.emit('selected', clickTargetIndex);
        }
      });
    });

    return _this;
  }

  _createClass(CardUI, [{
    key: 'open',
    value: function open(clickTargetIndex, colors) {
      var _this2 = this;

      var colorClass = colors[clickTargetIndex].class;
      var colorName = colors[clickTargetIndex].name;
      var $targetCard = (0, _jquery2.default)('li').eq(clickTargetIndex);

      (0, _velocityAnimate2.default)($targetCard, {
        width: [0, 200],
        marginLeft: [100, 0],
        marginRight: [100, 20]
      }, {
        duration: 200,
        complete: function complete() {

          $targetCard.addClass(colorClass + ' open');
          $targetCard.html(colorName);

          (0, _velocityAnimate2.default)($targetCard, {
            width: [200, 0],
            marginLeft: [0, 100],
            marginRight: [20, 100]
          }, {
            duration: 200,
            complete: function complete() {
              _this2.emit('opened');
            }
          });
        }
      });
    }
  }, {
    key: 'close',
    value: function close() {

      var $openCards = (0, _jquery2.default)('li.open');
      (0, _velocityAnimate2.default)($openCards, {
        width: [0, 200],
        marginLeft: [100, 0],
        marginRight: [100, 20]
      }, {
        duration: 200,
        delay: 400,
        complete: function complete() {

          $openCards.removeClass();
          $openCards.html('?');

          (0, _velocityAnimate2.default)($openCards, {
            width: [200, 0],
            marginLeft: [0, 100],
            marginRight: [20, 100]
          }, {
            duration: 200
          });
        }
      });
    }
  }, {
    key: 'closeAllCards',
    value: function closeAllCards() {

      var cards = (0, _jquery2.default)('li');
      (0, _velocityAnimate2.default)(cards, {
        width: [0, 200],
        marginLeft: [100, 0],
        marginRight: [100, 20]
      }, {
        duration: 200,
        delay: 400,
        complete: function complete() {

          cards.removeClass();
          cards.html('?');

          (0, _velocityAnimate2.default)(cards, {
            width: [200, 0],
            marginLeft: [0, 100],
            marginRight: [20, 100]
          }, {
            duration: 200
          });
        }
      });
    }
  }]);

  return CardUI;
}(_events3.default);

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**********************
 Velocity UI Pack
 **********************/

/* VelocityJS.org UI Pack (5.2.0). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License. Portions copyright Daniel Eden, Christian Pucci. */

(function(factory) {
	"use strict";
	/* CommonJS module. */
	if (true) {
		module.exports = factory();
		/* AMD module. */
	} else if (typeof define === "function" && define.amd) {
		define(["velocity"], factory);
		/* Browser globals. */
	} else {
		factory();
	}
}(function() {
	"use strict";
	return function(global, window, document, undefined) {

		/*************
		 Checks
		 *************/
		var Velocity = global.Velocity;

		if (!Velocity || !Velocity.Utilities) {
			if (window.console) {
				console.log("Velocity UI Pack: Velocity must be loaded first. Aborting.");
			}
			return;
		}
		var $ = Velocity.Utilities;

		var velocityVersion = Velocity.version,
				requiredVersion = {major: 1, minor: 1, patch: 0};

		function greaterSemver(primary, secondary) {
			var versionInts = [];

			if (!primary || !secondary) {
				return false;
			}

			$.each([primary, secondary], function(i, versionObject) {
				var versionIntsComponents = [];

				$.each(versionObject, function(component, value) {
					while (value.toString().length < 5) {
						value = "0" + value;
					}
					versionIntsComponents.push(value);
				});

				versionInts.push(versionIntsComponents.join(""));
			});

			return (parseFloat(versionInts[0]) > parseFloat(versionInts[1]));
		}

		if (greaterSemver(requiredVersion, velocityVersion)) {
			var abortError = "Velocity UI Pack: You need to update Velocity (velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
			alert(abortError);
			throw new Error(abortError);
		}

		/************************
		 Effect Registration
		 ************************/

		/* Note: RegisterUI is a legacy name. */
		Velocity.RegisterEffect = Velocity.RegisterUI = function(effectName, properties) {
			/* Animate the expansion/contraction of the elements' parent's height for In/Out effects. */
			function animateParentHeight(elements, direction, totalDuration, stagger) {
				var totalHeightDelta = 0,
						parentNode;

				/* Sum the total height (including padding and margin) of all targeted elements. */
				$.each(elements.nodeType ? [elements] : elements, function(i, element) {
					if (stagger) {
						/* Increase the totalDuration by the successive delay amounts produced by the stagger option. */
						totalDuration += i * stagger;
					}

					parentNode = element.parentNode;

					var propertiesToSum = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"];

					/* If box-sizing is border-box, the height already includes padding and margin */
					if (Velocity.CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() === "border-box") {
						propertiesToSum = ["height"];
					}

					$.each(propertiesToSum, function(i, property) {
						totalHeightDelta += parseFloat(Velocity.CSS.getPropertyValue(element, property));
					});
				});

				/* Animate the parent element's height adjustment (with a varying duration multiplier for aesthetic benefits). */
				Velocity.animate(
						parentNode,
						{height: (direction === "In" ? "+" : "-") + "=" + totalHeightDelta},
						{queue: false, easing: "ease-in-out", duration: totalDuration * (direction === "In" ? 0.6 : 1)}
				);
			}

			/* Register a custom redirect for each effect. */
			Velocity.Redirects[effectName] = function(element, redirectOptions, elementsIndex, elementsSize, elements, promiseData, loop) {
				var finalElement = (elementsIndex === elementsSize - 1),
						totalDuration = 0;

				loop = loop || properties.loop;
				if (typeof properties.defaultDuration === "function") {
					properties.defaultDuration = properties.defaultDuration.call(elements, elements);
				} else {
					properties.defaultDuration = parseFloat(properties.defaultDuration);
				}

				/* Get the total duration used, so we can share it out with everything that doesn't have a duration */
				for (var callIndex = 0; callIndex < properties.calls.length; callIndex++) {
					durationPercentage = properties.calls[callIndex][1];
					if (typeof durationPercentage === "number") {
						totalDuration += durationPercentage;
					}
				}
				var shareDuration = totalDuration >= 1 ? 0 : properties.calls.length ? (1 - totalDuration) / properties.calls.length : 1;

				/* Iterate through each effect's call array. */
				for (callIndex = 0; callIndex < properties.calls.length; callIndex++) {
					var call = properties.calls[callIndex],
							propertyMap = call[0],
							redirectDuration = 1000,
							durationPercentage = call[1],
							callOptions = call[2] || {},
							opts = {};

					if (redirectOptions.duration !== undefined) {
						redirectDuration = redirectOptions.duration;
					} else if (properties.defaultDuration !== undefined) {
						redirectDuration = properties.defaultDuration;
					}

					/* Assign the whitelisted per-call options. */
					opts.duration = redirectDuration * (typeof durationPercentage === "number" ? durationPercentage : shareDuration);
					opts.queue = redirectOptions.queue || "";
					opts.easing = callOptions.easing || "ease";
					opts.delay = parseFloat(callOptions.delay) || 0;
					opts.loop = !properties.loop && callOptions.loop;
					opts._cacheValues = callOptions._cacheValues || true;

					/* Special processing for the first effect call. */
					if (callIndex === 0) {
						/* If a delay was passed into the redirect, combine it with the first call's delay. */
						opts.delay += (parseFloat(redirectOptions.delay) || 0);

						if (elementsIndex === 0) {
							opts.begin = function() {
								/* Only trigger a begin callback on the first effect call with the first element in the set. */
								if (redirectOptions.begin) {
									redirectOptions.begin.call(elements, elements);
								}

								var direction = effectName.match(/(In|Out)$/);

								/* Make "in" transitioning elements invisible immediately so that there's no FOUC between now
								 and the first RAF tick. */
								if ((direction && direction[0] === "In") && propertyMap.opacity !== undefined) {
									$.each(elements.nodeType ? [elements] : elements, function(i, element) {
										Velocity.CSS.setPropertyValue(element, "opacity", 0);
									});
								}

								/* Only trigger animateParentHeight() if we're using an In/Out transition. */
								if (redirectOptions.animateParentHeight && direction) {
									animateParentHeight(elements, direction[0], redirectDuration + opts.delay, redirectOptions.stagger);
								}
							};
						}

						/* If the user isn't overriding the display option, default to "auto" for "In"-suffixed transitions. */
						if (redirectOptions.display !== null) {
							if (redirectOptions.display !== undefined && redirectOptions.display !== "none") {
								opts.display = redirectOptions.display;
							} else if (/In$/.test(effectName)) {
								/* Inline elements cannot be subjected to transforms, so we switch them to inline-block. */
								var defaultDisplay = Velocity.CSS.Values.getDisplayType(element);
								opts.display = (defaultDisplay === "inline") ? "inline-block" : defaultDisplay;
							}
						}

						if (redirectOptions.visibility && redirectOptions.visibility !== "hidden") {
							opts.visibility = redirectOptions.visibility;
						}
					}

					/* Special processing for the last effect call. */
					if (callIndex === properties.calls.length - 1) {
						/* Append promise resolving onto the user's redirect callback. */
						var injectFinalCallbacks = function() {
							if ((redirectOptions.display === undefined || redirectOptions.display === "none") && /Out$/.test(effectName)) {
								$.each(elements.nodeType ? [elements] : elements, function(i, element) {
									Velocity.CSS.setPropertyValue(element, "display", "none");
								});
							}
							if (redirectOptions.complete) {
								redirectOptions.complete.call(elements, elements);
							}
							if (promiseData) {
								promiseData.resolver(elements || element);
							}
						};

						opts.complete = function() {
							if (loop) {
								Velocity.Redirects[effectName](element, redirectOptions, elementsIndex, elementsSize, elements, promiseData, loop === true ? true : Math.max(0, loop - 1));
							}
							if (properties.reset) {
								for (var resetProperty in properties.reset) {
									if (!properties.reset.hasOwnProperty(resetProperty)) {
										continue;
									}
									var resetValue = properties.reset[resetProperty];

									/* Format each non-array value in the reset property map to [ value, value ] so that changes apply
									 immediately and DOM querying is avoided (via forcefeeding). */
									/* Note: Don't forcefeed hooks, otherwise their hook roots will be defaulted to their null values. */
									if (Velocity.CSS.Hooks.registered[resetProperty] === undefined && (typeof resetValue === "string" || typeof resetValue === "number")) {
										properties.reset[resetProperty] = [properties.reset[resetProperty], properties.reset[resetProperty]];
									}
								}

								/* So that the reset values are applied instantly upon the next rAF tick, use a zero duration and parallel queueing. */
								var resetOptions = {duration: 0, queue: false};

								/* Since the reset option uses up the complete callback, we trigger the user's complete callback at the end of ours. */
								if (finalElement) {
									resetOptions.complete = injectFinalCallbacks;
								}

								Velocity.animate(element, properties.reset, resetOptions);
								/* Only trigger the user's complete callback on the last effect call with the last element in the set. */
							} else if (finalElement) {
								injectFinalCallbacks();
							}
						};

						if (redirectOptions.visibility === "hidden") {
							opts.visibility = redirectOptions.visibility;
						}
					}

					Velocity.animate(element, propertyMap, opts);
				}
			};

			/* Return the Velocity object so that RegisterUI calls can be chained. */
			return Velocity;
		};

		/*********************
		 Packaged Effects
		 *********************/

		/* Externalize the packagedEffects data so that they can optionally be modified and re-registered. */
		/* Support: <=IE8: Callouts will have no effect, and transitions will simply fade in/out. IE9/Android 2.3: Most effects are fully supported, the rest fade in/out. All other browsers: full support. */
		Velocity.RegisterEffect.packagedEffects =
				{
					/* Animate.css */
					"callout.bounce": {
						defaultDuration: 550,
						calls: [
							[{translateY: -30}, 0.25],
							[{translateY: 0}, 0.125],
							[{translateY: -15}, 0.125],
							[{translateY: 0}, 0.25]
						]
					},
					/* Animate.css */
					"callout.shake": {
						defaultDuration: 800,
						calls: [
							[{translateX: -11}],
							[{translateX: 11}],
							[{translateX: -11}],
							[{translateX: 11}],
							[{translateX: -11}],
							[{translateX: 11}],
							[{translateX: -11}],
							[{translateX: 0}]
						]
					},
					/* Animate.css */
					"callout.flash": {
						defaultDuration: 1100,
						calls: [
							[{opacity: [0, "easeInOutQuad", 1]}],
							[{opacity: [1, "easeInOutQuad"]}],
							[{opacity: [0, "easeInOutQuad"]}],
							[{opacity: [1, "easeInOutQuad"]}]
						]
					},
					/* Animate.css */
					"callout.pulse": {
						defaultDuration: 825,
						calls: [
							[{scaleX: 1.1, scaleY: 1.1}, 0.50, {easing: "easeInExpo"}],
							[{scaleX: 1, scaleY: 1}, 0.50]
						]
					},
					/* Animate.css */
					"callout.swing": {
						defaultDuration: 950,
						calls: [
							[{rotateZ: 15}],
							[{rotateZ: -10}],
							[{rotateZ: 5}],
							[{rotateZ: -5}],
							[{rotateZ: 0}]
						]
					},
					/* Animate.css */
					"callout.tada": {
						defaultDuration: 1000,
						calls: [
							[{scaleX: 0.9, scaleY: 0.9, rotateZ: -3}, 0.10],
							[{scaleX: 1.1, scaleY: 1.1, rotateZ: 3}, 0.10],
							[{scaleX: 1.1, scaleY: 1.1, rotateZ: -3}, 0.10],
							["reverse", 0.125],
							["reverse", 0.125],
							["reverse", 0.125],
							["reverse", 0.125],
							["reverse", 0.125],
							[{scaleX: 1, scaleY: 1, rotateZ: 0}, 0.20]
						]
					},
					"transition.fadeIn": {
						defaultDuration: 500,
						calls: [
							[{opacity: [1, 0]}]
						]
					},
					"transition.fadeOut": {
						defaultDuration: 500,
						calls: [
							[{opacity: [0, 1]}]
						]
					},
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.flipXIn": {
						defaultDuration: 700,
						calls: [
							[{opacity: [1, 0], transformPerspective: [800, 800], rotateY: [0, -55]}]
						],
						reset: {transformPerspective: 0}
					},
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.flipXOut": {
						defaultDuration: 700,
						calls: [
							[{opacity: [0, 1], transformPerspective: [800, 800], rotateY: 55}]
						],
						reset: {transformPerspective: 0, rotateY: 0}
					},
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.flipYIn": {
						defaultDuration: 800,
						calls: [
							[{opacity: [1, 0], transformPerspective: [800, 800], rotateX: [0, -45]}]
						],
						reset: {transformPerspective: 0}
					},
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.flipYOut": {
						defaultDuration: 800,
						calls: [
							[{opacity: [0, 1], transformPerspective: [800, 800], rotateX: 25}]
						],
						reset: {transformPerspective: 0, rotateX: 0}
					},
					/* Animate.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.flipBounceXIn": {
						defaultDuration: 900,
						calls: [
							[{opacity: [0.725, 0], transformPerspective: [400, 400], rotateY: [-10, 90]}, 0.50],
							[{opacity: 0.80, rotateY: 10}, 0.25],
							[{opacity: 1, rotateY: 0}, 0.25]
						],
						reset: {transformPerspective: 0}
					},
					/* Animate.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.flipBounceXOut": {
						defaultDuration: 800,
						calls: [
							[{opacity: [0.9, 1], transformPerspective: [400, 400], rotateY: -10}],
							[{opacity: 0, rotateY: 90}]
						],
						reset: {transformPerspective: 0, rotateY: 0}
					},
					/* Animate.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.flipBounceYIn": {
						defaultDuration: 850,
						calls: [
							[{opacity: [0.725, 0], transformPerspective: [400, 400], rotateX: [-10, 90]}, 0.50],
							[{opacity: 0.80, rotateX: 10}, 0.25],
							[{opacity: 1, rotateX: 0}, 0.25]
						],
						reset: {transformPerspective: 0}
					},
					/* Animate.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.flipBounceYOut": {
						defaultDuration: 800,
						calls: [
							[{opacity: [0.9, 1], transformPerspective: [400, 400], rotateX: -15}],
							[{opacity: 0, rotateX: 90}]
						],
						reset: {transformPerspective: 0, rotateX: 0}
					},
					/* Magic.css */
					"transition.swoopIn": {
						defaultDuration: 850,
						calls: [
							[{opacity: [1, 0], transformOriginX: ["100%", "50%"], transformOriginY: ["100%", "100%"], scaleX: [1, 0], scaleY: [1, 0], translateX: [0, -700], translateZ: 0}]
						],
						reset: {transformOriginX: "50%", transformOriginY: "50%"}
					},
					/* Magic.css */
					"transition.swoopOut": {
						defaultDuration: 850,
						calls: [
							[{opacity: [0, 1], transformOriginX: ["50%", "100%"], transformOriginY: ["100%", "100%"], scaleX: 0, scaleY: 0, translateX: -700, translateZ: 0}]
						],
						reset: {transformOriginX: "50%", transformOriginY: "50%", scaleX: 1, scaleY: 1, translateX: 0}
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */
					"transition.whirlIn": {
						defaultDuration: 850,
						calls: [
							[{opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, 0], scaleY: [1, 0], rotateY: [0, 160]}, 1, {easing: "easeInOutSine"}]
						]
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3. (Fades and scales only.) */
					"transition.whirlOut": {
						defaultDuration: 750,
						calls: [
							[{opacity: [0, "easeInOutQuint", 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: 0, scaleY: 0, rotateY: 160}, 1, {easing: "swing"}]
						],
						reset: {scaleX: 1, scaleY: 1, rotateY: 0}
					},
					"transition.shrinkIn": {
						defaultDuration: 750,
						calls: [
							[{opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, 1.5], scaleY: [1, 1.5], translateZ: 0}]
						]
					},
					"transition.shrinkOut": {
						defaultDuration: 600,
						calls: [
							[{opacity: [0, 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: 1.3, scaleY: 1.3, translateZ: 0}]
						],
						reset: {scaleX: 1, scaleY: 1}
					},
					"transition.expandIn": {
						defaultDuration: 700,
						calls: [
							[{opacity: [1, 0], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: [1, 0.625], scaleY: [1, 0.625], translateZ: 0}]
						]
					},
					"transition.expandOut": {
						defaultDuration: 700,
						calls: [
							[{opacity: [0, 1], transformOriginX: ["50%", "50%"], transformOriginY: ["50%", "50%"], scaleX: 0.5, scaleY: 0.5, translateZ: 0}]
						],
						reset: {scaleX: 1, scaleY: 1}
					},
					/* Animate.css */
					"transition.bounceIn": {
						defaultDuration: 800,
						calls: [
							[{opacity: [1, 0], scaleX: [1.05, 0.3], scaleY: [1.05, 0.3]}, 0.35],
							[{scaleX: 0.9, scaleY: 0.9, translateZ: 0}, 0.20],
							[{scaleX: 1, scaleY: 1}, 0.45]
						]
					},
					/* Animate.css */
					"transition.bounceOut": {
						defaultDuration: 800,
						calls: [
							[{scaleX: 0.95, scaleY: 0.95}, 0.35],
							[{scaleX: 1.1, scaleY: 1.1, translateZ: 0}, 0.35],
							[{opacity: [0, 1], scaleX: 0.3, scaleY: 0.3}, 0.30]
						],
						reset: {scaleX: 1, scaleY: 1}
					},
					/* Animate.css */
					"transition.bounceUpIn": {
						defaultDuration: 800,
						calls: [
							[{opacity: [1, 0], translateY: [-30, 1000]}, 0.60, {easing: "easeOutCirc"}],
							[{translateY: 10}, 0.20],
							[{translateY: 0}, 0.20]
						]
					},
					/* Animate.css */
					"transition.bounceUpOut": {
						defaultDuration: 1000,
						calls: [
							[{translateY: 20}, 0.20],
							[{opacity: [0, "easeInCirc", 1], translateY: -1000}, 0.80]
						],
						reset: {translateY: 0}
					},
					/* Animate.css */
					"transition.bounceDownIn": {
						defaultDuration: 800,
						calls: [
							[{opacity: [1, 0], translateY: [30, -1000]}, 0.60, {easing: "easeOutCirc"}],
							[{translateY: -10}, 0.20],
							[{translateY: 0}, 0.20]
						]
					},
					/* Animate.css */
					"transition.bounceDownOut": {
						defaultDuration: 1000,
						calls: [
							[{translateY: -20}, 0.20],
							[{opacity: [0, "easeInCirc", 1], translateY: 1000}, 0.80]
						],
						reset: {translateY: 0}
					},
					/* Animate.css */
					"transition.bounceLeftIn": {
						defaultDuration: 750,
						calls: [
							[{opacity: [1, 0], translateX: [30, -1250]}, 0.60, {easing: "easeOutCirc"}],
							[{translateX: -10}, 0.20],
							[{translateX: 0}, 0.20]
						]
					},
					/* Animate.css */
					"transition.bounceLeftOut": {
						defaultDuration: 750,
						calls: [
							[{translateX: 30}, 0.20],
							[{opacity: [0, "easeInCirc", 1], translateX: -1250}, 0.80]
						],
						reset: {translateX: 0}
					},
					/* Animate.css */
					"transition.bounceRightIn": {
						defaultDuration: 750,
						calls: [
							[{opacity: [1, 0], translateX: [-30, 1250]}, 0.60, {easing: "easeOutCirc"}],
							[{translateX: 10}, 0.20],
							[{translateX: 0}, 0.20]
						]
					},
					/* Animate.css */
					"transition.bounceRightOut": {
						defaultDuration: 750,
						calls: [
							[{translateX: -30}, 0.20],
							[{opacity: [0, "easeInCirc", 1], translateX: 1250}, 0.80]
						],
						reset: {translateX: 0}
					},
					"transition.slideUpIn": {
						defaultDuration: 900,
						calls: [
							[{opacity: [1, 0], translateY: [0, 20], translateZ: 0}]
						]
					},
					"transition.slideUpOut": {
						defaultDuration: 900,
						calls: [
							[{opacity: [0, 1], translateY: -20, translateZ: 0}]
						],
						reset: {translateY: 0}
					},
					"transition.slideDownIn": {
						defaultDuration: 900,
						calls: [
							[{opacity: [1, 0], translateY: [0, -20], translateZ: 0}]
						]
					},
					"transition.slideDownOut": {
						defaultDuration: 900,
						calls: [
							[{opacity: [0, 1], translateY: 20, translateZ: 0}]
						],
						reset: {translateY: 0}
					},
					"transition.slideLeftIn": {
						defaultDuration: 1000,
						calls: [
							[{opacity: [1, 0], translateX: [0, -20], translateZ: 0}]
						]
					},
					"transition.slideLeftOut": {
						defaultDuration: 1050,
						calls: [
							[{opacity: [0, 1], translateX: -20, translateZ: 0}]
						],
						reset: {translateX: 0}
					},
					"transition.slideRightIn": {
						defaultDuration: 1000,
						calls: [
							[{opacity: [1, 0], translateX: [0, 20], translateZ: 0}]
						]
					},
					"transition.slideRightOut": {
						defaultDuration: 1050,
						calls: [
							[{opacity: [0, 1], translateX: 20, translateZ: 0}]
						],
						reset: {translateX: 0}
					},
					"transition.slideUpBigIn": {
						defaultDuration: 850,
						calls: [
							[{opacity: [1, 0], translateY: [0, 75], translateZ: 0}]
						]
					},
					"transition.slideUpBigOut": {
						defaultDuration: 800,
						calls: [
							[{opacity: [0, 1], translateY: -75, translateZ: 0}]
						],
						reset: {translateY: 0}
					},
					"transition.slideDownBigIn": {
						defaultDuration: 850,
						calls: [
							[{opacity: [1, 0], translateY: [0, -75], translateZ: 0}]
						]
					},
					"transition.slideDownBigOut": {
						defaultDuration: 800,
						calls: [
							[{opacity: [0, 1], translateY: 75, translateZ: 0}]
						],
						reset: {translateY: 0}
					},
					"transition.slideLeftBigIn": {
						defaultDuration: 800,
						calls: [
							[{opacity: [1, 0], translateX: [0, -75], translateZ: 0}]
						]
					},
					"transition.slideLeftBigOut": {
						defaultDuration: 750,
						calls: [
							[{opacity: [0, 1], translateX: -75, translateZ: 0}]
						],
						reset: {translateX: 0}
					},
					"transition.slideRightBigIn": {
						defaultDuration: 800,
						calls: [
							[{opacity: [1, 0], translateX: [0, 75], translateZ: 0}]
						]
					},
					"transition.slideRightBigOut": {
						defaultDuration: 750,
						calls: [
							[{opacity: [0, 1], translateX: 75, translateZ: 0}]
						],
						reset: {translateX: 0}
					},
					/* Magic.css */
					"transition.perspectiveUpIn": {
						defaultDuration: 800,
						calls: [
							[{opacity: [1, 0], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: ["100%", "100%"], rotateX: [0, -180]}]
						],
						reset: {transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%"}
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.perspectiveUpOut": {
						defaultDuration: 850,
						calls: [
							[{opacity: [0, 1], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: ["100%", "100%"], rotateX: -180}]
						],
						reset: {transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0}
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.perspectiveDownIn": {
						defaultDuration: 800,
						calls: [
							[{opacity: [1, 0], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateX: [0, 180]}]
						],
						reset: {transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%"}
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.perspectiveDownOut": {
						defaultDuration: 850,
						calls: [
							[{opacity: [0, 1], transformPerspective: [800, 800], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateX: 180}]
						],
						reset: {transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateX: 0}
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.perspectiveLeftIn": {
						defaultDuration: 950,
						calls: [
							[{opacity: [1, 0], transformPerspective: [2000, 2000], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateY: [0, -180]}]
						],
						reset: {transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%"}
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.perspectiveLeftOut": {
						defaultDuration: 950,
						calls: [
							[{opacity: [0, 1], transformPerspective: [2000, 2000], transformOriginX: [0, 0], transformOriginY: [0, 0], rotateY: -180}]
						],
						reset: {transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0}
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.perspectiveRightIn": {
						defaultDuration: 950,
						calls: [
							[{opacity: [1, 0], transformPerspective: [2000, 2000], transformOriginX: ["100%", "100%"], transformOriginY: [0, 0], rotateY: [0, 180]}]
						],
						reset: {transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%"}
					},
					/* Magic.css */
					/* Support: Loses rotation in IE9/Android 2.3 (fades only). */
					"transition.perspectiveRightOut": {
						defaultDuration: 950,
						calls: [
							[{opacity: [0, 1], transformPerspective: [2000, 2000], transformOriginX: ["100%", "100%"], transformOriginY: [0, 0], rotateY: 180}]
						],
						reset: {transformPerspective: 0, transformOriginX: "50%", transformOriginY: "50%", rotateY: 0}
					}
				};

		/* Register the packaged effects. */
		for (var effectName in Velocity.RegisterEffect.packagedEffects) {
			if (Velocity.RegisterEffect.packagedEffects.hasOwnProperty(effectName)) {
				Velocity.RegisterEffect(effectName, Velocity.RegisterEffect.packagedEffects[effectName]);
			}
		}

		/*********************
		 Sequence Running
		 **********************/

		/* Note: Sequence calls must use Velocity's single-object arguments syntax. */
		Velocity.RunSequence = function(originalSequence) {
			var sequence = $.extend(true, [], originalSequence);

			if (sequence.length > 1) {
				$.each(sequence.reverse(), function(i, currentCall) {
					var nextCall = sequence[i + 1];

					if (nextCall) {
						/* Parallel sequence calls (indicated via sequenceQueue:false) are triggered
						 in the previous call's begin callback. Otherwise, chained calls are normally triggered
						 in the previous call's complete callback. */
						var currentCallOptions = currentCall.o || currentCall.options,
								nextCallOptions = nextCall.o || nextCall.options;

						var timing = (currentCallOptions && currentCallOptions.sequenceQueue === false) ? "begin" : "complete",
								callbackOriginal = nextCallOptions && nextCallOptions[timing],
								options = {};

						options[timing] = function() {
							var nextCallElements = nextCall.e || nextCall.elements;
							var elements = nextCallElements.nodeType ? [nextCallElements] : nextCallElements;

							if (callbackOriginal) {
								callbackOriginal.call(elements, elements);
							}
							Velocity(currentCall);
						};

						if (nextCall.o) {
							nextCall.o = $.extend({}, nextCallOptions, options);
						} else {
							nextCall.options = $.extend({}, nextCallOptions, options);
						}
					}
				});

				sequence.reverse();
			}

			Velocity(sequence[0]);
		};
	}((window.jQuery || window.Zepto || window), window, (window ? window.document : undefined));
}));


/***/ })
],[4]);