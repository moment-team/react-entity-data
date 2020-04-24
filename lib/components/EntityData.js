"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withEntityData = withEntityData;
exports.default = exports.EntityDataContext = void 0;

var _get2 = _interopRequireDefault(require("lodash/fp/get"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _entityState = require("entity-state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EntityDataContext = _react.default.createContext();

exports.EntityDataContext = EntityDataContext;

var getFrom = function getFrom(path, source) {
  return Array.isArray(path) ? path.reduce(function (ret, path) {
    return _objectSpread({}, ret, _defineProperty({}, path, (0, _get2.default)(path, source)));
  }, {}) : (0, _get2.default)(path, source);
};
/**
 * Connect a component with EntityData
 * @param {object} Component React component
 * @return {function} Render component
 */


function withEntityData(Component) {
  /*
   * Higher-order component for a component that is using entity data
   */
  var EntityDataComponent =
  /*#__PURE__*/
  function (_React$PureComponent) {
    _inherits(EntityDataComponent, _React$PureComponent);

    function EntityDataComponent() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, EntityDataComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EntityDataComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "handleChange", function (value) {
        _this.props.onChange && _this.props.onChange(value);
        _this.context.onChange && _this.context.onChange(_this.props.path, value, _this.context.data);
      });

      _defineProperty(_assertThisInitialized(_this), "handleError", function (error) {
        _this.props.onError && _this.props.onError(error);
        _this.context.onError && _this.context.onError(_this.props.path, error, _this.context.data);
      });

      return _this;
    }

    _createClass(EntityDataComponent, [{
      key: "render",
      value: function render() {
        if (!this.context) {
          // Not inside any EntityData context. Render with what props is relevant.
          return _react.default.createElement(Component, this.props);
        }

        var path = this.props.path;
        var _this$context = this.context,
            loadedAt = _this$context.loadedAt,
            loading = _this$context.loading,
            updating = _this$context.updating,
            pathChange = _this$context.pathChange,
            pathInitial = _this$context.pathInitial,
            pathLoading = _this$context.pathLoading,
            error = _this$context.error,
            pathError = _this$context.pathError;
        var data = this.props.data || this.context.data; // const value = this.props.value || (data && path) ? _get(path, data) : data;

        var value = this.props.value || data && path ? getFrom(path, data) : undefined; // TODO check re-renders

        return _react.default.createElement(Component, _extends({}, this.props, {
          value: value // Path specific error when given, else give the error for the whole data set
          ,
          error: path && pathError ? pathError[path] : error,
          onChange: this.handleChange,
          onError: this.handleError,
          loadedAt: loadedAt,
          changed: path ? pathChange[path] !== undefined : false,
          loading: path ? Boolean(pathLoading[path]) : loading,
          updating: path ? Boolean(pathChange[path] !== undefined && updating) : updating,
          updated: path ? Boolean(!updating && !pathChange[path] && pathInitial[path]) : false
        }));
      }
    }]);

    return EntityDataComponent;
  }(_react.default.PureComponent);

  _defineProperty(EntityDataComponent, "contextType", EntityDataContext);

  _defineProperty(EntityDataComponent, "propTypes", {
    // path: PropTypes.string,
    path: _propTypes.default.oneOfType([_propTypes.default.string, // Single value
    _propTypes.default.array // Multi-value object (leads to value { [pat1]: value, [path2]: value, ... })
    ]),
    value: _propTypes.default.any,
    data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
    onChange: _propTypes.default.func,
    onError: _propTypes.default.func
  });

  var name = Component.displayName || Component.name || 'Component';
  EntityDataComponent.displayName = "EntityData".concat(name);
  return EntityDataComponent;
}

var EntityData =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(EntityData, _React$PureComponent2);

  function EntityData() {
    var _getPrototypeOf3;

    var _this2;

    _classCallCheck(this, EntityData);

    for (var _len2 = arguments.length, _args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _args[_key2] = arguments[_key2];
    }

    _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(EntityData)).call.apply(_getPrototypeOf3, [this].concat(_args)));

    _defineProperty(_assertThisInitialized(_this2), "state", {
      editing: false
    });

    _defineProperty(_assertThisInitialized(_this2), "toggleEditing", function () {
      _this2.setState({
        editing: !_this2.state.editing
      });
    });

    _defineProperty(_assertThisInitialized(_this2), "bubbleEvent", function (event, subPath) {
      var _this2$props = _this2.props,
          onMode = _this2$props.onMode,
          onSubmit = _this2$props.onSubmit,
          onCancel = _this2$props.onCancel,
          onDelete = _this2$props.onDelete; // Call the event-prop of the EntityData implementation if given

      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      switch (event) {
        case 'mode':
          onMode && onMode.apply(void 0, [subPath, _this2.data].concat(args));
          break;

        case 'submit':
          onSubmit && onSubmit.apply(void 0, [subPath, _this2.data].concat(args));
          break;

        case 'cancel':
          onCancel && onCancel.apply(void 0, [subPath, _this2.data].concat(args));
          break;

        case 'delete':
          onDelete && onDelete.apply(void 0, [subPath, _this2.data].concat(args));
          break;
      }

      if (_this2.base) {
        // Skip bubbling events for base EntityData
        return;
      } // Bubble the event up the EntityData-tree. If this EventData was indented with a path from the
      // parent structure, prefix it (from the path prop)


      var fullPath = [_this2.props.path, subPath].filter(Boolean).join('.') || undefined;
      _this2.context.bubbleEvent && _this2.context.bubbleEvent(event, fullPath);
    });

    _defineProperty(_assertThisInitialized(_this2), "handleMode", function () {
      var _this3;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return (_this3 = _this2).bubbleEvent.apply(_this3, ['mode', undefined].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this2), "handlePathMode", function (subPath) {
      var _this4;

      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return (_this4 = _this2).bubbleEvent.apply(_this4, ['mode', subPath].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this2), "handleSubmit", function () {
      var _this5;

      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return (_this5 = _this2).bubbleEvent.apply(_this5, ['submit', undefined].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this2), "handlePathSubmit", function (subPath) {
      var _this6;

      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      return (_this6 = _this2).bubbleEvent.apply(_this6, ['submit', subPath].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this2), "handleCancel", function () {
      var _this7;

      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }

      return (_this7 = _this2).bubbleEvent.apply(_this7, ['cancel', undefined].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this2), "handlePathCancel", function (subPath) {
      var _this8;

      for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
        args[_key9 - 1] = arguments[_key9];
      }

      return (_this8 = _this2).bubbleEvent.apply(_this8, ['cancel', subPath].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this2), "handleDelete", function () {
      var _this9;

      for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        args[_key10] = arguments[_key10];
      }

      return (_this9 = _this2).bubbleEvent.apply(_this9, ['delete', undefined].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this2), "handlePathDelete", function (subPath) {
      var _this10;

      for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
        args[_key11 - 1] = arguments[_key11];
      }

      return (_this10 = _this2).bubbleEvent.apply(_this10, ['delete', subPath].concat(args));
    });

    _defineProperty(_assertThisInitialized(_this2), "handleChange", function (path, value, data) {
      // Direct onChange on this instance. Use the inner path regardless of outer EntityData components
      var localPath = [_this2.props.path, path].filter(Boolean).join('.');
      _this2.props.onChange && _this2.props.onChange(localPath, value, data);

      if (_this2.props.state || _this2.props.data) {
        // When this instance has state/data via direct props, consider it a "base" instance for
        // the given data, regardless of parent components. Ignore any context received from parents.
        return;
      } // Bubble the event up the EntityData-tree


      var fullPath = [_this2.context.path, _this2.props.path, path].filter(Boolean).join('.');
      _this2.context.onChange && _this2.context.onChange(fullPath, value, _this2.context.data);
    });

    return _this2;
  }

  _createClass(EntityData, [{
    key: "getFromState",
    value: function getFromState(path) {
      var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.props.state ? (0, _get2.default)(path, this.props.state) || def : (0, _get2.default)("context.".concat(path), this) || def;
    }
  }, {
    key: "recursiveStructure",
    value: function recursiveStructure(recursivePath, wholePath) {
      var _ref2;

      // Recursive structures is entity state data that has path into the data as key (like pathChange).
      // When an EntityData has a path (indenting into the data structure), update the path based structures
      // so the inner component can receive both data and metadata as if the indented level where the whole
      // data set
      var path = this.props.path;
      var outer = this.getFromState(recursivePath, {});
      var inner = path ? Object.keys(outer).filter(function (pathKey) {
        return pathKey.substring(0, path.length) === path && pathKey !== path;
      }).reduce(function (inner, pathKey) {
        return _objectSpread({}, inner, _defineProperty({}, pathKey.substring(path.length + 1), outer[pathKey]));
      }, {}) : outer;

      if (wholePath === undefined) {
        return _defineProperty({}, recursivePath, inner);
      }

      return _ref2 = {}, _defineProperty(_ref2, wholePath, outer && outer[path] !== undefined ? outer[path] : this.getFromState(wholePath)), _defineProperty(_ref2, recursivePath, inner), _ref2;
    }
  }, {
    key: "render",
    value: function render() {
      var _this11 = this;

      var _this$props = this.props,
          state = _this$props.state,
          iterate = _this$props.iterate,
          iterateKey = _this$props.iterateKey,
          onMode = _this$props.onMode,
          onSubmit = _this$props.onSubmit,
          onCancel = _this$props.onCancel,
          onDelete = _this$props.onDelete,
          children = _this$props.children;
      var data = this.data;
      return _react.default.createElement(EntityDataContext.Provider, {
        value: _objectSpread({
          data: data,
          loadedAt: state ? state.loadedAt : (0, _get2.default)('context.loadedAt', this)
        }, this.recursiveStructure('pathError', 'error'), {}, this.recursiveStructure('pathChange'), {}, this.recursiveStructure('pathInitial'), {}, this.recursiveStructure('pathMode', 'mode'), {}, this.recursiveStructure('pathLoading', 'loading'), {}, this.recursiveStructure('pathUpdating', 'updating'), {
          editing: this.state.editing,
          onToggleEdit: this.toggleEditing,
          onChange: this.handleChange,
          handleCancel: onCancel || !this.base && this.context.handleCancel ? this.handleCancel : undefined,
          handleDelete: onDelete || !this.base && this.context.handleDelete ? this.handleDelete : undefined,
          handleMode: onMode || !this.base && this.context.handleMode ? this.handleMode : undefined,
          handleSubmit: onSubmit || !this.base && this.context.handleSubmit ? this.handleSubmit : undefined,
          bubbleEvent: this.bubbleEvent,
          onError: this.props.onError
        })
      }, iterate && Array.isArray(data) ? data.map(function (element, index) {
        return _react.default.createElement(EntityData, {
          key: iterateKey ? iterateKey(element) : index,
          path: index.toString(),
          onChange: _this11.props.onElementChange,
          onSubmit: _this11.props.onElementSubmit,
          onDelete: _this11.props.onElementDelete,
          onMode: _this11.props.onElementMode
        }, typeof children === 'function' ? children(element, index) : children);
      }) : typeof children === 'function' ? children(data) : children);
    }
  }, {
    key: "base",
    get: function get() {
      // If there is state/data given to the component as props, consider it a base component and skip
      // bubbling of events to possible parent EntityData components.
      return this.props.state || this.props.data;
    }
  }, {
    key: "data",
    get: function get() {
      var _this$props2 = this.props,
          state = _this$props2.state,
          path = _this$props2.path; // If state is given, merge local changes to get the current state of the data.
      // If no direct state/data is given use from outer context EntityData

      var sourceData = state ? _entityState.EntityState.dataWithChanges(state) : this.props.data || (0, _get2.default)('context.data', this);
      return path ? (0, _get2.default)(path, sourceData) : sourceData;
    }
  }]);

  return EntityData;
}(_react.default.PureComponent);

exports.default = EntityData;

_defineProperty(EntityData, "contextType", EntityDataContext);

_defineProperty(EntityData, "propTypes", {
  state: _propTypes.default.object,
  data: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array]),
  // How long to wayt (debounce) before running onUpdate when inputs are changed
  onChange: _propTypes.default.func,
  onElementChange: _propTypes.default.func,
  onMode: _propTypes.default.func,
  onElementMode: _propTypes.default.func,
  onSubmit: _propTypes.default.func,
  onElementSubmit: _propTypes.default.func,
  onCancel: _propTypes.default.func,
  onElementCancel: _propTypes.default.func,
  onDelete: _propTypes.default.func,
  onElementDelete: _propTypes.default.func,
  onError: _propTypes.default.func,
  onElementError: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  path: _propTypes.default.string,
  iterate: _propTypes.default.bool,
  iterateKey: _propTypes.default.func // Function for getting element key in iterations

});

_defineProperty(EntityData, "defaultProps", {});