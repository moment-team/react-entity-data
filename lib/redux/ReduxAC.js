"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get2 = _interopRequireDefault(require("lodash/fp/get"));

var _partial2 = _interopRequireDefault(require("lodash/fp/partial"));

var _entityState = require("entity-state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Factory functions for redux action creators
 */
var ReduxAC = {};
/**
 * Initialize entity state
 * @param {string} type Action type constant
 * @return {function} Action creator
 */

ReduxAC.initialize = function (type) {
  return function () {
    return {
      type: type
    };
  };
};
/**
 * Load data into entity state
 * @param {string} type Action type constant
 * @return {function} Action creator
 */


ReduxAC.load = function (type) {
  return function (data) {
    return {
      type: type,
      data: data
    };
  };
};
/**
 * Set new value in entity state data
 * @param {string} type Action type constant
 * @return {function} Action creator
 */


ReduxAC.set = function (type) {
  return function (path, value) {
    return {
      type: type,
      path: path,
      value: value
    };
  };
};
/**
 * Stage a data change in pathChanges (while leaving the original data unchanged)
 * @param {string} type Action type constant
 * @return {function} Action creator
 */


ReduxAC.stage = function (type) {
  return function (path, value) {
    return {
      type: type,
      path: path,
      value: value
    };
  };
};
/**
 * Set an error (for the whole data set) into the entity state
 * @param {string} type Action type constant
 * @return {function} Action creator
 */


ReduxAC.error = function (type) {
  return function (error) {
    return {
      type: type,
      error: error
    };
  };
};
/**
 * Set a path-specific error into the entity state
 * @param {string} type Action type constant
 * @return {function} Action creator
 */


ReduxAC.pathError = function (type) {
  return function (path, error) {
    return {
      type: type,
      path: path,
      error: error
    };
  };
};
/**
 * Clear the entity state
 * @param {string} type Action type constant
 * @return {function} Action creator
 */


ReduxAC.clear = function (type) {
  return function () {
    return {
      type: type
    };
  };
};
/**
 * Clean the entity state (removing pathChange, errors etc but keeping the data)
 * @param {string} type Action type constant
 * @return {function} Action creator
 */


ReduxAC.clean = function (type) {
  return function () {
    return {
      type: type
    };
  };
}; // Main request method

/**
 * Run http-request for an entity state, dispatching actions for the state of the request
 * @param {string} type Action type constant
 * @param {function} requestFn Async function making the actual http request
 * @param {object} [options] Options
 * @param {string} [option.loading] True to flag the state as loading during request
 * @param {string} [option.updating] True to flag the state as updating during request
 * @param {string} [option.path] Path to what part of the dataset the request is for. Undefined for
                                 the whole set
 * @param {bool} [options.loadResponse] Load response data when request is complete
 * @param {bool} [options.clean] Clean the state when request completes
 * @param {bool} [options.clear] Clear the whole state when request completes
 * @param {number} [options.delayCleanInitial] Time (ms or true for default) before cleaning initial values from state
 * @param {string} [options.responsePath] Path into the response that contains the data for the state (if not at root)
 * @return {function} Action creator (thunk)
 */


ReduxAC.httpRequest = function (type, requestFn) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var typeInitiate = Array.isArray(type) && type[0] || type;
  var typeComplete = Array.isArray(type) && type[1] || type;
  var typeError = Array.isArray(type) && type[2] || type;
  var typeClean = Array.isArray(type) && type[3] || type;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(dispatch) {
          var _ref2, statusCode, response;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  dispatch({
                    type: typeInitiate,
                    status: 'initiate',
                    loading: options.loading,
                    updating: options.updating,
                    path: options.path
                  });
                  _context.prev = 1;
                  _context.next = 4;
                  return requestFn.apply(void 0, args);

                case 4:
                  _ref2 = _context.sent;
                  statusCode = _ref2.statusCode;
                  response = _ref2.response;
                  // await new Promise(resolve => setTimeout(resolve, 3000)); // Testing delayed response
                  dispatch({
                    type: typeComplete,
                    status: 'complete',
                    loadResponse: options.loadResponse,
                    loading: false,
                    updating: false,
                    path: options.path,
                    load: options.load,
                    clean: options.clean,
                    clear: options.clear,
                    receivedAt: new Date().toISOString(),
                    delayCleanInitial: Boolean(options.delayCleanInitial),
                    data: options.responsePath ? (0, _get2.default)(options.responsePath, response) : response
                  });

                  if (options.clean && options.delayCleanInitial) {
                    setTimeout(function () {
                      dispatch({
                        type: typeClean,
                        status: 'clean',
                        loading: false,
                        updating: false,
                        path: options.path,
                        clean: true
                      });
                    }, typeof options.delayCleanInitial !== 'number' ? 3000 : options.delayCleanInitial);
                  }

                  return _context.abrupt("return", {
                    statusCode: statusCode,
                    response: response
                  });

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](1);
                  dispatch({
                    type: typeError,
                    status: 'error',
                    loading: false,
                    updating: false,
                    path: options.path,
                    statusCode: _context.t0.statusCode,
                    error: {
                      message: _context.t0.message,
                      details: _context.t0.details,
                      stack: _context.t0.stack,
                      connectionError: _context.t0.connectionError
                    }
                  });

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 12]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()
    );
  };
};
/**
 * Dispatch action from given action creator using the data from given path in the state
 * @param {string|array} statePath String for path to entity state, data from state will be sent to action.
                         Alternatively, array of path to entity state, and path inside data to target data.
 * @param {function} actionCreator Action creator that will be used to create the action to dispatch with target data
 * @return {function} Action creator
 */


ReduxAC.withData = function (statePath, actionCreator) {
  return function () {
    return function (dispatch, getState) {
      var data = Array.isArray(statePath) ? (0, _get2.default)("".concat(statePath[0], ".data.").concat(statePath[1]), getState()) : (0, _get2.default)("".concat(statePath, ".data"), getState());
      return dispatch(actionCreator(data));
    };
  };
};
/**
 * Dispatch action from given action creator using the data (including local changes) from given path in the state
 * @param {string|array} statePath String for path to entity state, data from state will be sent to action.
                         Alternatively, array of path to entity state, and path inside data to target data.
 * @param {function} actionCreator Action creator that will be used to create the action to dispatch with target data
 * @return {function} Action creator
 */


ReduxAC.withChangedData = function (statePath, actionCreator) {
  return function () {
    return function (dispatch, getState) {
      var entityState = Array.isArray(statePath) ? (0, _get2.default)(statePath[0], getState()) : (0, _get2.default)(statePath, getState());
      return dispatch(actionCreator(_entityState.EntityState.dataWithChanges(entityState)));
    };
  };
};
/**
 * Toggle mode value of entity state
 * @param {string} type Action type constant
 * @param {string} value Value to toggle
 * @return {function} Action creator
 */


ReduxAC.toggleMode = function (type, value) {
  return function (path) {
    return {
      type: type,
      path: path,
      value: value
    };
  };
};
/**
 * Compose http request functions with the given options merged with the argument options
 * @param {object} [options] Options to apply to request calls
 * @return {object} Function literal
 */


ReduxAC.withOptions = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    request: function request() {
      var callOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return _entityState.Http.request(_objectSpread({}, options, {}, callOptions));
    },
    get: function get(path, query) {
      var callOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _entityState.Http.get(path, query, _objectSpread({}, options, {}, callOptions));
    },
    post: function post(path, body) {
      var callOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _entityState.Http.post(path, body, _objectSpread({}, options, {}, callOptions));
    },
    put: function put(path, body) {
      var callOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _entityState.Http.put(path, body, _objectSpread({}, options, {}, callOptions));
    },
    patch: function patch(path, body) {
      var callOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _entityState.Http.patch(path, body, _objectSpread({}, options, {}, callOptions));
    },
    delete: function _delete(path, query) {
      var callOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _entityState.Http.delete(path, query, _objectSpread({}, options, {}, callOptions));
    }
  };
};
/**
 * Generate action creators for the given types
 * @param {object} types Types (i.e { load: LOAD_USER })
 * @return {object} Function lietarl
 */


ReduxAC.all = function (types) {
  return {
    initialize: types.initialize ? ReduxAC.initialize(types.initialize) : undefined,
    load: types.load ? ReduxAC.load(types.load) : undefined,
    set: types.set ? ReduxAC.set(types.set) : undefined,
    stage: types.stage ? ReduxAC.stage(types.stage) : undefined,
    error: types.error ? ReduxAC.error(types.error) : undefined,
    pathError: types.pathError ? ReduxAC.pathError(types.pathError) : undefined,
    clear: types.clear ? ReduxAC.clear(types.clear) : undefined,
    httpRequest: types.httpRequest ? (0, _partial2.default)(ReduxAC.httpRequest, [types.httpRequest]) : undefined
  };
};

var _default = ReduxAC;
exports.default = _default;