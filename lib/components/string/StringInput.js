"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityStringInput = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bemCn = _interopRequireDefault(require("bem-cn"));

var _EntityData = require("../EntityData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var block = (0, _bemCn.default)('string-input');

var StringInput =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(StringInput, _React$PureComponent);

  function StringInput(props) {
    var _this;

    _classCallCheck(this, StringInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StringInput).call(this, props));
    _this._rnd = Math.round(Math.random() * 100000);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.handleKeyUp = _this.handleKeyUp.bind(_assertThisInitialized(_this));
    _this.handleFocus = _this.handleFocus.bind(_assertThisInitialized(_this));
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(StringInput, [{
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      if (e.keyCode === 13) {
        this.props.onPressEnter && this.props.onPressEnter();
      }

      this.props.onKeyDown && this.props.onKeyDown(e);
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(e) {
      this.props.onKeyUp && this.props.onKeyUp(e);
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var _this$props = this.props,
          allowEmpty = _this$props.allowEmpty,
          onChange = _this$props.onChange;
      var inputValue = e.target.value;
      var value = inputValue && inputValue.length > 0 ? inputValue : allowEmpty ? '' : undefined;
      onChange && onChange(value);
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      this.props.onFocus && this.props.onFocus();
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      this.props.onBlur && this.props.onBlur();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          className = _this$props2.className,
          multiline = _this$props2.multiline,
          placeholder = _this$props2.placeholder,
          value = _this$props2.value,
          autoFocus = _this$props2.autoFocus,
          maxLength = _this$props2.maxLength,
          onChange = _this$props2.onChange;
      var elementValue = onChange && value !== undefined ? value.toString() || '' : undefined;
      var elementDefaultValue = !onChange && value !== undefined ? value.toString() || '' : undefined;

      if (multiline) {
        return _react.default.createElement("textarea", {
          rows: "1",
          className: block.mix(className).toString(),
          value: elementValue,
          defaultValue: elementDefaultValue,
          placeholder: placeholder,
          maxLength: maxLength,
          onChange: this.handleChange,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onKeyDown: this.handleKeyDown,
          onKeyUp: this.handleKeyUp,
          ref: function ref(input) {
            return _this2._textarea = input;
          },
          autoFocus: autoFocus
        });
      }

      return _react.default.createElement("input", {
        className: block.mix(className).toString(),
        type: "text",
        value: elementValue,
        defaultValue: elementDefaultValue,
        placeholder: placeholder //min={ min }
        //max={ max }
        ,
        maxLength: maxLength,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onKeyUp: this.handleKeyUp,
        onKeyDown: this.handleKeyDown,
        autoFocus: autoFocus
      });
    }
  }]);

  return StringInput;
}(_react.default.PureComponent);

exports.default = StringInput;
StringInput.propTypes = {
  className: _propTypes.default.string,
  //type: PropTypes.oneOf(['text', 'number', 'email', 'url']),
  multiline: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  //min: PropTypes.number,
  //max: PropTypes.number,
  allowEmpty: _propTypes.default.bool,
  autoFocus: _propTypes.default.bool,
  minLength: _propTypes.default.number,
  maxLength: _propTypes.default.number,
  // Max value characters
  onChange: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onPressEnter: _propTypes.default.func,
  changed: _propTypes.default.bool,
  saving: _propTypes.default.bool,
  saved: _propTypes.default.bool
};
StringInput.defaultProps = {
  value: '',
  type: 'text',
  allowEmpty: false,
  maxHeight: 400,
  autoFocus: false,
  changed: false,
  saving: false,
  saved: false
};
var EntityStringInput = (0, _EntityData.withEntityData)(StringInput);
exports.EntityStringInput = EntityStringInput;