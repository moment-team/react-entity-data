"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import _get from 'lodash/fp/get';
// import _partial from 'lodash/fp/partial';
// import { EntityState, Http } from 'entity-state';

/**
 * Redux action creaators for entity data operations
 */
var ReduxActions = {};

ReduxActions.pathClean = function (type, path) {
  if (typeof type !== 'string' || typeof path !== 'string') {
    throw new Error('Invalid arguments for pathClean.');
  }

  return {
    type: type,
    path: path
  };
};

ReduxActions.toggleMode = function (type, path, value) {
  return {
    type: type,
    path: path,
    value: value
  };
};

var _default = ReduxActions;
exports.default = _default;