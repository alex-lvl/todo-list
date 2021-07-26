/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__.default)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__.default)(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__.default)([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__.default)([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__.default)(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__.default)(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__.default)(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__.default)(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__.default)(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__.default)(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__.default)(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__.default)(element)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__.default)((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__.default)((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__.default)(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__.default)((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__.default)(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__.default)(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__.default)(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__.default)(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__.default)(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");






 // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__.default)(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__.default)(elementOrVirtualElement);
  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_4__.default)(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_6__.default)(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__.default)(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__.default)(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__.default)(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__.default)(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");







function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_2__.default)(element);

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_4__.default)(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_3__.default)(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__.default)(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__.default)(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__.default)(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");



function getViewportRect(element) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__.default)(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_2__.default)(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__.default)((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__.default)(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__.default)(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__.default)(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__.default)(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__.default)(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__.default)(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "write": () => (/* binding */ write),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain),
/* harmony export */   "afterRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead),
/* harmony export */   "afterWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite),
/* harmony export */   "auto": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto),
/* harmony export */   "basePlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements),
/* harmony export */   "beforeMain": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain),
/* harmony export */   "beforeRead": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead),
/* harmony export */   "beforeWrite": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite),
/* harmony export */   "bottom": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom),
/* harmony export */   "clippingParents": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents),
/* harmony export */   "end": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end),
/* harmony export */   "left": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left),
/* harmony export */   "main": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main),
/* harmony export */   "modifierPhases": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases),
/* harmony export */   "placements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements),
/* harmony export */   "popper": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper),
/* harmony export */   "read": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read),
/* harmony export */   "reference": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference),
/* harmony export */   "right": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right),
/* harmony export */   "start": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start),
/* harmony export */   "top": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top),
/* harmony export */   "variationPlacements": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements),
/* harmony export */   "viewport": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport),
/* harmony export */   "write": () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write),
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "createPopperBase": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper),
/* harmony export */   "createPopper": () => (/* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__.default)(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__.default)(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__.default)(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__.default)(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__.default)(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.default)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__.default)(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");






 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr) || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)((0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr) || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets;

  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === 'function' ? roundOffsets(offsets) : offsets,
      _ref3$x = _ref3.x,
      x = _ref3$x === void 0 ? 0 : _ref3$x,
      _ref3$y = _ref3.y,
      y = _ref3$y === void 0 ? 0 : _ref3$y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__.default)(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__.default)(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__.default)(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__.default)(offsetParent).position !== 'static') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom; // $FlowFixMe[prop-missing]

      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right; // $FlowFixMe[prop-missing]

      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref4) {
  var state = _ref4.state,
      options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__.default)(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__.default)(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__.default)(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__.default)(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__.default)(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__.default)(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__.default)(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__.default)
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__.default)({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__.default)(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__.default)(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__.default)(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__.default)(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__.default)(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__.default)();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__.default)(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;

    if (checkMainAxis) {
      var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
      popperOffsets[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset;
    }

    if (checkAltAxis) {
      var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

      var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

      var _offset = popperOffsets[altAxis];

      var _min = _offset + overflow[_mainSide];

      var _max = _offset - overflow[_altSide];

      var _preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.default)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(_min, tetherMin) : _min, _offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(_max, tetherMax) : _max);

      popperOffsets[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__.default, _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__.default, _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default, _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__.default];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__.default, _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__.default, _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__.default, _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__.default, _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__.default, _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__.default, _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__.default, _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__.default, _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__.default];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__.default)(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__.default)(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__.default)(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__.default)(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__.default)(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__.default)(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__.default)((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__.default)(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__.default)(referenceElement);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__.default)({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__.default)(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__.default)(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__.default)(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ within)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}

/***/ }),

/***/ "./node_modules/bootstrap/dist/js/bootstrap.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/bootstrap/dist/js/bootstrap.esm.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Alert": () => (/* binding */ Alert),
/* harmony export */   "Button": () => (/* binding */ Button),
/* harmony export */   "Carousel": () => (/* binding */ Carousel),
/* harmony export */   "Collapse": () => (/* binding */ Collapse),
/* harmony export */   "Dropdown": () => (/* binding */ Dropdown),
/* harmony export */   "Modal": () => (/* binding */ Modal),
/* harmony export */   "Offcanvas": () => (/* binding */ Offcanvas),
/* harmony export */   "Popover": () => (/* binding */ Popover),
/* harmony export */   "ScrollSpy": () => (/* binding */ ScrollSpy),
/* harmony export */   "Tab": () => (/* binding */ Tab),
/* harmony export */   "Toast": () => (/* binding */ Toast),
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/index.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
/*!
  * Bootstrap v5.0.0 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */


/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const MAX_UID = 1000000;
const MILLISECONDS_MULTIPLIER = 1000;
const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

const toType = obj => {
  if (obj === null || obj === undefined) {
    return `${obj}`;
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * --------------------------------------------------------------------------
 */


const getUID = prefix => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

const getSelector = element => {
  let selector = element.getAttribute('data-bs-target');

  if (!selector || selector === '#') {
    let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273

    if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
      return null;
    } // Just in case some CMS puts out a full URL with the anchor appended


    if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
      hrefAttr = `#${hrefAttr.split('#')[1]}`;
    }

    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
  }

  return selector;
};

const getSelectorFromElement = element => {
  const selector = getSelector(element);

  if (selector) {
    return document.querySelector(selector) ? selector : null;
  }

  return null;
};

const getElementFromSelector = element => {
  const selector = getSelector(element);
  return selector ? document.querySelector(selector) : null;
};

const getTransitionDurationFromElement = element => {
  if (!element) {
    return 0;
  } // Get transition-duration of the element


  let {
    transitionDuration,
    transitionDelay
  } = window.getComputedStyle(element);
  const floatTransitionDuration = Number.parseFloat(transitionDuration);
  const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  } // If multiple durations are defined, take the first


  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};

const triggerTransitionEnd = element => {
  element.dispatchEvent(new Event(TRANSITION_END));
};

const isElement = obj => (obj[0] || obj).nodeType;

const emulateTransitionEnd = (element, duration) => {
  let called = false;
  const durationPadding = 5;
  const emulatedDuration = duration + durationPadding;

  function listener() {
    called = true;
    element.removeEventListener(TRANSITION_END, listener);
  }

  element.addEventListener(TRANSITION_END, listener);
  setTimeout(() => {
    if (!called) {
      triggerTransitionEnd(element);
    }
  }, emulatedDuration);
};

const typeCheckConfig = (componentName, config, configTypes) => {
  Object.keys(configTypes).forEach(property => {
    const expectedTypes = configTypes[property];
    const value = config[property];
    const valueType = value && isElement(value) ? 'element' : toType(value);

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
    }
  });
};

const isVisible = element => {
  if (!element) {
    return false;
  }

  if (element.style && element.parentNode && element.parentNode.style) {
    const elementStyle = getComputedStyle(element);
    const parentNodeStyle = getComputedStyle(element.parentNode);
    return elementStyle.display !== 'none' && parentNodeStyle.display !== 'none' && elementStyle.visibility !== 'hidden';
  }

  return false;
};

const isDisabled = element => {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }

  if (element.classList.contains('disabled')) {
    return true;
  }

  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }

  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};

const findShadowRoot = element => {
  if (!document.documentElement.attachShadow) {
    return null;
  } // Can find the shadow root otherwise it'll return the document


  if (typeof element.getRootNode === 'function') {
    const root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }

  if (element instanceof ShadowRoot) {
    return element;
  } // when we don't find a shadow root


  if (!element.parentNode) {
    return null;
  }

  return findShadowRoot(element.parentNode);
};

const noop = () => {};

const reflow = element => element.offsetHeight;

const getjQuery = () => {
  const {
    jQuery
  } = window;

  if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return jQuery;
  }

  return null;
};

const onDOMContentLoaded = callback => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

const isRTL = () => document.documentElement.dir === 'rtl';

const defineJQueryPlugin = (name, plugin) => {
  onDOMContentLoaded(() => {
    const $ = getjQuery();
    /* istanbul ignore if */

    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;

      $.fn[name].noConflict = () => {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};

const execute = callback => {
  if (typeof callback === 'function') {
    callback();
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const elementMap = new Map();
var Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }

    const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used

    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }

    instanceMap.set(key, instance);
  },

  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }

    return null;
  },

  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }

    const instanceMap = elementMap.get(element);
    instanceMap.delete(key); // free up element references if there are no instances left for an element

    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
const stripNameRegex = /\..*/;
const stripUidRegex = /::\d+$/;
const eventRegistry = {}; // Events storage

let uidEvent = 1;
const customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
const customEventsRegex = /^(mouseenter|mouseleave)/i;
const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
/**
 * ------------------------------------------------------------------------
 * Private methods
 * ------------------------------------------------------------------------
 */

function getUidEvent(element, uid) {
  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
}

function getEvent(element) {
  const uid = getUidEvent(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}

function bootstrapHandler(element, fn) {
  return function handler(event) {
    event.delegateTarget = element;

    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }

    return fn.apply(element, [event]);
  };
}

function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    const domElements = element.querySelectorAll(selector);

    for (let {
      target
    } = event; target && target !== this; target = target.parentNode) {
      for (let i = domElements.length; i--;) {
        if (domElements[i] === target) {
          event.delegateTarget = target;

          if (handler.oneOff) {
            // eslint-disable-next-line unicorn/consistent-destructuring
            EventHandler.off(element, event.type, selector, fn);
          }

          return fn.apply(target, [event]);
        }
      }
    } // To please ESLint


    return null;
  };
}

function findHandler(events, handler, delegationSelector = null) {
  const uidEventList = Object.keys(events);

  for (let i = 0, len = uidEventList.length; i < len; i++) {
    const event = events[uidEventList[i]];

    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
      return event;
    }
  }

  return null;
}

function normalizeParams(originalTypeEvent, handler, delegationFn) {
  const delegation = typeof handler === 'string';
  const originalHandler = delegation ? delegationFn : handler;
  let typeEvent = getTypeEvent(originalTypeEvent);
  const isNative = nativeEvents.has(typeEvent);

  if (!isNative) {
    typeEvent = originalTypeEvent;
  }

  return [delegation, originalHandler, typeEvent];
}

function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }

  if (!handler) {
    handler = delegationFn;
    delegationFn = null;
  } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does


  if (customEventsRegex.test(originalTypeEvent)) {
    const wrapFn = fn => {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };

    if (delegationFn) {
      delegationFn = wrapFn(delegationFn);
    } else {
      handler = wrapFn(handler);
    }
  }

  const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
  const events = getEvent(element);
  const handlers = events[typeEvent] || (events[typeEvent] = {});
  const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

  if (previousFn) {
    previousFn.oneOff = previousFn.oneOff && oneOff;
    return;
  }

  const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
  const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
  fn.delegationSelector = delegation ? handler : null;
  fn.originalHandler = originalHandler;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, delegation);
}

function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  const fn = findHandler(events[typeEvent], handler, delegationSelector);

  if (!fn) {
    return;
  }

  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}

function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  const storeElementEvent = events[typeEvent] || {};
  Object.keys(storeElementEvent).forEach(handlerKey => {
    if (handlerKey.includes(namespace)) {
      const event = storeElementEvent[handlerKey];
      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
    }
  });
}

function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}

const EventHandler = {
  on(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, false);
  },

  one(element, event, handler, delegationFn) {
    addHandler(element, event, handler, delegationFn, true);
  },

  off(element, originalTypeEvent, handler, delegationFn) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }

    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
    const inNamespace = typeEvent !== originalTypeEvent;
    const events = getEvent(element);
    const isNamespace = originalTypeEvent.startsWith('.');

    if (typeof originalHandler !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!events || !events[typeEvent]) {
        return;
      }

      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
      return;
    }

    if (isNamespace) {
      Object.keys(events).forEach(elementEvent => {
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      });
    }

    const storeElementEvent = events[typeEvent] || {};
    Object.keys(storeElementEvent).forEach(keyHandlers => {
      const handlerKey = keyHandlers.replace(stripUidRegex, '');

      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        const event = storeElementEvent[keyHandlers];
        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
      }
    });
  },

  trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }

    const $ = getjQuery();
    const typeEvent = getTypeEvent(event);
    const inNamespace = event !== typeEvent;
    const isNative = nativeEvents.has(typeEvent);
    let jQueryEvent;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    let evt = null;

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }

    if (isNative) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles,
        cancelable: true
      });
    } // merge custom information in our event


    if (typeof args !== 'undefined') {
      Object.keys(args).forEach(key => {
        Object.defineProperty(evt, key, {
          get() {
            return args[key];
          }

        });
      });
    }

    if (defaultPrevented) {
      evt.preventDefault();
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }

    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
      jQueryEvent.preventDefault();
    }

    return evt;
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const VERSION = '5.0.0';

class BaseComponent {
  constructor(element) {
    element = typeof element === 'string' ? document.querySelector(element) : element;

    if (!element) {
      return;
    }

    this._element = element;
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, `.${this.constructor.DATA_KEY}`);
    this._element = null;
  }
  /** Static */


  static getInstance(element) {
    return Data.get(element, this.DATA_KEY);
  }

  static get VERSION() {
    return VERSION;
  }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$c = 'alert';
const DATA_KEY$b = 'bs.alert';
const EVENT_KEY$b = `.${DATA_KEY$b}`;
const DATA_API_KEY$8 = '.data-api';
const SELECTOR_DISMISS = '[data-bs-dismiss="alert"]';
const EVENT_CLOSE = `close${EVENT_KEY$b}`;
const EVENT_CLOSED = `closed${EVENT_KEY$b}`;
const EVENT_CLICK_DATA_API$7 = `click${EVENT_KEY$b}${DATA_API_KEY$8}`;
const CLASS_NAME_ALERT = 'alert';
const CLASS_NAME_FADE$6 = 'fade';
const CLASS_NAME_SHOW$9 = 'show';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Alert extends BaseComponent {
  // Getters
  static get DATA_KEY() {
    return DATA_KEY$b;
  } // Public


  close(element) {
    const rootElement = element ? this._getRootElement(element) : this._element;

    const customEvent = this._triggerCloseEvent(rootElement);

    if (customEvent === null || customEvent.defaultPrevented) {
      return;
    }

    this._removeElement(rootElement);
  } // Private


  _getRootElement(element) {
    return getElementFromSelector(element) || element.closest(`.${CLASS_NAME_ALERT}`);
  }

  _triggerCloseEvent(element) {
    return EventHandler.trigger(element, EVENT_CLOSE);
  }

  _removeElement(element) {
    element.classList.remove(CLASS_NAME_SHOW$9);

    if (!element.classList.contains(CLASS_NAME_FADE$6)) {
      this._destroyElement(element);

      return;
    }

    const transitionDuration = getTransitionDurationFromElement(element);
    EventHandler.one(element, 'transitionend', () => this._destroyElement(element));
    emulateTransitionEnd(element, transitionDuration);
  }

  _destroyElement(element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }

    EventHandler.trigger(element, EVENT_CLOSED);
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY$b);

      if (!data) {
        data = new Alert(this);
      }

      if (config === 'close') {
        data[config](this);
      }
    });
  }

  static handleDismiss(alertInstance) {
    return function (event) {
      if (event) {
        event.preventDefault();
      }

      alertInstance.close(this);
    };
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$7, SELECTOR_DISMISS, Alert.handleDismiss(new Alert()));
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Alert to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME$c, Alert);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$b = 'button';
const DATA_KEY$a = 'bs.button';
const EVENT_KEY$a = `.${DATA_KEY$a}`;
const DATA_API_KEY$7 = '.data-api';
const CLASS_NAME_ACTIVE$3 = 'active';
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$a}${DATA_API_KEY$7}`;
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Button extends BaseComponent {
  // Getters
  static get DATA_KEY() {
    return DATA_KEY$a;
  } // Public


  toggle() {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY$a);

      if (!data) {
        data = new Button(this);
      }

      if (config === 'toggle') {
        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  let data = Data.get(button, DATA_KEY$a);

  if (!data) {
    data = new Button(button);
  }

  data.toggle();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Button to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME$b, Button);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
function normalizeData(val) {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  if (val === Number(val).toString()) {
    return Number(val);
  }

  if (val === '' || val === 'null') {
    return null;
  }

  return val;
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
}

const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },

  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },

  getDataAttributes(element) {
    if (!element) {
      return {};
    }

    const attributes = {};
    Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
      let pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    });
    return attributes;
  },

  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  },

  offset(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft
    };
  },

  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const NODE_TEXT = 3;
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },

  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },

  children(element, selector) {
    return [].concat(...element.children).filter(child => child.matches(selector));
  },

  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode;

    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (ancestor.matches(selector)) {
        parents.push(ancestor);
      }

      ancestor = ancestor.parentNode;
    }

    return parents;
  },

  prev(element, selector) {
    let previous = element.previousElementSibling;

    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }

      previous = previous.previousElementSibling;
    }

    return [];
  },

  next(element, selector) {
    let next = element.nextElementSibling;

    while (next) {
      if (next.matches(selector)) {
        return [next];
      }

      next = next.nextElementSibling;
    }

    return [];
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$a = 'carousel';
const DATA_KEY$9 = 'bs.carousel';
const EVENT_KEY$9 = `.${DATA_KEY$9}`;
const DATA_API_KEY$6 = '.data-api';
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';
const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

const SWIPE_THRESHOLD = 40;
const Default$9 = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
};
const DefaultType$9 = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
};
const ORDER_NEXT = 'next';
const ORDER_PREV = 'prev';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const EVENT_SLIDE = `slide${EVENT_KEY$9}`;
const EVENT_SLID = `slid${EVENT_KEY$9}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$9}`;
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$9}`;
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$9}`;
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$9}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$9}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$9}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$9}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$9}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$9}`;
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$9}${DATA_API_KEY$6}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$9}${DATA_API_KEY$6}`;
const CLASS_NAME_CAROUSEL = 'carousel';
const CLASS_NAME_ACTIVE$2 = 'active';
const CLASS_NAME_SLIDE = 'slide';
const CLASS_NAME_END = 'carousel-item-end';
const CLASS_NAME_START = 'carousel-item-start';
const CLASS_NAME_NEXT = 'carousel-item-next';
const CLASS_NAME_PREV = 'carousel-item-prev';
const CLASS_NAME_POINTER_EVENT = 'pointer-event';
const SELECTOR_ACTIVE$1 = '.active';
const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
const SELECTOR_ITEM = '.carousel-item';
const SELECTOR_ITEM_IMG = '.carousel-item img';
const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
const SELECTOR_INDICATORS = '.carousel-indicators';
const SELECTOR_INDICATOR = '[data-bs-target]';
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const POINTER_TYPE_TOUCH = 'touch';
const POINTER_TYPE_PEN = 'pen';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._items = null;
    this._interval = null;
    this._activeElement = null;
    this._isPaused = false;
    this._isSliding = false;
    this.touchTimeout = null;
    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this._config = this._getConfig(config);
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    this._pointerEvent = Boolean(window.PointerEvent);

    this._addEventListeners();
  } // Getters


  static get Default() {
    return Default$9;
  }

  static get DATA_KEY() {
    return DATA_KEY$9;
  } // Public


  next() {
    if (!this._isSliding) {
      this._slide(ORDER_NEXT);
    }
  }

  nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }

  prev() {
    if (!this._isSliding) {
      this._slide(ORDER_PREV);
    }
  }

  pause(event) {
    if (!event) {
      this._isPaused = true;
    }

    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
      triggerTransitionEnd(this._element);
      this.cycle(true);
    }

    clearInterval(this._interval);
    this._interval = null;
  }

  cycle(event) {
    if (!event) {
      this._isPaused = false;
    }

    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    if (this._config && this._config.interval && !this._isPaused) {
      this._updateInterval();

      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
    }
  }

  to(index) {
    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    const activeIndex = this._getItemIndex(this._activeElement);

    if (index > this._items.length - 1 || index < 0) {
      return;
    }

    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }

    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }

    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

    this._slide(order, this._items[index]);
  }

  dispose() {
    this._items = null;
    this._config = null;
    this._interval = null;
    this._isPaused = null;
    this._isSliding = null;
    this._activeElement = null;
    this._indicatorsElement = null;
    super.dispose();
  } // Private


  _getConfig(config) {
    config = { ...Default$9,
      ...config
    };
    typeCheckConfig(NAME$a, config, DefaultType$9);
    return config;
  }

  _handleSwipe() {
    const absDeltax = Math.abs(this.touchDeltaX);

    if (absDeltax <= SWIPE_THRESHOLD) {
      return;
    }

    const direction = absDeltax / this.touchDeltaX;
    this.touchDeltaX = 0;

    if (!direction) {
      return;
    }

    this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
  }

  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    }

    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
      EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
    }

    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners();
    }
  }

  _addTouchEventListeners() {
    const start = event => {
      if (this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
        this.touchStartX = event.clientX;
      } else if (!this._pointerEvent) {
        this.touchStartX = event.touches[0].clientX;
      }
    };

    const move = event => {
      // ensure swiping with one touch and not pinching
      this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
    };

    const end = event => {
      if (this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH)) {
        this.touchDeltaX = event.clientX - this.touchStartX;
      }

      this._handleSwipe();

      if (this._config.pause === 'hover') {
        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling
        this.pause();

        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }

        this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      }
    };

    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
      EventHandler.on(itemImg, EVENT_DRAG_START, e => e.preventDefault());
    });

    if (this._pointerEvent) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, event => end(event));

      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event));
    }
  }

  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }

    if (event.key === ARROW_LEFT_KEY) {
      event.preventDefault();

      this._slide(DIRECTION_RIGHT);
    } else if (event.key === ARROW_RIGHT_KEY) {
      event.preventDefault();

      this._slide(DIRECTION_LEFT);
    }
  }

  _getItemIndex(element) {
    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
    return this._items.indexOf(element);
  }

  _getItemByOrder(order, activeElement) {
    const isNext = order === ORDER_NEXT;
    const isPrev = order === ORDER_PREV;

    const activeIndex = this._getItemIndex(activeElement);

    const lastItemIndex = this._items.length - 1;
    const isGoingToWrap = isPrev && activeIndex === 0 || isNext && activeIndex === lastItemIndex;

    if (isGoingToWrap && !this._config.wrap) {
      return activeElement;
    }

    const delta = isPrev ? -1 : 1;
    const itemIndex = (activeIndex + delta) % this._items.length;
    return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
  }

  _triggerSlideEvent(relatedTarget, eventDirectionName) {
    const targetIndex = this._getItemIndex(relatedTarget);

    const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

    return EventHandler.trigger(this._element, EVENT_SLIDE, {
      relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex
    });
  }

  _setActiveIndicatorElement(element) {
    if (this._indicatorsElement) {
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

      for (let i = 0; i < indicators.length; i++) {
        if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
          indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
          indicators[i].setAttribute('aria-current', 'true');
          break;
        }
      }
    }
  }

  _updateInterval() {
    const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    if (!element) {
      return;
    }

    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

    if (elementInterval) {
      this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
      this._config.interval = elementInterval;
    } else {
      this._config.interval = this._config.defaultInterval || this._config.interval;
    }
  }

  _slide(directionOrOrder, element) {
    const order = this._directionToOrder(directionOrOrder);

    const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    const activeElementIndex = this._getItemIndex(activeElement);

    const nextElement = element || this._getItemByOrder(order, activeElement);

    const nextElementIndex = this._getItemIndex(nextElement);

    const isCycling = Boolean(this._interval);
    const isNext = order === ORDER_NEXT;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

    const eventDirectionName = this._orderToDirection(order);

    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
      this._isSliding = false;
      return;
    }

    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

    if (slideEvent.defaultPrevented) {
      return;
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      return;
    }

    this._isSliding = true;

    if (isCycling) {
      this.pause();
    }

    this._setActiveIndicatorElement(nextElement);

    this._activeElement = nextElement;

    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      const transitionDuration = getTransitionDurationFromElement(activeElement);
      EventHandler.one(activeElement, 'transitionend', () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        setTimeout(() => {
          EventHandler.trigger(this._element, EVENT_SLID, {
            relatedTarget: nextElement,
            direction: eventDirectionName,
            from: activeElementIndex,
            to: nextElementIndex
          });
        }, 0);
      });
      emulateTransitionEnd(activeElement, transitionDuration);
    } else {
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      this._isSliding = false;
      EventHandler.trigger(this._element, EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });
    }

    if (isCycling) {
      this.cycle();
    }
  }

  _directionToOrder(direction) {
    if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
      return direction;
    }

    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }

    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }

  _orderToDirection(order) {
    if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
      return order;
    }

    if (isRTL()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  } // Static


  static carouselInterface(element, config) {
    let data = Data.get(element, DATA_KEY$9);
    let _config = { ...Default$9,
      ...Manipulator.getDataAttributes(element)
    };

    if (typeof config === 'object') {
      _config = { ..._config,
        ...config
      };
    }

    const action = typeof config === 'string' ? config : _config.slide;

    if (!data) {
      data = new Carousel(element, _config);
    }

    if (typeof config === 'number') {
      data.to(config);
    } else if (typeof action === 'string') {
      if (typeof data[action] === 'undefined') {
        throw new TypeError(`No method named "${action}"`);
      }

      data[action]();
    } else if (_config.interval && _config.ride) {
      data.pause();
      data.cycle();
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      Carousel.carouselInterface(this, config);
    });
  }

  static dataApiClickHandler(event) {
    const target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }

    const config = { ...Manipulator.getDataAttributes(target),
      ...Manipulator.getDataAttributes(this)
    };
    const slideIndex = this.getAttribute('data-bs-slide-to');

    if (slideIndex) {
      config.interval = false;
    }

    Carousel.carouselInterface(target, config);

    if (slideIndex) {
      Data.get(target, DATA_KEY$9).to(slideIndex);
    }

    event.preventDefault();
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

  for (let i = 0, len = carousels.length; i < len; i++) {
    Carousel.carouselInterface(carousels[i], Data.get(carousels[i], DATA_KEY$9));
  }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Carousel to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME$a, Carousel);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$9 = 'collapse';
const DATA_KEY$8 = 'bs.collapse';
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$5 = '.data-api';
const Default$8 = {
  toggle: true,
  parent: ''
};
const DefaultType$8 = {
  toggle: 'boolean',
  parent: '(string|element)'
};
const EVENT_SHOW$5 = `show${EVENT_KEY$8}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$8}`;
const EVENT_HIDE$5 = `hide${EVENT_KEY$8}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$8}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$8}${DATA_API_KEY$5}`;
const CLASS_NAME_SHOW$8 = 'show';
const CLASS_NAME_COLLAPSE = 'collapse';
const CLASS_NAME_COLLAPSING = 'collapsing';
const CLASS_NAME_COLLAPSED = 'collapsed';
const WIDTH = 'width';
const HEIGHT = 'height';
const SELECTOR_ACTIVES = '.show, .collapsing';
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._isTransitioning = false;
    this._config = this._getConfig(config);
    this._triggerArray = SelectorEngine.find(`${SELECTOR_DATA_TOGGLE$4}[href="#${this._element.id}"],` + `${SELECTOR_DATA_TOGGLE$4}[data-bs-target="#${this._element.id}"]`);
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

    for (let i = 0, len = toggleList.length; i < len; i++) {
      const elem = toggleList[i];
      const selector = getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element);

      if (selector !== null && filterElement.length) {
        this._selector = selector;

        this._triggerArray.push(elem);
      }
    }

    this._parent = this._config.parent ? this._getParent() : null;

    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._element, this._triggerArray);
    }

    if (this._config.toggle) {
      this.toggle();
    }
  } // Getters


  static get Default() {
    return Default$8;
  }

  static get DATA_KEY() {
    return DATA_KEY$8;
  } // Public


  toggle() {
    if (this._element.classList.contains(CLASS_NAME_SHOW$8)) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this._isTransitioning || this._element.classList.contains(CLASS_NAME_SHOW$8)) {
      return;
    }

    let actives;
    let activesData;

    if (this._parent) {
      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._parent).filter(elem => {
        if (typeof this._config.parent === 'string') {
          return elem.getAttribute('data-bs-parent') === this._config.parent;
        }

        return elem.classList.contains(CLASS_NAME_COLLAPSE);
      });

      if (actives.length === 0) {
        actives = null;
      }
    }

    const container = SelectorEngine.findOne(this._selector);

    if (actives) {
      const tempActiveData = actives.find(elem => container !== elem);
      activesData = tempActiveData ? Data.get(tempActiveData, DATA_KEY$8) : null;

      if (activesData && activesData._isTransitioning) {
        return;
      }
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

    if (startEvent.defaultPrevented) {
      return;
    }

    if (actives) {
      actives.forEach(elemActive => {
        if (container !== elemActive) {
          Collapse.collapseInterface(elemActive, 'hide');
        }

        if (!activesData) {
          Data.set(elemActive, DATA_KEY$8, null);
        }
      });
    }

    const dimension = this._getDimension();

    this._element.classList.remove(CLASS_NAME_COLLAPSE);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.style[dimension] = 0;

    if (this._triggerArray.length) {
      this._triggerArray.forEach(element => {
        element.classList.remove(CLASS_NAME_COLLAPSED);
        element.setAttribute('aria-expanded', true);
      });
    }

    this.setTransitioning(true);

    const complete = () => {
      this._element.classList.remove(CLASS_NAME_COLLAPSING);

      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

      this._element.style[dimension] = '';
      this.setTransitioning(false);
      EventHandler.trigger(this._element, EVENT_SHOWN$5);
    };

    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;
    const transitionDuration = getTransitionDurationFromElement(this._element);
    EventHandler.one(this._element, 'transitionend', complete);
    emulateTransitionEnd(this._element, transitionDuration);
    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }

  hide() {
    if (this._isTransitioning || !this._element.classList.contains(CLASS_NAME_SHOW$8)) {
      return;
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

    if (startEvent.defaultPrevented) {
      return;
    }

    const dimension = this._getDimension();

    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$8);

    const triggerArrayLength = this._triggerArray.length;

    if (triggerArrayLength > 0) {
      for (let i = 0; i < triggerArrayLength; i++) {
        const trigger = this._triggerArray[i];
        const elem = getElementFromSelector(trigger);

        if (elem && !elem.classList.contains(CLASS_NAME_SHOW$8)) {
          trigger.classList.add(CLASS_NAME_COLLAPSED);
          trigger.setAttribute('aria-expanded', false);
        }
      }
    }

    this.setTransitioning(true);

    const complete = () => {
      this.setTransitioning(false);

      this._element.classList.remove(CLASS_NAME_COLLAPSING);

      this._element.classList.add(CLASS_NAME_COLLAPSE);

      EventHandler.trigger(this._element, EVENT_HIDDEN$5);
    };

    this._element.style[dimension] = '';
    const transitionDuration = getTransitionDurationFromElement(this._element);
    EventHandler.one(this._element, 'transitionend', complete);
    emulateTransitionEnd(this._element, transitionDuration);
  }

  setTransitioning(isTransitioning) {
    this._isTransitioning = isTransitioning;
  }

  dispose() {
    super.dispose();
    this._config = null;
    this._parent = null;
    this._triggerArray = null;
    this._isTransitioning = null;
  } // Private


  _getConfig(config) {
    config = { ...Default$8,
      ...config
    };
    config.toggle = Boolean(config.toggle); // Coerce string values

    typeCheckConfig(NAME$9, config, DefaultType$8);
    return config;
  }

  _getDimension() {
    return this._element.classList.contains(WIDTH) ? WIDTH : HEIGHT;
  }

  _getParent() {
    let {
      parent
    } = this._config;

    if (isElement(parent)) {
      // it's a jQuery object
      if (typeof parent.jquery !== 'undefined' || typeof parent[0] !== 'undefined') {
        parent = parent[0];
      }
    } else {
      parent = SelectorEngine.findOne(parent);
    }

    const selector = `${SELECTOR_DATA_TOGGLE$4}[data-bs-parent="${parent}"]`;
    SelectorEngine.find(selector, parent).forEach(element => {
      const selected = getElementFromSelector(element);

      this._addAriaAndCollapsedClass(selected, [element]);
    });
    return parent;
  }

  _addAriaAndCollapsedClass(element, triggerArray) {
    if (!element || !triggerArray.length) {
      return;
    }

    const isOpen = element.classList.contains(CLASS_NAME_SHOW$8);
    triggerArray.forEach(elem => {
      if (isOpen) {
        elem.classList.remove(CLASS_NAME_COLLAPSED);
      } else {
        elem.classList.add(CLASS_NAME_COLLAPSED);
      }

      elem.setAttribute('aria-expanded', isOpen);
    });
  } // Static


  static collapseInterface(element, config) {
    let data = Data.get(element, DATA_KEY$8);
    const _config = { ...Default$8,
      ...Manipulator.getDataAttributes(element),
      ...(typeof config === 'object' && config ? config : {})
    };

    if (!data && _config.toggle && typeof config === 'string' && /show|hide/.test(config)) {
      _config.toggle = false;
    }

    if (!data) {
      data = new Collapse(element, _config);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      Collapse.collapseInterface(this, config);
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }

  const triggerData = Manipulator.getDataAttributes(this);
  const selector = getSelectorFromElement(this);
  const selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach(element => {
    const data = Data.get(element, DATA_KEY$8);
    let config;

    if (data) {
      // update parent attribute
      if (data._parent === null && typeof triggerData.parent === 'string') {
        data._config.parent = triggerData.parent;
        data._parent = data._getParent();
      }

      config = 'toggle';
    } else {
      config = triggerData;
    }

    Collapse.collapseInterface(element, config);
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Collapse to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME$9, Collapse);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$8 = 'dropdown';
const DATA_KEY$7 = 'bs.dropdown';
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const DATA_API_KEY$4 = '.data-api';
const ESCAPE_KEY$2 = 'Escape';
const SPACE_KEY = 'Space';
const TAB_KEY = 'Tab';
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
const EVENT_HIDE$4 = `hide${EVENT_KEY$7}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$7}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$7}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$7}`;
const EVENT_CLICK = `click${EVENT_KEY$7}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$7}${DATA_API_KEY$4}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$7}${DATA_API_KEY$4}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$7}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$7 = 'show';
const CLASS_NAME_DROPUP = 'dropup';
const CLASS_NAME_DROPEND = 'dropend';
const CLASS_NAME_DROPSTART = 'dropstart';
const CLASS_NAME_NAVBAR = 'navbar';
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
const SELECTOR_MENU = '.dropdown-menu';
const SELECTOR_NAVBAR_NAV = '.navbar-nav';
const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
const Default$7 = {
  offset: [0, 2],
  boundary: 'clippingParents',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null,
  autoClose: true
};
const DefaultType$7 = {
  offset: '(array|string|function)',
  boundary: '(string|element)',
  reference: '(string|element|object)',
  display: 'string',
  popperConfig: '(null|object|function)',
  autoClose: '(boolean|string)'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();

    this._addEventListeners();
  } // Getters


  static get Default() {
    return Default$7;
  }

  static get DefaultType() {
    return DefaultType$7;
  }

  static get DATA_KEY() {
    return DATA_KEY$7;
  } // Public


  toggle() {
    if (isDisabled(this._element)) {
      return;
    }

    const isActive = this._element.classList.contains(CLASS_NAME_SHOW$7);

    if (isActive) {
      this.hide();
      return;
    }

    this.show();
  }

  show() {
    if (isDisabled(this._element) || this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
      return;
    }

    const parent = Dropdown.getParentFromElement(this._element);
    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

    if (showEvent.defaultPrevented) {
      return;
    } // Totally disable Popper for Dropdowns in Navbar


    if (this._inNavbar) {
      Manipulator.setDataAttribute(this._menu, 'popper', 'none');
    } else {
      if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }

      let referenceElement = this._element;

      if (this._config.reference === 'parent') {
        referenceElement = parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = this._config.reference; // Check if it's jQuery element

        if (typeof this._config.reference.jquery !== 'undefined') {
          referenceElement = this._config.reference[0];
        }
      } else if (typeof this._config.reference === 'object') {
        referenceElement = this._config.reference;
      }

      const popperConfig = this._getPopperConfig();

      const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
      this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(referenceElement, this._menu, popperConfig);

      if (isDisplayStatic) {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static');
      }
    } // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


    if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
      [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', noop));
    }

    this._element.focus();

    this._element.setAttribute('aria-expanded', true);

    this._menu.classList.toggle(CLASS_NAME_SHOW$7);

    this._element.classList.toggle(CLASS_NAME_SHOW$7);

    EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
  }

  hide() {
    if (isDisabled(this._element) || !this._menu.classList.contains(CLASS_NAME_SHOW$7)) {
      return;
    }

    const relatedTarget = {
      relatedTarget: this._element
    };

    this._completeHide(relatedTarget);
  }

  dispose() {
    this._menu = null;

    if (this._popper) {
      this._popper.destroy();

      this._popper = null;
    }

    super.dispose();
  }

  update() {
    this._inNavbar = this._detectNavbar();

    if (this._popper) {
      this._popper.update();
    }
  } // Private


  _addEventListeners() {
    EventHandler.on(this._element, EVENT_CLICK, event => {
      event.preventDefault();
      this.toggle();
    });
  }

  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

    if (hideEvent.defaultPrevented) {
      return;
    } // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support


    if ('ontouchstart' in document.documentElement) {
      [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', noop));
    }

    if (this._popper) {
      this._popper.destroy();
    }

    this._menu.classList.remove(CLASS_NAME_SHOW$7);

    this._element.classList.remove(CLASS_NAME_SHOW$7);

    this._element.setAttribute('aria-expanded', 'false');

    Manipulator.removeDataAttribute(this._menu, 'popper');
    EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
  }

  _getConfig(config) {
    config = { ...this.constructor.Default,
      ...Manipulator.getDataAttributes(this._element),
      ...config
    };
    typeCheckConfig(NAME$8, config, this.constructor.DefaultType);

    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
      // Popper virtual elements require a getBoundingClientRect method
      throw new TypeError(`${NAME$8.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }

    return config;
  }

  _getMenuElement() {
    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
  }

  _getPlacement() {
    const parentDropdown = this._element.parentNode;

    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    } // We need to trim the value because custom properties can also include spaces


    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }

    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }

  _detectNavbar() {
    return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
  }

  _getOffset() {
    const {
      offset
    } = this._config;

    if (typeof offset === 'string') {
      return offset.split(',').map(val => Number.parseInt(val, 10));
    }

    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }

    return offset;
  }

  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }]
    }; // Disable Popper if we have a static display

    if (this._config.display === 'static') {
      defaultBsPopperConfig.modifiers = [{
        name: 'applyStyles',
        enabled: false
      }];
    }

    return { ...defaultBsPopperConfig,
      ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
    };
  }

  _selectMenuItem(event) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

    if (!items.length) {
      return;
    }

    let index = items.indexOf(event.target); // Up

    if (event.key === ARROW_UP_KEY && index > 0) {
      index--;
    } // Down


    if (event.key === ARROW_DOWN_KEY && index < items.length - 1) {
      index++;
    } // index is -1 if the first keydown is an ArrowUp


    index = index === -1 ? 0 : index;
    items[index].focus();
  } // Static


  static dropdownInterface(element, config) {
    let data = Data.get(element, DATA_KEY$7);

    const _config = typeof config === 'object' ? config : null;

    if (!data) {
      data = new Dropdown(element, _config);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      Dropdown.dropdownInterface(this, config);
    });
  }

  static clearMenus(event) {
    if (event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
        return;
      }

      if (/input|select|option|textarea|form/i.test(event.target.tagName)) {
        return;
      }
    }

    const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

    for (let i = 0, len = toggles.length; i < len; i++) {
      const context = Data.get(toggles[i], DATA_KEY$7);

      if (!context || context._config.autoClose === false) {
        continue;
      }

      if (!context._element.classList.contains(CLASS_NAME_SHOW$7)) {
        continue;
      }

      const relatedTarget = {
        relatedTarget: context._element
      };

      if (event) {
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);

        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        } // Tab navigation through the dropdown menu shouldn't close the menu


        if (event.type === 'keyup' && event.key === TAB_KEY && context._menu.contains(event.target)) {
          continue;
        }

        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
      }

      context._completeHide(relatedTarget);
    }
  }

  static getParentFromElement(element) {
    return getElementFromSelector(element) || element.parentNode;
  }

  static dataApiKeydownHandler(event) {
    // If not input/textarea:
    //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
    // If input/textarea:
    //  - If space key => not a dropdown command
    //  - If key is other than escape
    //    - If key is not up or down => not a dropdown command
    //    - If trigger inside the menu => not a dropdown command
    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
      return;
    }

    const isActive = this.classList.contains(CLASS_NAME_SHOW$7);

    if (!isActive && event.key === ESCAPE_KEY$2) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (isDisabled(this)) {
      return;
    }

    const getToggleButton = () => this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];

    if (event.key === ESCAPE_KEY$2) {
      getToggleButton().focus();
      Dropdown.clearMenus();
      return;
    }

    if (!isActive && (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY)) {
      getToggleButton().click();
      return;
    }

    if (!isActive || event.key === SPACE_KEY) {
      Dropdown.clearMenus();
      return;
    }

    Dropdown.getInstance(getToggleButton())._selectMenuItem(event);
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.dropdownInterface(this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Dropdown to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME$8, Dropdown);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
const SELECTOR_STICKY_CONTENT = '.sticky-top';

const getWidth = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
  const documentWidth = document.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
};

const hide = (width = getWidth()) => {
  _disableOverFlow(); // give padding to element to balances the hidden scrollbar width


  _setElementAttributes('body', 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements, to keep shown fullwidth


  _setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

  _setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
};

const _disableOverFlow = () => {
  const actualValue = document.body.style.overflow;

  if (actualValue) {
    Manipulator.setDataAttribute(document.body, 'overflow', actualValue);
  }

  document.body.style.overflow = 'hidden';
};

const _setElementAttributes = (selector, styleProp, callback) => {
  const scrollbarWidth = getWidth();
  SelectorEngine.find(selector).forEach(element => {
    if (element !== document.body && window.innerWidth > element.clientWidth + scrollbarWidth) {
      return;
    }

    const actualValue = element.style[styleProp];
    const calculatedValue = window.getComputedStyle(element)[styleProp];
    Manipulator.setDataAttribute(element, styleProp, actualValue);
    element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
  });
};

const reset = () => {
  _resetElementAttributes('body', 'overflow');

  _resetElementAttributes('body', 'paddingRight');

  _resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

  _resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
};

const _resetElementAttributes = (selector, styleProp) => {
  SelectorEngine.find(selector).forEach(element => {
    const value = Manipulator.getDataAttribute(element, styleProp);

    if (typeof value === 'undefined') {
      element.style.removeProperty(styleProp);
    } else {
      Manipulator.removeDataAttribute(element, styleProp);
      element.style[styleProp] = value;
    }
  });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
const Default$6 = {
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  isAnimated: false,
  rootElement: document.body,
  // give the choice to place backdrop under different elements
  clickCallback: null
};
const DefaultType$6 = {
  isVisible: 'boolean',
  isAnimated: 'boolean',
  rootElement: 'element',
  clickCallback: '(function|null)'
};
const NAME$7 = 'backdrop';
const CLASS_NAME_BACKDROP = 'modal-backdrop';
const CLASS_NAME_FADE$5 = 'fade';
const CLASS_NAME_SHOW$6 = 'show';
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$7}`;

class Backdrop {
  constructor(config) {
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._append();

    if (this._config.isAnimated) {
      reflow(this._getElement());
    }

    this._getElement().classList.add(CLASS_NAME_SHOW$6);

    this._emulateAnimation(() => {
      execute(callback);
    });
  }

  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._getElement().classList.remove(CLASS_NAME_SHOW$6);

    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  } // Private


  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement('div');
      backdrop.className = CLASS_NAME_BACKDROP;

      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$5);
      }

      this._element = backdrop;
    }

    return this._element;
  }

  _getConfig(config) {
    config = { ...Default$6,
      ...(typeof config === 'object' ? config : {})
    };
    typeCheckConfig(NAME$7, config, DefaultType$6);
    return config;
  }

  _append() {
    if (this._isAppended) {
      return;
    }

    this._config.rootElement.appendChild(this._getElement());

    EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }

  dispose() {
    if (!this._isAppended) {
      return;
    }

    EventHandler.off(this._element, EVENT_MOUSEDOWN);

    this._getElement().parentNode.removeChild(this._element);

    this._isAppended = false;
  }

  _emulateAnimation(callback) {
    if (!this._config.isAnimated) {
      execute(callback);
      return;
    }

    const backdropTransitionDuration = getTransitionDurationFromElement(this._getElement());
    EventHandler.one(this._getElement(), 'transitionend', () => execute(callback));
    emulateTransitionEnd(this._getElement(), backdropTransitionDuration);
  }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$6 = 'modal';
const DATA_KEY$6 = 'bs.modal';
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = '.data-api';
const ESCAPE_KEY$1 = 'Escape';
const Default$5 = {
  backdrop: true,
  keyboard: true,
  focus: true
};
const DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean'
};
const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$6}`;
const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
const EVENT_CLICK_DISMISS$2 = `click.dismiss${EVENT_KEY$6}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_FADE$4 = 'fade';
const CLASS_NAME_SHOW$5 = 'show';
const CLASS_NAME_STATIC = 'modal-static';
const SELECTOR_DIALOG = '.modal-dialog';
const SELECTOR_MODAL_BODY = '.modal-body';
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
const SELECTOR_DATA_DISMISS$2 = '[data-bs-dismiss="modal"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Modal extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._isShown = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
  } // Getters


  static get Default() {
    return Default$5;
  }

  static get DATA_KEY() {
    return DATA_KEY$6;
  } // Public


  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }

  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }

    if (this._isAnimated()) {
      this._isTransitioning = true;
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });

    if (this._isShown || showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;
    hide();
    document.body.classList.add(CLASS_NAME_OPEN);

    this._adjustDialog();

    this._setEscapeEvent();

    this._setResizeEvent();

    EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, SELECTOR_DATA_DISMISS$2, event => this.hide(event));
    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
      EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
        if (event.target === this._element) {
          this._ignoreBackdropClick = true;
        }
      });
    });

    this._showBackdrop(() => this._showElement(relatedTarget));
  }

  hide(event) {
    if (event) {
      event.preventDefault();
    }

    if (!this._isShown || this._isTransitioning) {
      return;
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

    if (hideEvent.defaultPrevented) {
      return;
    }

    this._isShown = false;

    const isAnimated = this._isAnimated();

    if (isAnimated) {
      this._isTransitioning = true;
    }

    this._setEscapeEvent();

    this._setResizeEvent();

    EventHandler.off(document, EVENT_FOCUSIN$1);

    this._element.classList.remove(CLASS_NAME_SHOW$5);

    EventHandler.off(this._element, EVENT_CLICK_DISMISS$2);
    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

    if (isAnimated) {
      const transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, 'transitionend', event => this._hideModal(event));
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      this._hideModal();
    }
  }

  dispose() {
    [window, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6));
    super.dispose();
    /**
     * `document` has 2 events `EVENT_FOCUSIN` and `EVENT_CLICK_DATA_API`
     * Do not move `document` in `htmlElements` array
     * It will remove `EVENT_CLICK_DATA_API` event that should remain
     */

    EventHandler.off(document, EVENT_FOCUSIN$1);
    this._config = null;
    this._dialog = null;

    this._backdrop.dispose();

    this._backdrop = null;
    this._isShown = null;
    this._ignoreBackdropClick = null;
    this._isTransitioning = null;
  }

  handleUpdate() {
    this._adjustDialog();
  } // Private


  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value
      isAnimated: this._isAnimated()
    });
  }

  _getConfig(config) {
    config = { ...Default$5,
      ...Manipulator.getDataAttributes(this._element),
      ...config
    };
    typeCheckConfig(NAME$6, config, DefaultType$5);
    return config;
  }

  _showElement(relatedTarget) {
    const isAnimated = this._isAnimated();

    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      // Don't move modal's DOM position
      document.body.appendChild(this._element);
    }

    this._element.style.display = 'block';

    this._element.removeAttribute('aria-hidden');

    this._element.setAttribute('aria-modal', true);

    this._element.setAttribute('role', 'dialog');

    this._element.scrollTop = 0;

    if (modalBody) {
      modalBody.scrollTop = 0;
    }

    if (isAnimated) {
      reflow(this._element);
    }

    this._element.classList.add(CLASS_NAME_SHOW$5);

    if (this._config.focus) {
      this._enforceFocus();
    }

    const transitionComplete = () => {
      if (this._config.focus) {
        this._element.focus();
      }

      this._isTransitioning = false;
      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
        relatedTarget
      });
    };

    if (isAnimated) {
      const transitionDuration = getTransitionDurationFromElement(this._dialog);
      EventHandler.one(this._dialog, 'transitionend', transitionComplete);
      emulateTransitionEnd(this._dialog, transitionDuration);
    } else {
      transitionComplete();
    }
  }

  _enforceFocus() {
    EventHandler.off(document, EVENT_FOCUSIN$1); // guard against infinite focus loop

    EventHandler.on(document, EVENT_FOCUSIN$1, event => {
      if (document !== event.target && this._element !== event.target && !this._element.contains(event.target)) {
        this._element.focus();
      }
    });
  }

  _setEscapeEvent() {
    if (this._isShown) {
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
        if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
          event.preventDefault();
          this.hide();
        } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
          this._triggerBackdropTransition();
        }
      });
    } else {
      EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
    }
  }

  _setResizeEvent() {
    if (this._isShown) {
      EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
    } else {
      EventHandler.off(window, EVENT_RESIZE);
    }
  }

  _hideModal() {
    this._element.style.display = 'none';

    this._element.setAttribute('aria-hidden', true);

    this._element.removeAttribute('aria-modal');

    this._element.removeAttribute('role');

    this._isTransitioning = false;

    this._backdrop.hide(() => {
      document.body.classList.remove(CLASS_NAME_OPEN);

      this._resetAdjustments();

      reset();
      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
    });
  }

  _showBackdrop(callback) {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS$2, event => {
      if (this._ignoreBackdropClick) {
        this._ignoreBackdropClick = false;
        return;
      }

      if (event.target !== event.currentTarget) {
        return;
      }

      if (this._config.backdrop === true) {
        this.hide();
      } else if (this._config.backdrop === 'static') {
        this._triggerBackdropTransition();
      }
    });

    this._backdrop.show(callback);
  }

  _isAnimated() {
    return this._element.classList.contains(CLASS_NAME_FADE$4);
  }

  _triggerBackdropTransition() {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

    if (hideEvent.defaultPrevented) {
      return;
    }

    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

    if (!isModalOverflowing) {
      this._element.style.overflowY = 'hidden';
    }

    this._element.classList.add(CLASS_NAME_STATIC);

    const modalTransitionDuration = getTransitionDurationFromElement(this._dialog);
    EventHandler.off(this._element, 'transitionend');
    EventHandler.one(this._element, 'transitionend', () => {
      this._element.classList.remove(CLASS_NAME_STATIC);

      if (!isModalOverflowing) {
        EventHandler.one(this._element, 'transitionend', () => {
          this._element.style.overflowY = '';
        });
        emulateTransitionEnd(this._element, modalTransitionDuration);
      }
    });
    emulateTransitionEnd(this._element, modalTransitionDuration);

    this._element.focus();
  } // ----------------------------------------------------------------------
  // the following methods are used to handle overflowing modals
  // ----------------------------------------------------------------------


  _adjustDialog() {
    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
    const scrollbarWidth = getWidth();
    const isBodyOverflowing = scrollbarWidth > 0;

    if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
      this._element.style.paddingLeft = `${scrollbarWidth}px`;
    }

    if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
      this._element.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  _resetAdjustments() {
    this._element.style.paddingLeft = '';
    this._element.style.paddingRight = '';
  } // Static


  static jQueryInterface(config, relatedTarget) {
    return this.each(function () {
      const data = Modal.getInstance(this) || new Modal(this, typeof config === 'object' ? config : {});

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config](relatedTarget);
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  const target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  EventHandler.one(target, EVENT_SHOW$3, showEvent => {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }

    EventHandler.one(target, EVENT_HIDDEN$3, () => {
      if (isVisible(this)) {
        this.focus();
      }
    });
  });
  const data = Modal.getInstance(target) || new Modal(target);
  data.toggle(this);
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Modal to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME$6, Modal);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$5 = 'offcanvas';
const DATA_KEY$5 = 'bs.offcanvas';
const EVENT_KEY$5 = `.${DATA_KEY$5}`;
const DATA_API_KEY$2 = '.data-api';
const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
const ESCAPE_KEY = 'Escape';
const Default$4 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
const DefaultType$4 = {
  backdrop: 'boolean',
  keyboard: 'boolean',
  scroll: 'boolean'
};
const CLASS_NAME_SHOW$4 = 'show';
const OPEN_SELECTOR = '.offcanvas.show';
const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY$5}`;
const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
const EVENT_CLICK_DISMISS$1 = `click.dismiss${EVENT_KEY$5}`;
const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
const SELECTOR_DATA_DISMISS$1 = '[data-bs-dismiss="offcanvas"]';
const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Offcanvas extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._isShown = false;
    this._backdrop = this._initializeBackDrop();

    this._addEventListeners();
  } // Getters


  static get Default() {
    return Default$4;
  }

  static get DATA_KEY() {
    return DATA_KEY$5;
  } // Public


  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }

  show(relatedTarget) {
    if (this._isShown) {
      return;
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
      relatedTarget
    });

    if (showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;
    this._element.style.visibility = 'visible';

    this._backdrop.show();

    if (!this._config.scroll) {
      hide();

      this._enforceFocusOnElement(this._element);
    }

    this._element.removeAttribute('aria-hidden');

    this._element.setAttribute('aria-modal', true);

    this._element.setAttribute('role', 'dialog');

    this._element.classList.add(CLASS_NAME_SHOW$4);

    const completeCallBack = () => {
      EventHandler.trigger(this._element, EVENT_SHOWN$2, {
        relatedTarget
      });
    };

    const transitionDuration = getTransitionDurationFromElement(this._element);
    EventHandler.one(this._element, 'transitionend', completeCallBack);
    emulateTransitionEnd(this._element, transitionDuration);
  }

  hide() {
    if (!this._isShown) {
      return;
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

    if (hideEvent.defaultPrevented) {
      return;
    }

    EventHandler.off(document, EVENT_FOCUSIN);

    this._element.blur();

    this._isShown = false;

    this._element.classList.remove(CLASS_NAME_SHOW$4);

    this._backdrop.hide();

    const completeCallback = () => {
      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._element.removeAttribute('role');

      this._element.style.visibility = 'hidden';

      if (!this._config.scroll) {
        reset();
      }

      EventHandler.trigger(this._element, EVENT_HIDDEN$2);
    };

    const transitionDuration = getTransitionDurationFromElement(this._element);
    EventHandler.one(this._element, 'transitionend', completeCallback);
    emulateTransitionEnd(this._element, transitionDuration);
  }

  dispose() {
    this._backdrop.dispose();

    super.dispose();
    EventHandler.off(document, EVENT_FOCUSIN);
    this._config = null;
    this._backdrop = null;
  } // Private


  _getConfig(config) {
    config = { ...Default$4,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    };
    typeCheckConfig(NAME$5, config, DefaultType$4);
    return config;
  }

  _initializeBackDrop() {
    return new Backdrop({
      isVisible: this._config.backdrop,
      isAnimated: true,
      rootElement: this._element.parentNode,
      clickCallback: () => this.hide()
    });
  }

  _enforceFocusOnElement(element) {
    EventHandler.off(document, EVENT_FOCUSIN); // guard against infinite focus loop

    EventHandler.on(document, EVENT_FOCUSIN, event => {
      if (document !== event.target && element !== event.target && !element.contains(event.target)) {
        element.focus();
      }
    });
    element.focus();
  }

  _addEventListeners() {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS$1, SELECTOR_DATA_DISMISS$1, () => this.hide());
    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
      if (this._config.keyboard && event.key === ESCAPE_KEY) {
        this.hide();
      }
    });
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Data.get(this, DATA_KEY$5) || new Offcanvas(this, typeof config === 'object' ? config : {});

      if (typeof config !== 'string') {
        return;
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config](this);
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  const target = getElementFromSelector(this);

  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  EventHandler.one(target, EVENT_HIDDEN$2, () => {
    // focus on trigger when it is closed
    if (isVisible(this)) {
      this.focus();
    }
  }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

  if (allReadyOpen && allReadyOpen !== target) {
    Offcanvas.getInstance(allReadyOpen).hide();
  }

  const data = Data.get(target, DATA_KEY$5) || new Offcanvas(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => {
  SelectorEngine.find(OPEN_SELECTOR).forEach(el => (Data.get(el, DATA_KEY$5) || new Offcanvas(el)).show());
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

defineJQueryPlugin(NAME$5, Offcanvas);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const uriAttrs = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/i;
/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
 */

const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

const allowedAttribute = (attr, allowedAttributeList) => {
  const attrName = attr.nodeName.toLowerCase();

  if (allowedAttributeList.includes(attrName)) {
    if (uriAttrs.has(attrName)) {
      return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
    }

    return true;
  }

  const regExp = allowedAttributeList.filter(attrRegex => attrRegex instanceof RegExp); // Check if a regular expression validates the attribute.

  for (let i = 0, len = regExp.length; i < len; i++) {
    if (regExp[i].test(attrName)) {
      return true;
    }
  }

  return false;
};

const DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }

  if (sanitizeFn && typeof sanitizeFn === 'function') {
    return sanitizeFn(unsafeHtml);
  }

  const domParser = new window.DOMParser();
  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  const allowlistKeys = Object.keys(allowList);
  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

  for (let i = 0, len = elements.length; i < len; i++) {
    const el = elements[i];
    const elName = el.nodeName.toLowerCase();

    if (!allowlistKeys.includes(elName)) {
      el.parentNode.removeChild(el);
      continue;
    }

    const attributeList = [].concat(...el.attributes);
    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elName] || []);
    attributeList.forEach(attr => {
      if (!allowedAttribute(attr, allowedAttributes)) {
        el.removeAttribute(attr.nodeName);
      }
    });
  }

  return createdDocument.body.innerHTML;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$4 = 'tooltip';
const DATA_KEY$4 = 'bs.tooltip';
const EVENT_KEY$4 = `.${DATA_KEY$4}`;
const CLASS_PREFIX$1 = 'bs-tooltip';
const BSCLS_PREFIX_REGEX$1 = new RegExp(`(^|\\s)${CLASS_PREFIX$1}\\S+`, 'g');
const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
const DefaultType$3 = {
  animation: 'boolean',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string',
  delay: '(number|object)',
  html: 'boolean',
  selector: '(string|boolean)',
  placement: '(string|function)',
  offset: '(array|string|function)',
  container: '(string|element|boolean)',
  fallbackPlacements: 'array',
  boundary: '(string|element)',
  customClass: '(string|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  allowList: 'object',
  popperConfig: '(null|object|function)'
};
const AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
const Default$3 = {
  animation: true,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  trigger: 'hover focus',
  title: '',
  delay: 0,
  html: false,
  selector: false,
  placement: 'top',
  offset: [0, 0],
  container: false,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  boundary: 'clippingParents',
  customClass: '',
  sanitize: true,
  sanitizeFn: null,
  allowList: DefaultAllowlist,
  popperConfig: null
};
const Event$2 = {
  HIDE: `hide${EVENT_KEY$4}`,
  HIDDEN: `hidden${EVENT_KEY$4}`,
  SHOW: `show${EVENT_KEY$4}`,
  SHOWN: `shown${EVENT_KEY$4}`,
  INSERTED: `inserted${EVENT_KEY$4}`,
  CLICK: `click${EVENT_KEY$4}`,
  FOCUSIN: `focusin${EVENT_KEY$4}`,
  FOCUSOUT: `focusout${EVENT_KEY$4}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
};
const CLASS_NAME_FADE$3 = 'fade';
const CLASS_NAME_MODAL = 'modal';
const CLASS_NAME_SHOW$3 = 'show';
const HOVER_STATE_SHOW = 'show';
const HOVER_STATE_OUT = 'out';
const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
const TRIGGER_HOVER = 'hover';
const TRIGGER_FOCUS = 'focus';
const TRIGGER_CLICK = 'click';
const TRIGGER_MANUAL = 'manual';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Tooltip extends BaseComponent {
  constructor(element, config) {
    if (typeof _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    }

    super(element); // private

    this._isEnabled = true;
    this._timeout = 0;
    this._hoverState = '';
    this._activeTrigger = {};
    this._popper = null; // Protected

    this.config = this._getConfig(config);
    this.tip = null;

    this._setListeners();
  } // Getters


  static get Default() {
    return Default$3;
  }

  static get NAME() {
    return NAME$4;
  }

  static get DATA_KEY() {
    return DATA_KEY$4;
  }

  static get Event() {
    return Event$2;
  }

  static get EVENT_KEY() {
    return EVENT_KEY$4;
  }

  static get DefaultType() {
    return DefaultType$3;
  } // Public


  enable() {
    this._isEnabled = true;
  }

  disable() {
    this._isEnabled = false;
  }

  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }

  toggle(event) {
    if (!this._isEnabled) {
      return;
    }

    if (event) {
      const context = this._initializeOnDelegatedTarget(event);

      context._activeTrigger.click = !context._activeTrigger.click;

      if (context._isWithActiveTrigger()) {
        context._enter(null, context);
      } else {
        context._leave(null, context);
      }
    } else {
      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$3)) {
        this._leave(null, this);

        return;
      }

      this._enter(null, this);
    }
  }

  dispose() {
    clearTimeout(this._timeout);
    EventHandler.off(this._element.closest(`.${CLASS_NAME_MODAL}`), 'hide.bs.modal', this._hideModalHandler);

    if (this.tip && this.tip.parentNode) {
      this.tip.parentNode.removeChild(this.tip);
    }

    this._isEnabled = null;
    this._timeout = null;
    this._hoverState = null;
    this._activeTrigger = null;

    if (this._popper) {
      this._popper.destroy();
    }

    this._popper = null;
    this.config = null;
    this.tip = null;
    super.dispose();
  }

  show() {
    if (this._element.style.display === 'none') {
      throw new Error('Please use show on visible elements');
    }

    if (!(this.isWithContent() && this._isEnabled)) {
      return;
    }

    const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
    const shadowRoot = findShadowRoot(this._element);
    const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

    if (showEvent.defaultPrevented || !isInTheDom) {
      return;
    }

    const tip = this.getTipElement();
    const tipId = getUID(this.constructor.NAME);
    tip.setAttribute('id', tipId);

    this._element.setAttribute('aria-describedby', tipId);

    this.setContent();

    if (this.config.animation) {
      tip.classList.add(CLASS_NAME_FADE$3);
    }

    const placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this._element) : this.config.placement;

    const attachment = this._getAttachment(placement);

    this._addAttachmentClass(attachment);

    const container = this._getContainer();

    Data.set(tip, this.constructor.DATA_KEY, this);

    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
      container.appendChild(tip);
      EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
    }

    if (this._popper) {
      this._popper.update();
    } else {
      this._popper = _popperjs_core__WEBPACK_IMPORTED_MODULE_1__.createPopper(this._element, tip, this._getPopperConfig(attachment));
    }

    tip.classList.add(CLASS_NAME_SHOW$3);
    const customClass = typeof this.config.customClass === 'function' ? this.config.customClass() : this.config.customClass;

    if (customClass) {
      tip.classList.add(...customClass.split(' '));
    } // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


    if ('ontouchstart' in document.documentElement) {
      [].concat(...document.body.children).forEach(element => {
        EventHandler.on(element, 'mouseover', noop);
      });
    }

    const complete = () => {
      const prevHoverState = this._hoverState;
      this._hoverState = null;
      EventHandler.trigger(this._element, this.constructor.Event.SHOWN);

      if (prevHoverState === HOVER_STATE_OUT) {
        this._leave(null, this);
      }
    };

    if (this.tip.classList.contains(CLASS_NAME_FADE$3)) {
      const transitionDuration = getTransitionDurationFromElement(this.tip);
      EventHandler.one(this.tip, 'transitionend', complete);
      emulateTransitionEnd(this.tip, transitionDuration);
    } else {
      complete();
    }
  }

  hide() {
    if (!this._popper) {
      return;
    }

    const tip = this.getTipElement();

    const complete = () => {
      if (this._isWithActiveTrigger()) {
        return;
      }

      if (this._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
        tip.parentNode.removeChild(tip);
      }

      this._cleanTipClass();

      this._element.removeAttribute('aria-describedby');

      EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);

      if (this._popper) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    tip.classList.remove(CLASS_NAME_SHOW$3); // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support

    if ('ontouchstart' in document.documentElement) {
      [].concat(...document.body.children).forEach(element => EventHandler.off(element, 'mouseover', noop));
    }

    this._activeTrigger[TRIGGER_CLICK] = false;
    this._activeTrigger[TRIGGER_FOCUS] = false;
    this._activeTrigger[TRIGGER_HOVER] = false;

    if (this.tip.classList.contains(CLASS_NAME_FADE$3)) {
      const transitionDuration = getTransitionDurationFromElement(tip);
      EventHandler.one(tip, 'transitionend', complete);
      emulateTransitionEnd(tip, transitionDuration);
    } else {
      complete();
    }

    this._hoverState = '';
  }

  update() {
    if (this._popper !== null) {
      this._popper.update();
    }
  } // Protected


  isWithContent() {
    return Boolean(this.getTitle());
  }

  getTipElement() {
    if (this.tip) {
      return this.tip;
    }

    const element = document.createElement('div');
    element.innerHTML = this.config.template;
    this.tip = element.children[0];
    return this.tip;
  }

  setContent() {
    const tip = this.getTipElement();
    this.setElementContent(SelectorEngine.findOne(SELECTOR_TOOLTIP_INNER, tip), this.getTitle());
    tip.classList.remove(CLASS_NAME_FADE$3, CLASS_NAME_SHOW$3);
  }

  setElementContent(element, content) {
    if (element === null) {
      return;
    }

    if (typeof content === 'object' && isElement(content)) {
      if (content.jquery) {
        content = content[0];
      } // content is a DOM node or a jQuery


      if (this.config.html) {
        if (content.parentNode !== element) {
          element.innerHTML = '';
          element.appendChild(content);
        }
      } else {
        element.textContent = content.textContent;
      }

      return;
    }

    if (this.config.html) {
      if (this.config.sanitize) {
        content = sanitizeHtml(content, this.config.allowList, this.config.sanitizeFn);
      }

      element.innerHTML = content;
    } else {
      element.textContent = content;
    }
  }

  getTitle() {
    let title = this._element.getAttribute('data-bs-original-title');

    if (!title) {
      title = typeof this.config.title === 'function' ? this.config.title.call(this._element) : this.config.title;
    }

    return title;
  }

  updateAttachment(attachment) {
    if (attachment === 'right') {
      return 'end';
    }

    if (attachment === 'left') {
      return 'start';
    }

    return attachment;
  } // Private


  _initializeOnDelegatedTarget(event, context) {
    const dataKey = this.constructor.DATA_KEY;
    context = context || Data.get(event.delegateTarget, dataKey);

    if (!context) {
      context = new this.constructor(event.delegateTarget, this._getDelegateConfig());
      Data.set(event.delegateTarget, dataKey, context);
    }

    return context;
  }

  _getOffset() {
    const {
      offset
    } = this.config;

    if (typeof offset === 'string') {
      return offset.split(',').map(val => Number.parseInt(val, 10));
    }

    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }

    return offset;
  }

  _getPopperConfig(attachment) {
    const defaultBsPopperConfig = {
      placement: attachment,
      modifiers: [{
        name: 'flip',
        options: {
          fallbackPlacements: this.config.fallbackPlacements
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }, {
        name: 'preventOverflow',
        options: {
          boundary: this.config.boundary
        }
      }, {
        name: 'arrow',
        options: {
          element: `.${this.constructor.NAME}-arrow`
        }
      }, {
        name: 'onChange',
        enabled: true,
        phase: 'afterWrite',
        fn: data => this._handlePopperPlacementChange(data)
      }],
      onFirstUpdate: data => {
        if (data.options.placement !== data.placement) {
          this._handlePopperPlacementChange(data);
        }
      }
    };
    return { ...defaultBsPopperConfig,
      ...(typeof this.config.popperConfig === 'function' ? this.config.popperConfig(defaultBsPopperConfig) : this.config.popperConfig)
    };
  }

  _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(`${CLASS_PREFIX$1}-${this.updateAttachment(attachment)}`);
  }

  _getContainer() {
    if (this.config.container === false) {
      return document.body;
    }

    if (isElement(this.config.container)) {
      return this.config.container;
    }

    return SelectorEngine.findOne(this.config.container);
  }

  _getAttachment(placement) {
    return AttachmentMap[placement.toUpperCase()];
  }

  _setListeners() {
    const triggers = this.config.trigger.split(' ');
    triggers.forEach(trigger => {
      if (trigger === 'click') {
        EventHandler.on(this._element, this.constructor.Event.CLICK, this.config.selector, event => this.toggle(event));
      } else if (trigger !== TRIGGER_MANUAL) {
        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
        EventHandler.on(this._element, eventIn, this.config.selector, event => this._enter(event));
        EventHandler.on(this._element, eventOut, this.config.selector, event => this._leave(event));
      }
    });

    this._hideModalHandler = () => {
      if (this._element) {
        this.hide();
      }
    };

    EventHandler.on(this._element.closest(`.${CLASS_NAME_MODAL}`), 'hide.bs.modal', this._hideModalHandler);

    if (this.config.selector) {
      this.config = { ...this.config,
        trigger: 'manual',
        selector: ''
      };
    } else {
      this._fixTitle();
    }
  }

  _fixTitle() {
    const title = this._element.getAttribute('title');

    const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

    if (title || originalTitleType !== 'string') {
      this._element.setAttribute('data-bs-original-title', title || '');

      if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
        this._element.setAttribute('aria-label', title);
      }

      this._element.setAttribute('title', '');
    }
  }

  _enter(event, context) {
    context = this._initializeOnDelegatedTarget(event, context);

    if (event) {
      context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
    }

    if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$3) || context._hoverState === HOVER_STATE_SHOW) {
      context._hoverState = HOVER_STATE_SHOW;
      return;
    }

    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_SHOW;

    if (!context.config.delay || !context.config.delay.show) {
      context.show();
      return;
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_SHOW) {
        context.show();
      }
    }, context.config.delay.show);
  }

  _leave(event, context) {
    context = this._initializeOnDelegatedTarget(event, context);

    if (event) {
      context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
    }

    if (context._isWithActiveTrigger()) {
      return;
    }

    clearTimeout(context._timeout);
    context._hoverState = HOVER_STATE_OUT;

    if (!context.config.delay || !context.config.delay.hide) {
      context.hide();
      return;
    }

    context._timeout = setTimeout(() => {
      if (context._hoverState === HOVER_STATE_OUT) {
        context.hide();
      }
    }, context.config.delay.hide);
  }

  _isWithActiveTrigger() {
    for (const trigger in this._activeTrigger) {
      if (this._activeTrigger[trigger]) {
        return true;
      }
    }

    return false;
  }

  _getConfig(config) {
    const dataAttributes = Manipulator.getDataAttributes(this._element);
    Object.keys(dataAttributes).forEach(dataAttr => {
      if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
        delete dataAttributes[dataAttr];
      }
    });

    if (config && typeof config.container === 'object' && config.container.jquery) {
      config.container = config.container[0];
    }

    config = { ...this.constructor.Default,
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    };

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }

    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

    if (config.sanitize) {
      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
    }

    return config;
  }

  _getDelegateConfig() {
    const config = {};

    if (this.config) {
      for (const key in this.config) {
        if (this.constructor.Default[key] !== this.config[key]) {
          config[key] = this.config[key];
        }
      }
    }

    return config;
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX$1);

    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
    }
  }

  _handlePopperPlacementChange(popperData) {
    const {
      state
    } = popperData;

    if (!state) {
      return;
    }

    this.tip = state.elements.popper;

    this._cleanTipClass();

    this._addAttachmentClass(this._getAttachment(state.placement));
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY$4);

      const _config = typeof config === 'object' && config;

      if (!data && /dispose|hide/.test(config)) {
        return;
      }

      if (!data) {
        data = new Tooltip(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tooltip to jQuery only if jQuery is present
 */


defineJQueryPlugin(NAME$4, Tooltip);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$3 = 'popover';
const DATA_KEY$3 = 'bs.popover';
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const CLASS_PREFIX = 'bs-popover';
const BSCLS_PREFIX_REGEX = new RegExp(`(^|\\s)${CLASS_PREFIX}\\S+`, 'g');
const Default$2 = { ...Tooltip.Default,
  placement: 'right',
  offset: [0, 8],
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
};
const DefaultType$2 = { ...Tooltip.DefaultType,
  content: '(string|element|function)'
};
const Event$1 = {
  HIDE: `hide${EVENT_KEY$3}`,
  HIDDEN: `hidden${EVENT_KEY$3}`,
  SHOW: `show${EVENT_KEY$3}`,
  SHOWN: `shown${EVENT_KEY$3}`,
  INSERTED: `inserted${EVENT_KEY$3}`,
  CLICK: `click${EVENT_KEY$3}`,
  FOCUSIN: `focusin${EVENT_KEY$3}`,
  FOCUSOUT: `focusout${EVENT_KEY$3}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
};
const CLASS_NAME_FADE$2 = 'fade';
const CLASS_NAME_SHOW$2 = 'show';
const SELECTOR_TITLE = '.popover-header';
const SELECTOR_CONTENT = '.popover-body';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default$2;
  }

  static get NAME() {
    return NAME$3;
  }

  static get DATA_KEY() {
    return DATA_KEY$3;
  }

  static get Event() {
    return Event$1;
  }

  static get EVENT_KEY() {
    return EVENT_KEY$3;
  }

  static get DefaultType() {
    return DefaultType$2;
  } // Overrides


  isWithContent() {
    return this.getTitle() || this._getContent();
  }

  setContent() {
    const tip = this.getTipElement(); // we use append for html objects to maintain js events

    this.setElementContent(SelectorEngine.findOne(SELECTOR_TITLE, tip), this.getTitle());

    let content = this._getContent();

    if (typeof content === 'function') {
      content = content.call(this._element);
    }

    this.setElementContent(SelectorEngine.findOne(SELECTOR_CONTENT, tip), content);
    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
  } // Private


  _addAttachmentClass(attachment) {
    this.getTipElement().classList.add(`${CLASS_PREFIX}-${this.updateAttachment(attachment)}`);
  }

  _getContent() {
    return this._element.getAttribute('data-bs-content') || this.config.content;
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const tabClass = tip.getAttribute('class').match(BSCLS_PREFIX_REGEX);

    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
    }
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY$3);

      const _config = typeof config === 'object' ? config : null;

      if (!data && /dispose|hide/.test(config)) {
        return;
      }

      if (!data) {
        data = new Popover(this, _config);
        Data.set(this, DATA_KEY$3, data);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Popover to jQuery only if jQuery is present
 */


defineJQueryPlugin(NAME$3, Popover);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$2 = 'scrollspy';
const DATA_KEY$2 = 'bs.scrollspy';
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY$1 = '.data-api';
const Default$1 = {
  offset: 10,
  method: 'auto',
  target: ''
};
const DefaultType$1 = {
  offset: 'number',
  method: 'string',
  target: '(string|element)'
};
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
const CLASS_NAME_ACTIVE$1 = 'active';
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
const SELECTOR_NAV_LINKS = '.nav-link';
const SELECTOR_NAV_ITEMS = '.nav-item';
const SELECTOR_LIST_ITEMS = '.list-group-item';
const SELECTOR_DROPDOWN$1 = '.dropdown';
const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
const METHOD_OFFSET = 'offset';
const METHOD_POSITION = 'position';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
    this._config = this._getConfig(config);
    this._selector = `${this._config.target} ${SELECTOR_NAV_LINKS}, ${this._config.target} ${SELECTOR_LIST_ITEMS}, ${this._config.target} .${CLASS_NAME_DROPDOWN_ITEM}`;
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;
    EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
    this.refresh();

    this._process();
  } // Getters


  static get Default() {
    return Default$1;
  }

  static get DATA_KEY() {
    return DATA_KEY$2;
  } // Public


  refresh() {
    const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
    const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
    const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
    this._offsets = [];
    this._targets = [];
    this._scrollHeight = this._getScrollHeight();
    const targets = SelectorEngine.find(this._selector);
    targets.map(element => {
      const targetSelector = getSelectorFromElement(element);
      const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

      if (target) {
        const targetBCR = target.getBoundingClientRect();

        if (targetBCR.width || targetBCR.height) {
          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
        }
      }

      return null;
    }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
      this._offsets.push(item[0]);

      this._targets.push(item[1]);
    });
  }

  dispose() {
    super.dispose();
    EventHandler.off(this._scrollElement, EVENT_KEY$2);
    this._scrollElement = null;
    this._config = null;
    this._selector = null;
    this._offsets = null;
    this._targets = null;
    this._activeTarget = null;
    this._scrollHeight = null;
  } // Private


  _getConfig(config) {
    config = { ...Default$1,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' && config ? config : {})
    };

    if (typeof config.target !== 'string' && isElement(config.target)) {
      let {
        id
      } = config.target;

      if (!id) {
        id = getUID(NAME$2);
        config.target.id = id;
      }

      config.target = `#${id}`;
    }

    typeCheckConfig(NAME$2, config, DefaultType$1);
    return config;
  }

  _getScrollTop() {
    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  }

  _getScrollHeight() {
    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  }

  _getOffsetHeight() {
    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  }

  _process() {
    const scrollTop = this._getScrollTop() + this._config.offset;

    const scrollHeight = this._getScrollHeight();

    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

    if (this._scrollHeight !== scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      const target = this._targets[this._targets.length - 1];

      if (this._activeTarget !== target) {
        this._activate(target);
      }

      return;
    }

    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
      this._activeTarget = null;

      this._clear();

      return;
    }

    for (let i = this._offsets.length; i--;) {
      const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

      if (isActiveTarget) {
        this._activate(this._targets[i]);
      }
    }
  }

  _activate(target) {
    this._activeTarget = target;

    this._clear();

    const queries = this._selector.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);

    const link = SelectorEngine.findOne(queries.join(','));

    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
      link.classList.add(CLASS_NAME_ACTIVE$1);
    } else {
      // Set triggered link as active
      link.classList.add(CLASS_NAME_ACTIVE$1);
      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup => {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1)); // Handle special case when .nav-link is inside .nav-item

        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
        });
      });
    }

    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }

  _clear() {
    SelectorEngine.find(this._selector).filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = ScrollSpy.getInstance(this) || new ScrollSpy(this, typeof config === 'object' ? config : {});

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .ScrollSpy to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME$2, ScrollSpy);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$1 = 'tab';
const DATA_KEY$1 = 'bs.tab';
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const DATA_API_KEY = '.data-api';
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE$1 = 'fade';
const CLASS_NAME_SHOW$1 = 'show';
const SELECTOR_DROPDOWN = '.dropdown';
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
const SELECTOR_ACTIVE = '.active';
const SELECTOR_ACTIVE_UL = ':scope > li > .active';
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Tab extends BaseComponent {
  // Getters
  static get DATA_KEY() {
    return DATA_KEY$1;
  } // Public


  show() {
    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
      return;
    }

    let previous;
    const target = getElementFromSelector(this._element);

    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

    if (listElement) {
      const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
      previous = SelectorEngine.find(itemSelector, listElement);
      previous = previous[previous.length - 1];
    }

    const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
      relatedTarget: this._element
    }) : null;
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
      relatedTarget: previous
    });

    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
      return;
    }

    this._activate(this._element, listElement);

    const complete = () => {
      EventHandler.trigger(previous, EVENT_HIDDEN$1, {
        relatedTarget: this._element
      });
      EventHandler.trigger(this._element, EVENT_SHOWN$1, {
        relatedTarget: previous
      });
    };

    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  } // Private


  _activate(element, container, callback) {
    const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
    const active = activeElements[0];
    const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

    const complete = () => this._transitionComplete(element, active, callback);

    if (active && isTransitioning) {
      const transitionDuration = getTransitionDurationFromElement(active);
      active.classList.remove(CLASS_NAME_SHOW$1);
      EventHandler.one(active, 'transitionend', complete);
      emulateTransitionEnd(active, transitionDuration);
    } else {
      complete();
    }
  }

  _transitionComplete(element, active, callback) {
    if (active) {
      active.classList.remove(CLASS_NAME_ACTIVE);
      const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

      if (dropdownChild) {
        dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
      }

      if (active.getAttribute('role') === 'tab') {
        active.setAttribute('aria-selected', false);
      }
    }

    element.classList.add(CLASS_NAME_ACTIVE);

    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', true);
    }

    reflow(element);

    if (element.classList.contains(CLASS_NAME_FADE$1)) {
      element.classList.add(CLASS_NAME_SHOW$1);
    }

    let parent = element.parentNode;

    if (parent && parent.nodeName === 'LI') {
      parent = parent.parentNode;
    }

    if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
      const dropdownElement = element.closest(SELECTOR_DROPDOWN);

      if (dropdownElement) {
        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
      }

      element.setAttribute('aria-expanded', true);
    }

    if (callback) {
      callback();
    }
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Data.get(this, DATA_KEY$1) || new Tab(this);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  const data = Data.get(this, DATA_KEY$1) || new Tab(this);
  data.show();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tab to jQuery only if jQuery is present
 */

defineJQueryPlugin(NAME$1, Tab);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'toast';
const DATA_KEY = 'bs.toast';
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_HIDE = 'hide';
const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';
const DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5000
};
const SELECTOR_DATA_DISMISS = '[data-bs-dismiss="toast"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Toast extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._timeout = null;

    this._setListeners();
  } // Getters


  static get DefaultType() {
    return DefaultType;
  }

  static get Default() {
    return Default;
  }

  static get DATA_KEY() {
    return DATA_KEY;
  } // Public


  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

    if (showEvent.defaultPrevented) {
      return;
    }

    this._clearTimeout();

    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }

    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);

      this._element.classList.add(CLASS_NAME_SHOW);

      EventHandler.trigger(this._element, EVENT_SHOWN);

      if (this._config.autohide) {
        this._timeout = setTimeout(() => {
          this.hide();
        }, this._config.delay);
      }
    };

    this._element.classList.remove(CLASS_NAME_HIDE);

    reflow(this._element);

    this._element.classList.add(CLASS_NAME_SHOWING);

    if (this._config.animation) {
      const transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, 'transitionend', complete);
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      complete();
    }
  }

  hide() {
    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
      return;
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE);

      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };

    this._element.classList.remove(CLASS_NAME_SHOW);

    if (this._config.animation) {
      const transitionDuration = getTransitionDurationFromElement(this._element);
      EventHandler.one(this._element, 'transitionend', complete);
      emulateTransitionEnd(this._element, transitionDuration);
    } else {
      complete();
    }
  }

  dispose() {
    this._clearTimeout();

    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }

    super.dispose();
    this._config = null;
  } // Private


  _getConfig(config) {
    config = { ...Default,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' && config ? config : {})
    };
    typeCheckConfig(NAME, config, this.constructor.DefaultType);
    return config;
  }

  _setListeners() {
    EventHandler.on(this._element, EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, () => this.hide());
  }

  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      let data = Data.get(this, DATA_KEY);

      const _config = typeof config === 'object' && config;

      if (!data) {
        data = new Toast(this, _config);
      }

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Toast to jQuery only if jQuery is present
 */


defineJQueryPlugin(NAME, Toast);


//# sourceMappingURL=bootstrap.esm.js.map


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".cancel-project-icon, .calender-icon, #pencil-icon, .project-icon, .inbox-icon, .list-vector, #btn-expand {\n  height: 1em;\n  width: 1em;\n}\n\na {\n  text-decoration: none;\n}\n\naside {\n  position: absolute;\n  height: 100%;\n  width: 60px;\n  background-color: #4723d9;\n  font-size: 0.95rem;\n  transition: all 0.5s;\n}\n\nnav {\n  margin-left: 60px;\n  transition: all 0.5s;\n}\n\nmain {\n  margin-left: 60px;\n  padding: 2em 3em;\n  transition: all 0.5s;\n}\n\n#btn-expand {\n  fill: rgba(0, 0, 0, 0.675);\n  transition: all 0.5s;\n}\n\n#btn-expand:hover {\n  fill: black;\n}\n\n.logo-container {\n  width: 100%;\n  justify-content: center;\n  text-align: center;\n  padding: 1rem 0;\n}\n.logo-container .logo {\n  height: 1.1rem;\n  width: 1.1rem;\n  border-radius: 100%;\n}\n\n.logo-name {\n  margin-left: 0.9rem;\n  font-weight: bold;\n  color: white;\n}\n\n.todo-btn:hover {\n  fill: #3b903b;\n}\n\n.todo-btn {\n  fill: #0eb40b;\n}\n\n.side-links {\n  width: 100%;\n  padding: 0;\n  margin: 0;\n  list-style: none;\n  text-align: center;\n  border-top: 1px solid rgba(255, 255, 255, 0.6);\n  border-bottom: 1px solid rgba(255, 255, 255, 0.6);\n}\n.side-links li {\n  padding: 16px 0;\n  cursor: pointer;\n}\n\n.list-vector {\n  fill: rgba(255, 255, 255, 0.6);\n  transition: all 0.5s;\n}\n\n.link:hover .list-vector,\n.side-projects-form-tab:hover .list-vector {\n  fill: white;\n}\n.link:hover span,\n.side-projects-form-tab:hover span {\n  color: white;\n}\n\n.side-projects,\n.side-projects-header {\n  padding: 0;\n  margin: 0;\n  text-align: center;\n  list-style: none;\n  transition: all 0.5s;\n}\n.side-projects li,\n.side-projects-header li {\n  padding-bottom: 3px;\n  cursor: pointer;\n}\n\n.side-projects > li:hover .list-vector {\n  fill: white;\n}\n.side-projects > li:hover span {\n  color: white;\n}\n\n.link-text {\n  color: rgba(255, 255, 255, 0.6);\n  margin-left: 0.9rem;\n  transition: all 0.5s;\n}\n\n.todo-container {\n  font-size: 0.9em;\n  padding: 0.5rem 1rem;\n  margin-bottom: 20px;\n  border: 1px solid rgba(215, 215, 215, 0.559);\n  border-radius: 5px;\n  transition: all 0.5s;\n}\n\n.todo-container:hover {\n  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.476);\n}\n\n.todo-header-container {\n  margin-left: 1rem;\n}\n.todo-header-container p {\n  margin: 0;\n}\n\n.hide-element {\n  display: none;\n}\n\n.todo-container-expanded .todo-notes {\n  margin-top: 8px;\n  margin-left: 1.8rem;\n}\n.todo-container-expanded .checklist-item {\n  margin-left: 2em;\n}\n.todo-container-expanded .checklist-title {\n  margin: 0 0 0 0.5em;\n}\n\n.todo-icons-container svg {\n  height: 20px;\n  width: 20px;\n  margin-left: 2em;\n}\n.todo-icons-container .todo-delete {\n  fill: rgba(252, 83, 83, 0.89);\n}\n.todo-icons-container .todo-edit {\n  fill: rgba(252, 195, 90, 0.856);\n}\n.todo-icons-container .todo-delete:hover {\n  fill: #ef2020;\n}\n.todo-icons-container .todo-edit:hover {\n  fill: orange;\n}\n\n.side-bar-expanded {\n  width: 15.5rem;\n  text-transform: capitalize;\n}\n\n.main-content-expanded,\n.nav-expanded {\n  margin-left: 15.5rem;\n}\n\n.logo-container-expanded {\n  padding: 1rem 1.5rem;\n  text-align: start;\n  justify-content: space-between;\n}\n\n.side-projects-expanded,\n.side-links-expanded {\n  padding: 0 1.5rem;\n  text-align: start;\n}\n\n.todo-form label {\n  display: block;\n  text-transform: capitalize;\n}\n.todo-form textarea[name=notes] {\n  resize: none;\n}\n\n.inbox-icon {\n  fill: #3333fb;\n}\n\n.project-icon {\n  fill: #63e5ff;\n}\n\n#pencil-icon {\n  fill: #f6f98e;\n}\n\n.calender-icon {\n  fill: #fc431e;\n}\n\n.cancel-project-icon {\n  fill: rgba(255, 0, 0, 0.6);\n  transition: all 0.5s;\n}\n\n.cancel-project-icon:hover {\n  fill: red;\n}\n\n.project-form {\n  width: 150px;\n  margin-left: 1.1rem;\n  border: none;\n  padding: 0 1px;\n}\n\n.hide-text {\n  display: none;\n}\n\n.navbar-toggler {\n  display: none;\n}\n\n@media (max-width: 767.98px) {\n  aside,\n.side-bar-expanded {\n    position: sticky;\n    width: 100% !important;\n    text-align: start;\n  }\n\n  .navbar-toggler {\n    display: block;\n  }\n\n  .side-links li {\n    padding: 5px 0;\n  }\n\n  .navbar {\n    display: none;\n  }\n\n  .main-content-expanded,\n.nav-expanded,\nmain {\n    margin: 0 !important;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAQA;EACI,WAAA;EACA,UAAA;AAPJ;;AAUA;EACI,qBAAA;AAPJ;;AAUA;EACI,kBAAA;EACA,YAAA;EACA,WAhBU;EAkBV,yBAhBW;EAiBX,kBAAA;EACA,oBAAA;AARJ;;AAWA;EACI,iBAxBU;EAyBV,oBAAA;AARJ;;AAWA;EACI,iBA7BU;EA8BV,gBAAA;EACA,oBAAA;AARJ;;AAWA;EAEI,0BAAA;EACA,oBAAA;AATJ;;AAYA;EACI,WAAA;AATJ;;AAYA;EACI,WAAA;EACA,uBAAA;EACA,kBAAA;EACA,eAAA;AATJ;AAWI;EACI,cAAA;EACA,aAAA;EACA,mBAAA;AATR;;AAaA;EACI,mBAzDe;EA0Df,iBAAA;EACA,YAAA;AAVJ;;AAaA;EACI,aAAA;AAVJ;;AAaA;EACI,aAAA;AAVJ;;AAaA;EACI,WAAA;EACA,UAAA;EACA,SAAA;EACA,gBAAA;EACA,kBAAA;EACA,8CAjFc;EAkFd,iDAlFc;AAwElB;AAYI;EACI,eAAA;EACA,eAAA;AAVR;;AAcA;EAEI,8BA3FU;EA4FV,oBAAA;AAZJ;;AAiBI;;EACI,WAAA;AAbR;AAgBI;;EACI,YAAA;AAbR;;AAiBA;;EAEI,UAAA;EACA,SAAA;EACA,kBAAA;EACA,gBAAA;EACA,oBAAA;AAdJ;AAgBI;;EACI,mBAAA;EACA,eAAA;AAbR;;AAkBI;EACI,WAAA;AAfR;AAkBI;EACI,YAAA;AAhBR;;AAoBA;EACI,+BAnIU;EAoIV,mBAhIe;EAiIf,oBAAA;AAjBJ;;AAoBA;EACI,gBAAA;EACA,oBAAA;EACA,mBAAA;EACA,4CAAA;EACA,kBAAA;EACA,oBAAA;AAjBJ;;AAoBA;EACI,4CAAA;AAjBJ;;AAoBA;EACI,iBAAA;AAjBJ;AAmBI;EACI,SAAA;AAjBR;;AAqBA;EACI,aAAA;AAlBJ;;AAsBI;EACI,eAAA;EACA,mBAAA;AAnBR;AAsBI;EACI,gBAAA;AApBR;AAuBI;EACI,mBAAA;AArBR;;AA0BI;EACI,YAAA;EACA,WAAA;EACA,gBAAA;AAvBR;AA0BI;EACI,6BAAA;AAxBR;AA2BI;EACI,+BAAA;AAzBR;AA4BI;EACI,aAAA;AA1BR;AA6BI;EACI,YAAA;AA3BR;;AA+BA;EACI,cAvMmB;EAwMnB,0BAAA;AA5BJ;;AA+BA;;EAEI,oBA7MmB;AAiLvB;;AA+BA;EACI,oBAAA;EACA,iBAAA;EACA,8BAAA;AA5BJ;;AA+BA;;EAEI,iBAzNgB;EA0NhB,iBAAA;AA5BJ;;AAgCI;EACI,cAAA;EACA,0BAAA;AA7BR;AAgCI;EACI,YAAA;AA9BR;;AAkCA;EAEI,aAAA;AAhCJ;;AAmCA;EAEI,aAAA;AAjCJ;;AAoCA;EAEI,aAAA;AAlCJ;;AAqCA;EAEI,aAAA;AAnCJ;;AAsCA;EAEI,0BAAA;EACA,oBAAA;AApCJ;;AAuCA;EACI,SAAA;AApCJ;;AAuCA;EACI,YAAA;EACA,mBAAA;EACA,YAAA;EACA,cAAA;AApCJ;;AAuCA;EACI,aAAA;AApCJ;;AAuCA;EACI,aAAA;AApCJ;;AAuCA;EACI;;IAEI,gBAAA;IACA,sBAAA;IACA,iBAAA;EApCN;;EAuCE;IACI,cAAA;EApCN;;EAwCM;IACI,cAAA;EArCV;;EAyCE;IACI,aAAA;EAtCN;;EAyCE;;;IAGI,oBAAA;EAtCN;AACF","sourcesContent":["$side-bar-border: 1px solid rgba(255, 255, 255, 0.6);\n$white-faded: rgba(255, 255, 255, 0.6);\n$side-link-padding: 0 1.5rem;\n$expanded-body-margin: 15.5rem;\n$body-margin: 60px;\n$side-text-margin: 0.9rem;\n$purple-color: #4723d9;\n\n%icon-size {\n    height: 1em;\n    width: 1em;\n}\n\na {\n    text-decoration: none;\n}\n\naside {\n    position: absolute;\n    height: 100%;\n    width: $body-margin;\n\n    background-color: $purple-color;\n    font-size: .95rem;\n    transition: all .5s;\n}\n\nnav {\n    margin-left: $body-margin;\n    transition: all .5s;\n}\n\nmain {\n    margin-left: $body-margin;\n    padding: 2em 3em;\n    transition: all .5s;\n}\n\n#btn-expand {\n    @extend %icon-size;\n    fill: rgba(0, 0, 0, 0.675);\n    transition: all .5s;\n}\n\n#btn-expand:hover {\n    fill: black;\n}\n\n.logo-container {\n    width: 100%;\n    justify-content: center;\n    text-align: center;\n    padding: 1rem 0;\n\n    .logo {\n        height: 1.1rem;\n        width: 1.1rem;\n        border-radius: 100%;\n    }\n}\n\n.logo-name {\n    margin-left: $side-text-margin;\n    font-weight: bold;\n    color: white;\n}\n\n.todo-btn:hover {\n    fill: rgb(59, 144, 59);\n}\n\n.todo-btn {\n    fill: rgb(14, 180, 11);\n}\n\n.side-links {\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    list-style: none;\n    text-align: center;\n    border-top:$side-bar-border;\n    border-bottom: $side-bar-border;\n\n    li {\n        padding: 16px 0;\n        cursor: pointer\n    }\n}\n\n.list-vector {\n    @extend %icon-size;\n    fill: $white-faded;\n    transition: all .5s;\n}\n\n.link:hover,\n.side-projects-form-tab:hover {\n    .list-vector {\n        fill: white;\n    }\n\n    span {\n        color: white;\n    }\n}\n\n.side-projects,\n.side-projects-header {\n    padding: 0;\n    margin: 0;\n    text-align: center;\n    list-style: none;\n    transition: all .5s;\n\n    li {\n        padding-bottom: 3px;\n        cursor: pointer;\n    }\n}\n\n.side-projects > li:hover {\n    .list-vector {\n        fill: white;\n    }\n\n    span {\n        color: white;\n    }\n}\n\n.link-text {\n    color: $white-faded;\n    margin-left: $side-text-margin;\n    transition: all .5s;\n}\n\n.todo-container {\n    font-size: 0.9em;\n    padding: 0.5rem 1rem;\n    margin-bottom: 20px;\n    border: 1px solid rgba(215, 215, 215, 0.559);\n    border-radius: 5px;\n    transition: all .5s;\n}\n\n.todo-container:hover {\n    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.476);\n}\n\n.todo-header-container {\n    margin-left: 1rem;\n\n    p {\n        margin: 0;\n    }\n}\n\n.hide-element {\n    display: none;\n}\n\n.todo-container-expanded {\n    .todo-notes {\n        margin-top: 8px;\n        margin-left: 1.8rem;\n    }\n\n    .checklist-item {\n        margin-left: 2em;\n    }\n    \n    .checklist-title {\n        margin: 0 0 0 0.5em;\n    } \n}\n\n.todo-icons-container {\n    svg {\n        height: 20px;\n        width: 20px;\n        margin-left: 2em;\n    }\n\n    .todo-delete {\n        fill: rgba(252, 83, 83, 0.89);\n    }\n\n    .todo-edit {\n        fill: rgba(252, 195, 90, 0.856);\n    }\n\n    .todo-delete:hover {\n        fill: rgb(239, 32, 32);\n    }\n\n    .todo-edit:hover {\n        fill: orange;\n    }\n}\n\n.side-bar-expanded {\n    width: $expanded-body-margin;\n    text-transform: capitalize;\n}\n\n.main-content-expanded, \n.nav-expanded {\n    margin-left: $expanded-body-margin;\n}\n\n.logo-container-expanded {\n    padding: 1rem 1.5rem;\n    text-align: start;\n    justify-content: space-between;\n}\n\n.side-projects-expanded, \n.side-links-expanded {\n    padding: $side-link-padding;\n    text-align: start;\n}\n\n.todo-form {\n    label {\n        display: block;\n        text-transform: capitalize;\n    }\n\n    textarea[name=notes] {\n        resize: none;\n    }\n}\n\n.inbox-icon {\n    @extend %icon-size;\n    fill: rgb(51, 51, 251);\n}\n\n.project-icon {\n    @extend %icon-size;\n    fill: rgb(99, 229, 255);\n}\n\n#pencil-icon {\n    @extend %icon-size;\n    fill: rgb(246, 249, 142);\n}\n\n.calender-icon {\n    @extend %icon-size;\n    fill: rgb(252, 67, 30);\n}\n\n.cancel-project-icon {\n    @extend %icon-size;\n    fill: rgba(255, 0, 0, 0.6);\n    transition: all .5s;\n}\n\n.cancel-project-icon:hover {\n    fill: rgb(255, 0, 0);\n}\n\n.project-form {\n    width: 150px;\n    margin-left: 1.1rem;\n    border: none;\n    padding: 0 1px;\n}\n\n.hide-text {\n    display: none;\n}\n\n.navbar-toggler {\n    display: none;\n}\n\n@media (max-width: 767.98px) {\n    aside,\n    .side-bar-expanded {\n        position: sticky;\n        width: 100% !important; \n        text-align: start;\n    }\n    \n    .navbar-toggler {\n        display: block;\n    }\n\n    .side-links {\n        li {\n            padding: 5px 0;\n        }\n    }\n\n    .navbar {\n        display: none;\n    }\n\n    .main-content-expanded, \n    .nav-expanded,\n    main {\n        margin: 0 !important;\n    }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/getDay/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/getDay/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {0|1|2|3|4|5|6} the day of week, 0 represents Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */

function getDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);
  var day = date.getDay();
  return day;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameWeek)
/* harmony export */ });
/* harmony import */ var _startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfWeek/index.js */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week?
 *
 * @description
 * Are the given dates in the same week?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the dates are in the same week
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * var result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 */
function isSameWeek(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);
  var dateLeftStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateLeft, dirtyOptions);
  var dateRightStartOfWeek = (0,_startOfWeek_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDateRight, dirtyOptions);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isThisWeek/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/isThisWeek/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isThisWeek)
/* harmony export */ });
/* harmony import */ var _isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../isSameWeek/index.js */ "./node_modules/date-fns/esm/isSameWeek/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to check
 * @param {Object} [options] - the object with options
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Boolean} the date is in this week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * var result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
function isThisWeek(dirtyDate, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  return (0,_isSameWeek_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate, Date.now(), options);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfWeek(dirtyDate, dirtyOptions) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/todo-list-logo3.png":
/*!****************************************!*\
  !*** ./src/images/todo-list-logo3.png ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAADhAAAA4QCAYAAAAduq86AAAgAElEQVR4nOzbAQkAMAzAsPk3vZk4HEqioAY6CwAAAAAAAAAAAAAAAADkzO8AAAAAAAAAAAAAAAAAAOA9AyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAAAQQZCAAAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAABAkIEQAAAAAAAAAAAAAAAAAIIMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgCADIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAABBBkIAAAAAAAAAAAAAAAAACDIQAgAAAAAAAAAAAAAAAECQgRAAAAAAAAAAAAAAAAAAggyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACAIAMhAAAAAAAAAAAAAAAAAAQZCAEAAAAAAAAAAAAAAAAgyEAIAAAAAAAAAAAAAAAAAEEGQgAAAAAAAAAAAAAAAAAIMhACAAAAAAAAAAAAAAAAQJCBEAAAAAAAAAAAAAAAAACCDIQAAAAAAAAAAAAAAAAAEGQgBAAAAAAAAAAAAAAAAIAgAyEAAAAAAAAAAAAAAAAABBkIAQAAAAAAAAAAAAAAACDIQAgAAAAAAADHvh3IAAAAAAzyt77HVx4BAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAABZj4TIAACAASURBVAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYTEvh3IAAAAAAzyt77HVx4BAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAsW8HMgAAAACD/K3v8ZVHAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAARwU2gwAAIABJREFUADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAAAAAAAAwJhAAAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAwJBACAAAAAAAAAAAAAAAAABDAiEAAAAAAAAAAAAAAAAADAmEAAAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAADAkEAIAAAAAAAAAAAAAAAAAEMCIQAAAAAAAAAAAAAAAAAMCYQAAAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAMCQQAgAAAAAAAAAAAAAAAAAQwIhAAAAAAAAAAAA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EAIAAAAAAAAAAFEMCCVJUmIGhAAAVDAgBAAAAAAAAAAAohgQSpKkxAwIAQCoYEAIAAAAAAAAAABEMSCUJEmJGRACAFDBgBAAAAAAAAAAAIhiQChJkhIzIAQAoIIBIQAAAAAAAAAAEMWAUJIkJWZACABABQNCAAAAAAAAAAAgigGhJElKzIAQAIAKBoQAAAAAAAAAAEAUA0JJkpSYASEAABUMCAEAAAAAAAAAgCgGhJIkKTEDQgAAKhgQAgAAAAAAAAAAUQwIJUlSYgaEAABUMCAEAAAAAAAAAACiGBBKkqTEDAgBAKhgQAgAAAAAAAAAAEQxIJQkSYkZEAIAUMGAEAAAAAAAAAAAiGJAKEmSEjMgBACgggEhAAAAAAAAAAAQxYBQkiQlZkAIAEAFA0IAAAAAAAAAACCKAaEkSUrMgBAAgAoGhAAAAAAAAAAAQBQDQkmSlJgBIQAAFQwIAQAAAAAAAACAKAaEkiQpMQNCAAAqGBACAAAAAAAAAABRDAglSVJiBoQAAFQwIAQAAAAAAAAAAKIYEEqSpMQMCAEAqGBACAAAAAAAAAAARDEglCRJiRkQAgBQwYAQAAAAAAAAAACIYkAoSZISMyAEAKCCASEAAAAAAAAAABDFgFCSJCVmQAgAQAUDQgAAAAAAAAAAIIoBoSRJSsyAEACACgaEAAAAAAAAAABAFANCSZKUmAEhAAAVDAgBAAAAAAAAAIAoBoSSJCkxA0IAACoYEAIAAAAAAAAAAFEMCCVJUmIGhAAAVDAgBAAAAAAAAAAAohgQSpKkxAwIAQCoYEAIAAAAAAAAAABEMSCUJEmJGRACAFDBgBAAAAAAAAAAAIhiQChJkhIzIAQAoIIBIQAAAAAAAAAAEMWAUJIkJWZACABABQNCAAAAAAAAAAAgigGhJElKzIAQAIAKBoQAAAAAAAAAAEAUA0JJkpSYASEAABUMCAEAAAAAAAAAgCgGhJIkKTEDQgAAKhgQAgAAAAAAAAAAUQwIJUlSYgaEAABUMCAEAAAAAAAAAACiGBBKkqTEDAgBAKhgQAgAAAAAAAAAAEQxIJQkSYkZEAIAUMGAEAAAAAAAAAAAiGJAKEmSEjMgBACgggEhAAAAAAAAAAAQxYBQkiQlZkAIAEAFA0IAAAAAAAAAACCKAaEkSUrMgBAAgAoGhAAAAAAAAAAAQBQDQkmSlJgBIQAAFQwIAQAAAAAAAACAKAaEkiQpMQNCAAAqGBACAAAAAAAAAABRDAglSVJiBoQAAFQwIAQAAAAAAAAAAKIYEEqSpMQMCAEAqGBACAAAAAAAAAAARDEglCRJiRkQAgBQwYAQAAAAAAAAAACIYkAoSZISMyAEAKCCASEAAAAAAAAAABDFgFCSJCVmQAgAQAUDQgAAAAAAAAAAIIoBoSRJSsyAEACACgaEAAAAAAAAAABAFANCSZKUmAEhAAAVDAgBAAAAAAAAAIAoBoSSJCkxA0IAACoYEAIAAAAAAAAAAFEMCCVJUmIGhAAAVDAgBAAAAAAAAAAAohgQSpKkxAwIAQCoYEAIAAAAAAAAAABEMSCUJEmJGRACAFDBgBAAAAAAAAAAAIhiQChJkhIzIAQAoIIBIQAAAAAAAAAAEMWAUJIkJWZACABABQNCAAAAAAAAAAAgigGhJElKzIAQAIAKBoQAAAAAAAAAAEAUA0JJkpSYASEAABUMCAEAAAAAAAAAgCgGhJIkKTEDQgAAKhgQAgAAAAAAAAAAUQwIJUlSYgaEAABUMCAEAAAAAAAAAACiGBBKkqTEDAgBAKhgQAgAAAAAAAAAAEQxIJQkSYkZEAIAUMGAEAAAAAAAAAAAiGJAKEmSEjMgBACgggEhAAAAAAAAAAAQxYBQkiQlZkAIAEAFA0IAAAAAAAAAACCKAaEkSUrMgBAAgAoGhAAAAAAAAAAAQBQDQkmSlJgBIQAAFQwIAQAAAAAAAACAKAaEkiQpMQNCAAAqGBACAAAAAAAAAABRDAglSVJiBoQAAFQwIAQAAAAAAAAAAKIYEEqSpMQMCAEAqGBACAAAAAAAAAAARDEg7FtfX69+LACsgD179pS/85IzIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCAGQwIxzIgBACgggEhAAAAAAAAAAAQxYCwz4AQgBkMCMcyIAQAoIIBIQAAAAAAAAAAEMWAsM+AEIAZDAjHMiAEAKCCASEAAAAAAAAAABDFgLDPgBCA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hJO7LbfcsoyNjZV//vOffXnel156adlll13C76tLs2bNKqeeempZtWpVX85i6dKl5V3veld56lOfGn5v0jCbOnVq58/NSSedFH79g2q//fbrfC477LBD+PW32OjoaOdnBgAAXRkQAgBQMSAEAAAAACAzA0JogwFhjjbZZJPy0Y9+tPzmN7+Z8DP+y1/+Uk488cTykpe8JPw++tGMGTPKu9/97nL55ZdP+Czuv//+cvbZZ5ddd901/D6kyJYsWTLhz08ppdx6663h1z6ovvvd73Y6k1JKmTJlSvj1t5hfIAQAIIIBIQAAFQNCAAAAAAAyMyCENhgQ5murrbYqRx99dDnrrLPKokWLys9//vOqSy65pHzzm98sCxYsKNtvv3349Q6yjTbaqHzwgx8sX/rSl8pPfvKTR53FpZdeWsbGxsopp5xS3vjGN4ZfrzRZ+s53vtP5e+NVr3pV+PX3u5kzZ3b+ddPf/e534dffauPj453fYwAA6MqAEACAigEhAAAAAACZGRBCGwwIJam93vOe93T+3vja174Wfv397sgjj+x8Hqecckr49bfa6Oho5+cGAABdGRACAFAxIAQAAAAAIDMDQmiDAaEktdesWbM6f288+OCDZe211w6/h37217/+tfN57LbbbuHX32pjY2OdnxsAAHRlQAgAQMWAEAAAAACAzAwIoQ0GhJLUZtdcc03n746Pf/zj4dffr4444ojO5/C3v/2tPPOZzwy/h1bzC4QAAEQwIAQAoGJACAAAAABAZgaE0AYDQklqs/nz5/f0/bHJJpuE30OvzZgxo9x7772dz+Ciiy4Kv4eW8wuEAABEMCAEAKBiQAgAAAAAQGYGhNAGA0JJarNNN920p++P73//++H30Gtf+MIXejqDvffeO/weWs6AEACACAaEAABUDAgBAAAAAMjMgBDaYEAoSe124YUX9vQdsscee4TfQ9e22Wab8o9//KPzvS9btqw85SlPCb+PlhsdHe3p/QUAgC4MCAEAqBgQAgAAAACQmQEhtMGAUJLabY899ujpO+S2224r06ZNC7+PiTZlypTy61//uqd7P+qoo8Lvo/X8AiEAABEMCAEAqBgQAgAAAACQmQEhtMGAUJLa7g9/+ENP3yM/+MEPwu9hoo2Pj/d0zw888EB59rOfHX4frWdACABABANCAAAqBoQAAAAAAGRmQAhtMCCU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u+ZEO+20U/roYcQZEEqSpDpmQAgAQIIBIQAAHR5++OH4ZWmqww47LH38AAAAAAB06Wc/+1n8njnV/vvvnz5+GHEGhJIkqY4ZEAIAkGBACABAh8HBwfhlabInnngi/REAAAAAANCFq666Kn7HnKq3tzd9/DDiDAglSVIdMyAEACDBgBAAgJfYdddd4xemqRYuXJg+fgAAAAAAunDooYfG75hTnXXWWenjhxFnQChJkuqYASEAAAkGhAAAvMSMGTPiF6ap9t133/TxAwAAAADwOt13333x++Vkl19+efojgBFXtQHhnnvuWa644orS398vSZKG0PLly8tll11Wenp64t/v26N2u51+jQIAoIEMCAEAeIkPfvCD8QvTZN/61rfSHwEAAAAAAK/D3Llz43fLyW655Zb0RwAjrkoDwoULF6aPAwBGpS1btpRPfOIT8e/64cyAEACABANCAABe4pOf/GT8wjRZT09P+iMAAAAAAOA1Wr16dRkzZkz8bjnZf//3f6c/BhhxVRgQTp48udxzzz3powCAUW/t2rVl1qxZ8e/+4ciAEACABANCAABe4utf/3r8wjTd7bffnv4YAAAAAAB4DT7wgQ/E75STvelNbyq//OUv0x8DjLj0gHDcuHHlhz/8YfoYAKBRent74+/fQ62vry99jAAANJABIQAAL/Hoo4/GL0zTHXzwwemPAQAAAACA32DFihXx++R073jHO9IfA0SkB4S33npr+ggAoHE2bdpUpk2bFn8HH0p+gRAAgAQDQgAAXuKXv/xl2WmnneKXpuk+/elPpz8KAAAAAABewfPPP19+53d+J36XnO70009PfxQQkRwQzpo1K/34ANBY999/fxk7dmz8Pbzb/AIhAAAJBoQAALys2bNnxy9Nq9CqVavSHwUAAAAAAC/jb//2b+N3yFXoC1/4QvqjgIjkgPC+++5LPz4ANNpZZ50Vfw/vNr9ACABAggEhAAAv66KLLopfmlahqVOnlp/97GfpjwMAAAAAgF/x+c9/Pn5/XJX8h/BoqtSA8JBDDkk/OgA03qpVq+Lv4d3mFwgBAEgwIAQA4GXddttt8UvTqrTffvuVDRs2pD8SAAAAAABKKTfffHP83rgqTZgwIf1xQExqQHjNNdekHx0AKKUcfvjh8ffxbvILhAAAJBgQAgDwsp555pn4pWmVOvzww9MfCQAAAABA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AAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAAAAAAAAAAAAAACAChkQAgAAAAAAAAAAAAAAAECFDAgBAAAAAAAAAAAAAAAAoEIGhAAAAAAAAAAAAAAAAABQIQNCAAAAAAAAAAAAAAAAAKiQASEAAAAAAAAAAAAAAAAAVMiAEAAAAAAAAAAAAAAAAAAqZEAIAAAAAAAAAAAAAAAAABUyIAQAAPgf9u1ABgAAAGCQv/U9vvIIAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAiH07kAEAAAAY5G99j688AgAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAOX6ptgAACAASURBVACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAiH07kAEAAAAY5G99j688AgAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIsi7dqwAABERJREFUIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAGrfDmQAAAAABvlb3+MrjwAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgRCAAAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAABgSCAEAAAAAAAAAAAAAAAAgCGBEAAAAAAAAAAAAAAAAACGBEIAAAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAAGBIIAQAAAAAAAAAAAAAAACAIYEQAAAAAAAAAAAAAAAAAIYEQgAAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAYEggBAAAAAAAAAAAAAAAAIAhgRAAAAAAAAAAAAAAAAAAhgK7yt5aB4N6ZAAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/expand.js":
/*!***********************!*\
  !*** ./src/expand.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "expandSideBar": () => (/* binding */ expandSideBar),
/* harmony export */   "expandTodo": () => (/* binding */ expandTodo)
/* harmony export */ });
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");




const expandButton = document.querySelector('.expand-btn');
const sideBar = document.querySelector('aside');
const logoContainer = document.querySelector('.logo-container');
const logoName = document.querySelectorAll('.logo-name');
const mainContent = document.querySelector('main');
const navBar = document.querySelector('nav');
const sideLinks = document.querySelector('.side-links');
const projectTabs = document.querySelector('.side-projects');
const sideProjectsHeader= document.querySelector('.side-projects-header');
const todoContent = document.querySelector('.content');

function expandSideBar() {
    expandButton.addEventListener('click', () => {
        const sideBarText = document.querySelectorAll('.link-text');
        
        sideBar.classList.toggle('side-bar-expanded');
        sideLinks.classList.toggle('side-links-expanded');
        projectTabs.classList.toggle('side-projects-expanded');
        sideProjectsHeader.classList.toggle('side-projects-expanded');
        logoContainer.classList.toggle('logo-container-expanded');
        mainContent.classList.toggle('main-content-expanded');
        navBar.classList.toggle('nav-expanded');
        sideBarText.forEach((e) => {
            e.classList.toggle('hide-text');
        });
        logoName.forEach((e) => {
            e.classList.toggle('hide-text');
        });

        if (sideBar.classList.contains('side-bar-expanded')) {
            expandButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" id="btn-expand" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"/>
            </svg> `;
        } else {
            expandButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" id="btn-expand" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
            </svg> `;
        }
        removeExistingProjectForms();
    });
}

function expandTodo() {
    todoContent.addEventListener('click', (e) => {
        let todoContainer = e.target.closest('.todo-container');

        if (
            e.target.classList.contains('todo-container') 
            || e.target.classList.contains('d-flex') 
            || e.target.classList.contains('todo-container-expanded')
        ) {
            todoContainer.children[1].classList.toggle('hide-element');
        }
    });
};

function removeExistingProjectForms() {
    const isSideBarExpanded = sideBar.classList.contains('side-bar-expanded');
    let projectList = [...projectTabs.children];

    if (!isSideBarExpanded) {
        let projectFormIndexes = []
        for (let project of projectList) {
            if (!project.classList.contains('project')) {
                projectFormIndexes.push(projectList.indexOf(project));
            }
        }
        for (let index of projectFormIndexes.reverse()) {
            projectList[index].remove()
            console.log(_projects__WEBPACK_IMPORTED_MODULE_1__.myProjects.splice(index,1));
            console.log(_projects__WEBPACK_IMPORTED_MODULE_1__.myProjects);
        }
    }
}

function toggleCollapse() {
    var collapseElementList = [].slice.call(document.querySelectorAll('.collapse'))
    var collapseList = collapseElementList.map(function (collapseEl) {
      return new bootstrap__WEBPACK_IMPORTED_MODULE_0__.Collapse(collapseEl, {
          toggle: true
      })
    })   
    console.log(collapseElementList)
    console.log(bootstrap__WEBPACK_IMPORTED_MODULE_0__.Collapse) 
    console.log(collapseList);
}


/***/ }),

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayForm": () => (/* binding */ displayForm),
/* harmony export */   "createFormElements": () => (/* binding */ createFormElements),
/* harmony export */   "createChecklistInput": () => (/* binding */ createChecklistInput)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");




const formHeader = document.querySelector('header');
const content = document.querySelector('.content');

function displayForm() {
    updateHeader();
    createFormElements(); 
}

function updateHeader() {
    formHeader.innerHTML = `
    <h1>
        <svg xmlns="http://www.w3.org/2000/svg" id="pencil-icon" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
        </svg>
        <span class="text-capitalize">New Todo</span>
    </h1>`;
}

function createFormElements(isEditing,index) {
    const todoForm = document.createElement('form');
    todoForm.className = 'todo-form'

    const { titleInputContainer, titleInput } = createTitleInput();
    const { projectMenuContainer, projectMenu } = createProjectMenu();
    const { dateContainer, dateInput } = createDateInput();
    const { notesContainer, notesInput } = createNotesInput();
    const { checklistContainer, checklistBtnContainer } = createChecklistForm();

    const submitBtnContainer = document.createElement('div');
    const submitBtn = document.createElement('button');
    submitBtnContainer.className = 'd-grid gap-2';
    submitBtn.className = 'btn btn-success';
    submitBtn.type = 'button';
    submitBtn.textContent = 'submit';
    submitBtnContainer.appendChild(submitBtn);
    submitBtn.addEventListener('click', () => {
        if(isEditing) {
            (0,_index__WEBPACK_IMPORTED_MODULE_0__.submitEdit)(titleInput.value,projectMenu.value,dateInput.value,notesInput.value,submitChecklist(),index)
        } else {
            (0,_index__WEBPACK_IMPORTED_MODULE_0__.submitTodo)(titleInput.value,projectMenu.value,dateInput.value,notesInput.value,submitChecklist(),false);
        }
    });

    todoForm.appendChild(titleInputContainer);
    todoForm.appendChild(projectMenuContainer);
    todoForm.appendChild(dateContainer);
    todoForm.appendChild(notesContainer);
    todoForm.appendChild(checklistContainer);
    todoForm.appendChild(checklistBtnContainer);
    todoForm.appendChild(submitBtnContainer);
    content.appendChild(todoForm);

    return { titleInput, projectMenu, dateInput, notesInput, checklistContainer }
}

function createTitleInput() {
    const titleInputContainer = document.createElement('p');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    titleLabel.for = 'title';
    titleLabel.textContent = 'title';
    titleInput.className = 'form-control';
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInputContainer.appendChild(titleLabel);
    titleInputContainer.appendChild(titleInput);

    return { titleInputContainer, titleInput }
}

function createProjectMenu() {
    const projectMenuContainer = document.createElement('p');
    const projectLabel = document.createElement('label');
    const projectMenu = document.createElement('select');
    const projectOption = document.createElement('option');
    projectLabel.innerText = 'select a project';
    projectMenu.className = 'form-select';
    projectMenu.name = 'project';
    projectOption.selected = true;
    projectOption.textContent = '';
    projectMenu.appendChild(projectOption)
    _projects__WEBPACK_IMPORTED_MODULE_1__.myProjects.forEach((e) => {
        e.createProjectOption(projectMenu);
    });
    projectMenuContainer.appendChild(projectLabel);
    projectMenuContainer.appendChild(projectMenu);

    return { projectMenuContainer, projectMenu }
}

function createDateInput() {
    const dateContainer = document.createElement('p');
    const dateLabel = document.createElement('label');
    const dateInput = document.createElement('input');
    dateLabel.innerText = 'date';
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateContainer.appendChild(dateLabel);
    dateContainer.appendChild(dateInput);

    return { dateContainer, dateInput }
}

function createNotesInput() {
    const notesContainer = document.createElement('p');
    const notesLabel = document.createElement('label');
    const notesInput = document.createElement('textarea');
    notesLabel.innerText = 'notes';
    notesInput.className = 'form-control';
    notesInput.name = 'notes';
    notesInput.cols = 30;
    notesInput.rows = 3;
    notesContainer.appendChild(notesLabel);
    notesContainer.appendChild(notesInput);

    return { notesContainer, notesInput }
}

function createChecklistForm() {
    const checklistContainer = document.createElement('div');
    checklistContainer.className = 'row row-cols-lg-3 row-cols-md-2 row-cols-sm-12';
    checklistContainer.addEventListener('click', (e) => {
        const deleteIcon = e.target.closest('svg');
        if (deleteIcon) {
            deleteIcon.parentElement.parentElement.remove();
        }
    });

    const checklistBtnContainer = document.createElement('p');
    const checklistBtn = document.createElement('button');
    checklistBtn.type = 'button';
    checklistBtn.className = 'btn btn-primary btn-sm checklist-btn';
    checklistBtn.innerText = 'add checklist';
    checklistBtnContainer.appendChild(checklistBtn);
    checklistBtn.addEventListener('click', () => {
        const { checklistInputContainer } = createChecklistInput();
        checklistContainer.appendChild(checklistInputContainer)
    });

    return { checklistContainer, checklistBtnContainer }
}

function createChecklistInput() {
    const checklistInputContainer = document.createElement('div');
    checklistInputContainer.className = 'mb-2'

    const checklistTitle = document.createElement('label');
    checklistTitle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg cancel-project-icon" viewBox="0 0 16 16">
        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
    </svg>`
    
    const checklistInput = document.createElement('input');
    checklistInput.className = 'form-group checklist-input'
    checklistInput.type = 'text';
    checklistInput.placeholder = 'checklist';

    checklistInputContainer.appendChild(checklistTitle);
    checklistInputContainer.appendChild(checklistInput);

    return { checklistInput, checklistInputContainer }
}

function submitChecklist() {
    const checklistInputs = document.querySelectorAll('.checklist-input');
    let checklist = [];

    checklistInputs.forEach((e,i) => {
        let item = (0,_index__WEBPACK_IMPORTED_MODULE_0__.newChecklistItem)(e.value,false,i)
        return checklist.push(item);
    });
    
    return checklist;
}
 

/***/ }),

/***/ "./src/inbox.js":
/*!**********************!*\
  !*** ./src/inbox.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayInbox": () => (/* binding */ displayInbox)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");



const inboxHeader = document.querySelector('header');

function displayInbox() {
    updateInboxHeader();
    appendTodos();
}

function updateInboxHeader() {
    inboxHeader.innerHTML = `
    <h1>
        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-inbox-fill inbox-icon" viewBox="0 0 16 16">
            <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374l3.7-4.625z"/>
        </svg>
        <span class="text-capitalize">inbox</span>
    </h1>
    <p class="m-0 text-muted text-capitalize">greetings!</p>`;
}

function appendTodos() {
    _todo__WEBPACK_IMPORTED_MODULE_0__.myTodos.forEach((e) => {
        e.createTodo();
    });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "submitTodo": () => (/* binding */ submitTodo),
/* harmony export */   "submitEdit": () => (/* binding */ submitEdit),
/* harmony export */   "newChecklistItem": () => (/* binding */ newChecklistItem),
/* harmony export */   "removeContent": () => (/* binding */ removeContent),
/* harmony export */   "storeTodos": () => (/* binding */ storeTodos)
/* harmony export */ });
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _images_todo_list_logo3_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/todo-list-logo3.png */ "./src/images/todo-list-logo3.png");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _expand__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expand */ "./src/expand.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./form */ "./src/form.js");
/* harmony import */ var _inbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./inbox */ "./src/inbox.js");
/* harmony import */ var _today__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./today */ "./src/today.js");
/* harmony import */ var _week__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./week */ "./src/week.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./projects */ "./src/projects.js");












const linkTabs = document.querySelectorAll('.link');
const todoContent = document.querySelector('.content');
const logo = document.querySelector('.logo');
logo.src = _images_todo_list_logo3_png__WEBPACK_IMPORTED_MODULE_2__.default;

(function activateEventListeners() {
    (0,_expand__WEBPACK_IMPORTED_MODULE_4__.expandTodo)();
    (0,_expand__WEBPACK_IMPORTED_MODULE_4__.expandSideBar)();
    (0,_projects__WEBPACK_IMPORTED_MODULE_9__.activateProjectTabListeners)();
})();

function newChecklistItem(title,isDone,id) {
    return new _todo__WEBPACK_IMPORTED_MODULE_3__.Checklist(title,isDone,id)
}

function submitTodo(title,project,date,notes,checklist,isDone) {
    const todo = new _todo__WEBPACK_IMPORTED_MODULE_3__.Todo(title,project,date,notes,checklist,isDone,_todo__WEBPACK_IMPORTED_MODULE_3__.Todo.idNum());
    todo.addToArray(_todo__WEBPACK_IMPORTED_MODULE_3__.myTodos);
    _todo__WEBPACK_IMPORTED_MODULE_3__.Todo.incrementIdCount();
    storeTodos();
    console.log(_todo__WEBPACK_IMPORTED_MODULE_3__.myTodos);
}

function submitEdit(title,project,date,note,checklist,index) {
    const existingTodo = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos[index]
    existingTodo.title = title;
    existingTodo.project = project;
    existingTodo.date = date;
    existingTodo.note = note;
    existingTodo.checklist = checklist;
    storeTodos();
    console.log(_todo__WEBPACK_IMPORTED_MODULE_3__.myTodos);
}

linkTabs.forEach((e) => {
    e.addEventListener('click', () => {
        removeContent();
        switch (e) {
            case linkTabs[0]:
                (0,_form__WEBPACK_IMPORTED_MODULE_5__.displayForm)();
                break;
            case linkTabs[1]:
                (0,_inbox__WEBPACK_IMPORTED_MODULE_6__.displayInbox)();
                break;
            case linkTabs[2]:
                (0,_today__WEBPACK_IMPORTED_MODULE_7__.displayPresentTodos)();
                break;
            case linkTabs[3]:
                (0,_week__WEBPACK_IMPORTED_MODULE_8__.displayWeekTodos)();
                break;
        }
    });
})

todoContent.addEventListener('click', (e) => {
    if (e.target.name === 'todoCheckBox' && e.target.checked === false) {
        const todoIndex = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos.findIndex(element => element.id === parseInt(e.target.parentNode.parentNode.dataset.index));
        _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos[todoIndex].isDone = false;
        storeTodos();
    } 
    else if (e.target.name === 'todoCheckBox' && e.target.checked === true) {
        const todoIndex = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos.findIndex(element => element.id === parseInt(e.target.parentNode.parentNode.dataset.index));
        _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos[todoIndex].isDone = true;
        storeTodos();
    }

    if (e.target.name === 'checklistCheckbox' && e.target.checked === false) {
        const checklistTodoIndex = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos.findIndex(element => element.id === parseInt(e.target.parentNode.parentNode.parentNode.parentNode.dataset.index));
        const checklistItemIndex = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos[checklistTodoIndex].checklist.findIndex(el => el.id === parseInt(e.target.parentNode.dataset.index))
        _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos[checklistTodoIndex].checklist[checklistItemIndex].isDone = false;
        storeTodos();
    } 
    else if (e.target.name === 'checklistCheckbox' && e.target.checked === true) {
        const checklistTodoIndex = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos.findIndex(element => element.id === parseInt(e.target.parentNode.parentNode.parentNode.parentNode.dataset.index));
        const checklistItemIndex = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos[checklistTodoIndex].checklist.findIndex(el => el.id === parseInt(e.target.parentNode.dataset.index));
        _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos[checklistTodoIndex].checklist[checklistItemIndex].isDone = true;
        storeTodos();
    }

    const deleteBtn = e.target.closest('.todo-delete');
    const editBtn = e.target.closest('.todo-edit');

    if (deleteBtn) {
        const index = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos.findIndex(element => element.id === parseInt(deleteBtn.parentNode.parentNode.parentNode.dataset.index));
        deleteBtn.parentElement.parentElement.parentElement.remove();
        _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos.splice(index,1);
        storeTodos();
        console.log('deleted todo');
    } 
    else if (editBtn) {
        const index = _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos.findIndex(element => element.id === parseInt(editBtn.parentNode.parentNode.parentNode.dataset.index));
        _todo__WEBPACK_IMPORTED_MODULE_3__.myTodos[index].editTodo();
        console.log('edited todo');
    }
});

function removeContent() {
    while (todoContent.firstChild) {
        todoContent.removeChild(todoContent.firstChild);
      }
}

// (function defaultTodos() {
//     let checklist = [
//         new Checklist('eat',false),
//         new Checklist('code',false),
//         new Checklist('sleep',false),
//     ]
//     myTodos.push(new Todo('learn to code','personal','2021-07-10','lorem ipsum',checklist,false,Todo.idNum()));
//     myTodos[Todo.idNum()].createTodo();
//     Todo.incrementIdCount();
// })();

function storeTodos() {
    localStorage.setItem(`myTodos`, JSON.stringify(_todo__WEBPACK_IMPORTED_MODULE_3__.myTodos));
}

function getData() {
    const storedTodos = localStorage.getItem('myTodos');
    const parsedTodos = JSON.parse(storedTodos);

    parsedTodos.forEach((e,i) => {
        const storedChecklist = []
        e.checklist.forEach((el,ind) => {
            const storedChecklistItem = new _todo__WEBPACK_IMPORTED_MODULE_3__.Checklist(el.title,el.isDone,ind);
            storedChecklist.push(storedChecklistItem);
        });

        const storedTodo = new _todo__WEBPACK_IMPORTED_MODULE_3__.Todo(e.title,e.project,e.date,e.note,storedChecklist,e.isDone,i);
        //we push locally stored todos back to the array because todo elements lose prototype when parsed
        storedTodo.addToArray(_todo__WEBPACK_IMPORTED_MODULE_3__.myTodos);
        storedTodo.createTodo();
        _todo__WEBPACK_IMPORTED_MODULE_3__.Todo.incrementIdCount();
    });
}

if(!localStorage.getItem('myTodos')) {
    storeTodos()
} else {
    getData();
}

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateProjectTabListeners": () => (/* binding */ activateProjectTabListeners),
/* harmony export */   "myProjects": () => (/* binding */ myProjects)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/todo.js");




const sideBar = document.querySelector('aside');
const projectHeader = document.querySelector('header');
const projectFormTab = document.querySelector('.side-projects-form-tab');
const projectTabs = document.querySelector('.side-projects');
let myProjects = [];

function activateProjectTabListeners() {
    projectFormTab.addEventListener('click', () => {
        if(sideBar.classList.contains('side-bar-expanded')) {
            createProjectForm();
        }
    });
    
    projectTabs.addEventListener('click', (e) => {
        let project = e.target.closest('.project');
        let lis = [...projectTabs.children];
        let index = lis.indexOf(project);
    
        if(e.target.classList.contains('cancel-project-icon')) {
            myProjects.splice(lis.indexOf(e.target.parentElement),1);
            e.target.parentElement.remove();
            console.log(myProjects);
            console.log('deleted project form');
        } else if (project) {
            (0,_index__WEBPACK_IMPORTED_MODULE_0__.removeContent)();
            updateProjectHeader(index);
            createDeleteBtn(index,project);
            displayProjectsTodos(myProjects[index]);
        }
    });
}

class Project {
    constructor(title,todos) {
        this.title = title;
        this.todos = todos;
    }

    createProject(container) {
        container.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-circle list-vector" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        </svg> `;
         
        const projectTitle = document.createElement('span');
        projectTitle.className = 'link-text';
        projectTitle.textContent = this.title;

        container.appendChild(projectTitle);
    }

    createProjectOption(selectMenu) {
        const option = document.createElement('option');
        option.textContent = this.title;
        selectMenu.appendChild(option);
    }
}

function createDeleteBtn(index,projectElement) {
    let deleteProjectBtn = document.createElement('button');
    deleteProjectBtn.className = 'btn btn-outline-danger';
    deleteProjectBtn.textContent = 'delete';
    projectHeader.appendChild(deleteProjectBtn)

    deleteProjectBtn.addEventListener('click', (e) => {
        if(e) {
            let indexes = []
            for (let todo of _todo__WEBPACK_IMPORTED_MODULE_1__.myTodos) {
                if (myProjects[index].title === todo.project) {
                    indexes.push(_todo__WEBPACK_IMPORTED_MODULE_1__.myTodos.indexOf(todo))
                }
            }
            for (let i of indexes.reverse()) {
                console.log(_todo__WEBPACK_IMPORTED_MODULE_1__.myTodos.splice(i,1))
            }            
            deleteProjectBtn.remove();
            projectElement.remove();
            myProjects.splice(index,1);
            (0,_index__WEBPACK_IMPORTED_MODULE_0__.removeContent)();
            storeProjects();
            (0,_index__WEBPACK_IMPORTED_MODULE_0__.storeTodos)();
            console.log('deleted project');
        }
    });
}
 
function createProjectForm() {
    //project is initialized and pushed immediately in order to adjust for multiple forms and place elements in the proper index of the array.
    const project = new Project(undefined,undefined);
    myProjects.push(project);

    const projectContainer = createProjectContainer();

    const titleInput = document.createElement('input');
    titleInput.className = 'project-form';
    titleInput.maxLength = 19;
    titleInput.type = 'text';
    titleInput.placeholder = 'name'
    titleInput.name = 'title';

    projectContainer.li.appendChild(titleInput);
    projectTabs.appendChild(projectContainer.li);

    titleInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            project.title = titleInput.value;
            project.createProject(projectContainer.li);
            projectContainer.li.className = 'project';
            storeProjects();
            console.log('submitted');
            console.log(myProjects);
        }
    });
}

function updateProjectHeader(i) {
    projectHeader.innerHTML = `
    <h1>
        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-box project-icon" viewBox="0 0 16 16">
            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
        </svg>
        <span class="text-capitalize">${myProjects[i].title}</span>
    </h1>`;
}

function createProjectContainer() {
    const li = document.createElement('li');
    li.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle cancel-project-icon" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>`;

    return { li };
}
// (function addDefaultProjects() {
//     let personalTodos = [];
//     let workTodos = [];

//     let personalProject = new Project('personal',personalTodos);
//     let workProject = new Project('work',workTodos);

//     personalProject.createProjectElements();
//     workProject.createProjectElements();

//     myProjects.push(personalProject);
//     myProjects.push(workProject);
//     storeProjects();
//     console.log(myProjects);
// })();

function displayProjectsTodos(project) {
    for(let todo of _todo__WEBPACK_IMPORTED_MODULE_1__.myTodos) {
        if (project.title === todo.project) {
            todo.createTodo();
        }
    }
}

function storeProjects() {
    localStorage.setItem('myProjects', JSON.stringify(myProjects));
}

function getProjectData() {
    const storedProjects = localStorage.getItem('myProjects');
    const parsedProjects = JSON.parse(storedProjects);

    for (let project of parsedProjects) {
        if(project.title !== undefined) {
            const storedProject = new Project(project.title,project.todos);
            const projectContainer = createProjectContainer();
            projectContainer.li.className = 'project';
            //we push locally stored projects back to the array because project elements lose prototype when parsed
            storedProject.createProject(projectContainer.li);
            projectTabs.appendChild(projectContainer.li);
            myProjects.push(storedProject);
        }
    }    
}

if(!localStorage.getItem('myProjects')) {
    storeProjects()
} else {
    getProjectData();
}


/***/ }),

/***/ "./src/today.js":
/*!**********************!*\
  !*** ./src/today.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayPresentTodos": () => (/* binding */ displayPresentTodos)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");



const todayHeader = document.querySelector('header');

function displayPresentTodos() {
    updateTodayHeader();
    appendTodaysTodos();
}

function updateTodayHeader() {
    todayHeader.innerHTML = `
    <h1>
    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-calendar-date calender-icon" viewBox="0 0 16 16">
        <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
    </svg>
    <span class="text-capitalize">Today</span>
    </h1>`;
}

function appendTodaysTodos() {
    _todo__WEBPACK_IMPORTED_MODULE_0__.myTodos.forEach((e) => {
        if(e.isTodoToday()) {
            e.createTodo();
        }
    });
}


/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Todo": () => (/* binding */ Todo),
/* harmony export */   "Checklist": () => (/* binding */ Checklist),
/* harmony export */   "myTodos": () => (/* binding */ myTodos)
/* harmony export */ });
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/getDay/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isThisWeek/index.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./src/form.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");





const header = document.querySelector('header');
const todoContent = document.querySelector('.content');
let myTodos = [];

class Todo {
    static idCount = 0;

    static incrementIdCount() {
        this.idCount += 1;
    }

    static idNum() {
        return this.idCount;
    }

    constructor(title,project,date,note,checklist,isDone,id) {
        this.title = title
        this.project = project
        this.date = date
        this.note = note
        this.checklist = checklist
        this.isDone = isDone
        this.id = id
    }

    addToArray(arr) {
        arr.push(this);
    }

    createTodoContainer() {
        const todoContainer = document.createElement('div');
        todoContainer.className = 'todo-container';
        todoContainer.setAttribute('data-index', this.id);

        return { todoContainer }
    }

    createTodoCheckbox() {
        const todoCheckbox = document.createElement('input');
        todoCheckbox.type = 'checkbox';
        todoCheckbox.name = 'todoCheckBox';
        todoCheckbox.checked = this.isDone;

        return { todoCheckbox }
    }

    createTodoHeader() {
        const todoHeaderContainer = document.createElement('div');
        todoHeaderContainer.className = 'todo-header-container';

        const todoTitle = document.createElement('p');
        todoTitle.className = 'todo-title'
        todoTitle.textContent = this.title;

        const todoProject = document.createElement('p');
        todoProject.className = 'todo-project text-muted';
        todoProject.textContent = this.project;

        todoHeaderContainer.appendChild(todoTitle);
        todoHeaderContainer.appendChild(todoProject);

        return { todoHeaderContainer } 
    }

    createTodoDate() {
        const date = document.createElement('time');
        date.className = 'todo-date ms-auto'
        date.dateTime = this.date;
        date.textContent = this.date;

        return { date }
    }

    createTodo() {
        const { todoCheckbox } = this.createTodoCheckbox();
        const { todoHeaderContainer } = this.createTodoHeader();
        const { date } = this.createTodoDate();

        const todo = document.createElement('div');
        todo.className = 'd-flex';
        todo.appendChild(todoCheckbox);
        todo.appendChild(todoHeaderContainer);
        todo.appendChild(date);

        const { todoContainer } = this.createTodoContainer();
        todoContainer.appendChild(todo);
        todoContainer.appendChild(this.createExpandedTodo())
        todoContent.appendChild(todoContainer);
    }

    createTodoNotes() {
        const notes = document.createElement('p');
        notes.className = 'todo-notes';
        notes.textContent = this.note;

        return { notes }
    }
    
    createTodoChecklist() {
        const checklistContainer = document.createElement('div');
        this.checklist.forEach((e) => {
            e.createChecklistItem(checklistContainer);
        });

        return { checklistContainer }
    }

    createTodoIcons() {
        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'todo-icons-container d-flex justify-content-end'
        iconsContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-pencil-square todo-edit" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-trash-fill todo-delete" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg> `;

        return { iconsContainer }
    }

    createExpandedTodo() {
        const expandedTodoContainer = document.createElement('div');
        expandedTodoContainer.className = 'todo-container-expanded hide-element';

        const { notes } = this.createTodoNotes();
        const { checklistContainer } = this.createTodoChecklist();
        const { iconsContainer } = this.createTodoIcons();

        expandedTodoContainer.appendChild(notes);
        expandedTodoContainer.appendChild(checklistContainer);
        expandedTodoContainer.appendChild(iconsContainer);

        return expandedTodoContainer;
    }

    isTodoToday() {
        const today = new Date();
        //this code converts the dash mark (-) into forward slash (/) to fix the date's odd format
        const date = new Date(this.date.replace(/-/g, '\/'));
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    }

    isTodoThisWeek() {
        const today = new Date();
        const date = new Date(this.date.replace(/-/g, '\/'));
        const dayIndex = (0,date_fns__WEBPACK_IMPORTED_MODULE_2__.default)(today);
        return (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.default)(date, { weekStartsOn : dayIndex });
    }

    editTodo() {
        (0,_index__WEBPACK_IMPORTED_MODULE_1__.removeContent)();
        header.innerHTML = `
        <h1>
            <svg xmlns="http://www.w3.org/2000/svg" height=1em width=1em class="bi bi-pencil-square todo-edit" viewBox="0 0 16 16" fill="rgba(252, 195, 90, 0.856)">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            <span class="text-capitalize">edit todo</span>
        </h1>`;
        let form = (0,_form__WEBPACK_IMPORTED_MODULE_0__.createFormElements)(true,this.id);
        form.titleInput.value = this.title;
        Array.from(form.projectMenu.children).forEach((option) => {
            option.value === this.project ? option.selected = true : undefined;
        });
        form.dateInput.value = this.date;
        form.notesInput.value = this.note;
        this.checklist.forEach((e) => {
            // let input = createChecklistInput(form.checklistContainer);
            const { checklistInputContainer, checklistInput } = (0,_form__WEBPACK_IMPORTED_MODULE_0__.createChecklistInput)();
            form.checklistContainer.appendChild(checklistInputContainer)
            checklistInput.value = e.title;
        });
    }
}

class Checklist  {
    constructor(title,isDone,id) {
        this.title = title;
        this.isDone = isDone;
        this.id = id;
    }

    createChecklistItem(container) {
        const checklistItem = document.createElement('div');
        checklistItem.className = 'checklist-item d-flex'
        checklistItem.setAttribute('data-index', this.id);

        const checklistInput = document.createElement('input');
        checklistInput.type = 'checkbox';
        checklistInput.name = 'checklistCheckbox'
        checklistInput.checked = this.isDone;

        const checklistTitle = document.createElement('p');
        checklistTitle.className = 'checklist-title';
        checklistTitle.textContent = this.title;

        checklistItem.appendChild(checklistInput);
        checklistItem.appendChild(checklistTitle);
        container.appendChild(checklistItem);
    }
}


/***/ }),

/***/ "./src/week.js":
/*!*********************!*\
  !*** ./src/week.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayWeekTodos": () => (/* binding */ displayWeekTodos)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");

 

const weekHeader = document.querySelector('header');

function displayWeekTodos() {
    updateWeekHeader();
    appendWeeklyTodos();
}

function updateWeekHeader() {
    weekHeader.innerHTML = `
    <h1>
    <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-calendar-week calender-icon" viewBox="0 0 16 16">
        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
    </svg>
    <span class="text-capitalize">This Week</span>
    </h1>`;
}

function appendWeeklyTodos() {
    _todo__WEBPACK_IMPORTED_MODULE_0__.myTodos.forEach((e) => {
        if(e.isTodoThisWeek()) {
            e.createTodo();
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;