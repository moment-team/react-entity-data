"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get2 = _interopRequireDefault(require("lodash/fp/get"));

var _set2 = _interopRequireDefault(require("lodash/fp/set"));

var _defaultTo2 = _interopRequireDefault(require("lodash/fp/defaultTo"));

var _entityState = require("entity-state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Factory functions for redux reducers
 */
var ReduxReducers = {}; // ReduxReducers.serial = (state, action, handlers) =>
//   Array.isArray(handlers) ?
//     handlers.reduce((state, handler) => handler(state, action), state)
//     :
//     handlers(state, action);

ReduxReducers.serial = function (handlers) {
  return function (state, action) {
    return Array.isArray(handlers) ? handlers.reduce(function (state, handler) {
      return handler(state, action);
    }, state) : handlers(state, action);
  };
};
/**
 * Combine reducers for different entity data handling purposes to one reducer for
 * the whole data set
 * @param {mixed} initialState Initial state
 * @param {object} handlers Handlers with key being action types, and value being a single reducer or array of reducers
 * @return {function} Reducer for multiple handlers
 */


ReduxReducers.createReducer = function (initialState, handlers) {
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    // if (handlers.hasOwnProperty(action.type)) {
    if (handlers[action.type]) {
      return ReduxReducers.serial(handlers[action.type])(state, action);
    } else {
      // No handler for given action type
      return state;
    }
  };
};

ReduxReducers.getEntityState = function (state) {
  var statePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  return (statePath ? (0, _get2.default)(statePath, state) : state) || {};
};

ReduxReducers.setEntityState = function (entityState, state) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return statePath ? (0, _set2.default)(statePath, entityState, state) : entityState;
};
/**
 * Generator function to make a reducer that provide the given reduce state from a sub path of
 * the original state as if it was the base state for the reducer
 * @param {string} path Sub path of outer state
 * @param {function} reducer Reducer that should receive the inner state content
 * @return {function} New reducer that take the outer state
 */


ReduxReducers.reducePath = function (path, reducer) {
  return function (state, action) {
    return (0, _set2.default)(path, reducer((0, _get2.default)(path, state), action), state);
  };
};
/**
 * Initialize entity state
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @return {object} New state
 */


ReduxReducers.initialize = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _entityState.EntityState.initialize(state, statePath);
};
/**
 * Load data into entity state
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @return {object} New state
 */


ReduxReducers.load = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _entityState.EntityState.load(action.data, state, statePath);
};
/**
 * Set new value in entity state data
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @return {object} New state
 */


ReduxReducers.set = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _entityState.EntityState.set(action.path, action.value, state, statePath);
};
/**
 * Stage a data change in pathChanges (while leaving the original data unchanged)
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @return {object} New state
 */


ReduxReducers.stage = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _entityState.EntityState.stage(action.path, action.value, state, statePath);
};
/**
 * Set an error (for the whole data set) into the entity state
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @return {object} New state
 */


ReduxReducers.error = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _entityState.EntityState.error({
    message: (0, _get2.default)('error.message', action) || 'Unknown error'
  }, state, statePath);
};
/**
 * Set a path-specific error into the entity state
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @return {object} New state
 */


ReduxReducers.pathError = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _entityState.EntityState.pathError(action.path, {
    message: (0, _get2.default)('error.message', action) || 'Unknown error'
  }, state, statePath);
};
/**
 * Clear the entity state
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @return {object} New state
 */


ReduxReducers.clear = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _entityState.EntityState.clear(state, statePath) || null;
};
/**
 * Clean the entity state
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @return {object} New state
 */


ReduxReducers.clean = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _entityState.EntityState.clean(state, statePath);
};
/**
 * Run http-request for an entity state, dispatching actions for the state of the request
 * @param {object} state Application state
 * @param {object} action Action
 * @param {string} [statePath] Path in the state where the target entity state is located
 * @param {string} [responsePath] Path into the response structure where the data to put into the state is located
 * @return {object} New state
 */


ReduxReducers.httpRequest = function (state, action) {
  var statePath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var existingEntityState = ReduxReducers.getEntityState(state, statePath);

  if (action.clear) {
    // return EntityState.clear();
    return ReduxReducers.setEntityState(null, state, statePath);
  }

  var entityState = Object.assign(_objectSpread({}, existingEntityState, {
    error: (0, _defaultTo2.default)(undefined, action.error)
  }), // Loading / updating state
  action.path ? {
    pathLoading: (0, _set2.default)(action.path, action.loading ? true : undefined, existingEntityState.pathLoading || {}),
    pathUpdating: (0, _set2.default)(action.path, action.updating ? true : undefined, existingEntityState.pathUpdating || {})
  } : {
    loading: (0, _defaultTo2.default)(false, action.loading),
    updating: (0, _defaultTo2.default)(false, action.updating)
  }, // Load data into state
  action.loadResponse && (action.path ? {
    data: (0, _set2.default)(action.path, action.data, existingEntityState.data)
  } : {
    data: action.data,
    loadedAt: action.receivedAt || new Date().toISOString()
  }), action.clean && {
    pathChange: {},
    pathInitial: action.delayCleanInitial ? existingEntityState.pathInitial : {}
  });
  return ReduxReducers.setEntityState(entityState, state, statePath);
};

ReduxReducers.validate = function (state, action, statePath) {
  var withError = action.error ? _entityState.EntityState.error(action.error, state, statePath) : state;

  if (!action.pathError) {
    return withError;
  }

  var ret = Object.keys(action.pathError).reduce(function (state, path) {
    return _entityState.EntityState.pathError(path, action.pathError[path], state, statePath);
  }, withError);
  return ret;
};
/**
 * Toggle mode value of entity state
 * @param {object} state Application state
 * @param {object} action Action
 * @return {object} New state
 */


ReduxReducers.toggleMode = function (state, action) {
  if (action.path) {
    // Path based mode values
    var existing = state.pathMode || {};

    var pathMode = _objectSpread({}, existing, _defineProperty({}, action.path, existing[action.path] === action.value ? undefined : action.value));

    return (0, _set2.default)('pathMode', pathMode, state);
  } else {
    // Whole state mode
    var mode = state.mode === action.value ? undefined : action.value;
    return (0, _set2.default)('mode', mode, state);
  }
};
/**
 * Clean paths of a given prefix of the entity state
 * @param {object} state Application state
 * @param {object} action Action
 * @return {object} New state
 */


ReduxReducers.pathClean = function (state, action) {
  return _entityState.EntityState.cleanPath(action.path || '', state);
};
/**
 * Generate a set of reducers for the given type constants, to a given path in the state
 * @param {string} statePath Path in the state where the entity state is located (used for all the created reducers)
 * @param {object} types Action types to cover. I.e { load: LOAD_USER }
 * @param {object} initialState The initial state for the target state path
 * @return {function} Reducer function
 */


ReduxReducers.generateAt = function (statePath, types) {
  var initialState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _entityState.EntityState.initialize();
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    if (!action.type) {
      return state;
    }

    switch (action.type) {
      case types.initialize:
        return ReduxReducers.initialize(state, action, statePath);

      case types.load:
        return ReduxReducers.load(state, action, statePath);

      case types.set:
        return ReduxReducers.set(state, action, statePath);

      case types.stage:
        return ReduxReducers.stage(state, action, statePath);

      case types.error:
        return ReduxReducers.error(state, action, statePath);

      case types.pathError:
        return ReduxReducers.pathError(state, action, statePath);

      case types.clear:
        return ReduxReducers.clear(state, action, statePath);

      case types.clean:
        return ReduxReducers.clean(state, action, statePath);

      case types.pathClean:
        return ReduxReducers.pathClean(state, action);

      case types.toggleMode:
        return ReduxReducers.toggleMode(state, action);

      case types.validate:
        return ReduxReducers.validate(state, action, statePath);

      case types.httpRequest:
        return ReduxReducers.httpRequest(state, action, statePath);

      default:
        return state;
    }
  };
};
/**
 * Generate a set of reducers for the given type constants
 * @param {object} types Action types to cover. I.e { load: LOAD_USER }
 * @param {object} initialState The initial state for the target state path
 * @return {function} Reducer function
 */


ReduxReducers.generate = function (types, initialState) {
  return ReduxReducers.generateAt(undefined, types, initialState);
};

var _default = ReduxReducers;
exports.default = _default;