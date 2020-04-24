"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StringField;
exports.EntityStringField = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _EntityData = require("../EntityData");

var _Field = _interopRequireDefault(require("../Field"));

var _StringInput = _interopRequireDefault(require("./StringInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function StringField(_ref) {
  var label = _ref.label,
      error = _ref.error,
      props = _objectWithoutProperties(_ref, ["label", "error"]);

  return _react.default.createElement(_Field.default, {
    label: label,
    error: error
  }, _react.default.createElement(_StringInput.default, props));
}

StringField.propTypes = {
  label: _propTypes.default.string,
  error: _propTypes.default.object
};
var EntityStringField = (0, _EntityData.withEntityData)(StringField);
exports.EntityStringField = EntityStringField;