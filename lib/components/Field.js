"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Field;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bemCn = _interopRequireDefault(require("bem-cn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import InputError from './InputError';
var block = (0, _bemCn.default)('field');

function Field(_ref) {
  var className = _ref.className,
      active = _ref.active,
      label = _ref.label,
      error = _ref.error,
      rightActions = _ref.rightActions,
      children = _ref.children;
  var mods = {
    active: active,
    error: Boolean(error)
  };
  return _react.default.createElement("div", {
    className: block(mods).mix(className).toString()
  }, _react.default.createElement("div", {
    className: block('label').toString()
  }, label && _react.default.createElement("label", {
    className: block('label').toString()
  }, label), rightActions && _react.default.createElement("div", {
    className: block('right-actions').toString()
  }, rightActions)), children, error && _react.default.createElement("p", {
    className: block('error').toString()
  }, error) //<InputError error={ error } />
  );
}

Field.propTypes = {
  className: _propTypes.default.string,
  active: _propTypes.default.bool,
  label: _propTypes.default.string,
  error: _propTypes.default.object,
  rightActions: _propTypes.default.node,
  children: _propTypes.default.node
};
Field.defaultProps = {
  active: false
};