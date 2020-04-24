"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "EntityData", {
  enumerable: true,
  get: function get() {
    return _EntityData.default;
  }
});
Object.defineProperty(exports, "EntityDataContext", {
  enumerable: true,
  get: function get() {
    return _EntityData.EntityDataContext;
  }
});
Object.defineProperty(exports, "withEntityData", {
  enumerable: true,
  get: function get() {
    return _EntityData.withEntityData;
  }
});
Object.defineProperty(exports, "Field", {
  enumerable: true,
  get: function get() {
    return _Field.default;
  }
});
Object.defineProperty(exports, "StringField", {
  enumerable: true,
  get: function get() {
    return _StringField.default;
  }
});
Object.defineProperty(exports, "EntityStringField", {
  enumerable: true,
  get: function get() {
    return _StringField.EntityStringField;
  }
});
Object.defineProperty(exports, "StringInput", {
  enumerable: true,
  get: function get() {
    return _StringInput.default;
  }
});
Object.defineProperty(exports, "EntityStringInput", {
  enumerable: true,
  get: function get() {
    return _StringInput.EntityStringInput;
  }
});

var _EntityData = _interopRequireWildcard(require("./EntityData"));

var _Field = _interopRequireDefault(require("./Field"));

var _StringField = _interopRequireWildcard(require("./string/StringField"));

var _StringInput = _interopRequireWildcard(require("./string/StringInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }