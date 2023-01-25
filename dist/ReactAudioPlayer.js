"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
var _PlayArrow = _interopRequireDefault(require("@mui/icons-material/PlayArrow"));
var _Pause = _interopRequireDefault(require("@mui/icons-material/Pause"));
var _VolumeUp = _interopRequireDefault(require("@mui/icons-material/VolumeUp"));
var _VolumeOff = _interopRequireDefault(require("@mui/icons-material/VolumeOff"));
var _ReactAudioPlayerModule = _interopRequireDefault(require("./ReactAudioPlayer.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ReactAudioPlayer = function ReactAudioPlayer(_ref) {
  var audioSource = _ref.audioSource,
    autoPlay = _ref.autoPlay,
    bgColor = _ref.bgColor,
    textColor = _ref.textColor,
    border = _ref.border;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isPlaying = _useState2[0],
    setIsplaying = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isMuted = _useState4[0],
    setIsMuted = _useState4[1];
  var _useState5 = (0, _react.useState)({
      current: 0,
      duration: 0
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    audioTime = _useState6[0],
    setAudioTime = _useState6[1];
  var _useState7 = (0, _react.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    audioPresent = _useState8[0],
    setAudioPresent = _useState8[1];
  var audioRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (audioSource) {
      var elem = document.getElementById("myBar");
      elem.style.width = 0;
      setAudioPresent(true);
    }
  }, [audioSource]);
  var playSongHandler = function playSongHandler() {
    if (isPlaying) {
      audioRef.current.pause();
      setIsplaying(false);
    } else {
      audioRef.current.play();
      setIsplaying(true);
    }
  };
  var timeUpdateHadler = function timeUpdateHadler(e) {
    var _e$target = e.target,
      currentTime = _e$target.currentTime,
      duration = _e$target.duration;
    if (!isFinite(duration) || isNaN(duration)) {
      duration = 0;
    }
    setAudioTime(_objectSpread(_objectSpread({}, audioTime), {}, {
      current: currentTime,
      duration: duration
    }));
  };
  (0, _react.useEffect)(function () {
    if (audioTime && audioTime.duration && audioTime.duration > 0) {
      setAudioPresent(true);
    } else {
      setAudioPresent(false);
    }
    var elem = document.getElementById("myBar");
    // var timeDiff = parseFloat(audioRef.current.currentTime) - parseFloat(audioTime.current)
    elem.style.transition = "width 0.5s ease";
    var width = audioTime.current / audioTime.duration * 100;
    elem.style.width = width + "%";
    if (width === 100) {
      setIsplaying(false);
    }
  }, [audioTime]);
  var formatAudioTime = function formatAudioTime(time) {
    var a = Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    return a;
  };

  // const audioInputChangeHandler = (e) => {
  //   audioRef.current.current = e.target.value;
  //   setAudioTime({ ...audioTime, current: e.target.value });
  // };

  var muteHandler = function muteHandler() {
    setIsMuted(true);
    audioRef.current.defaultMuted = true;
    audioRef.current.muted = true;
  };
  var unMuteHandler = function unMuteHandler() {
    setIsMuted(false);
    audioRef.current.defaultMuted = false;
    audioRef.current.muted = false;
  };
  var handler = function handler(mouseDownEvent) {
    var rect = mouseDownEvent.target.getBoundingClientRect();
    var updateWidth = function updateWidth(mouseEvent) {
      if (!audioTime || !audioTime.duration || audioTime.duration === 0) {}
      var elem = document.getElementById("myBar");
      elem.style.transition = "width 0s";
      var x = mouseEvent.clientX - rect.left; //x position within the element.
      var x1 = getComputedStyle(document.getElementById("myProgress")).width;
      var a = parseFloat(x) / parseFloat(x1) * 100;
      if (a > 100 || a < 0) {
        return;
      }
      var width = a;
      elem.style.width = width + "%";
      audioRef.current.currentTime = audioTime.duration * width / 100;
      setAudioTime(_objectSpread(_objectSpread({}, audioTime), {}, {
        current: audioTime.duration * width / 100
      }));
      if (width === 100) {
        setIsplaying(false);
      }
    };
    updateWidth(mouseDownEvent);
    function onMouseMove(mouseMoveEvent) {
      updateWidth(mouseMoveEvent);
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, {
      once: true
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: audioPresent ? _ReactAudioPlayerModule["default"].player : _ReactAudioPlayerModule["default"].playerDis,
    style: border === "rounded" ? {
      backgroundColor: bgColor,
      color: textColor,
      borderRadius: "1.5rem"
    } : {
      backgroundColor: bgColor,
      color: textColor
    }
  }, /*#__PURE__*/React.createElement("audio", {
    id: "audioSrc",
    ref: audioRef,
    src: audioSource,
    autoPlay: autoPlay,
    onLoadedMetadata: timeUpdateHadler,
    onTimeUpdate: timeUpdateHadler
  }), /*#__PURE__*/React.createElement("div", null, isPlaying ? /*#__PURE__*/React.createElement("button", {
    className: audioPresent ? _ReactAudioPlayerModule["default"].playBtn : _ReactAudioPlayerModule["default"].playBtnDis,
    onClick: playSongHandler,
    disabled: audioPresent ? false : true,
    style: {
      color: textColor
    }
  }, /*#__PURE__*/React.createElement(_Pause["default"], null)) : /*#__PURE__*/React.createElement("button", {
    className: audioPresent ? _ReactAudioPlayerModule["default"].playBtn : _ReactAudioPlayerModule["default"].playBtnDis,
    onClick: playSongHandler,
    disabled: audioPresent ? false : true,
    style: {
      color: textColor
    }
  }, /*#__PURE__*/React.createElement(_PlayArrow["default"], null))), /*#__PURE__*/React.createElement("div", {
    className: "d-flex me-3 ".concat(_ReactAudioPlayerModule["default"].time)
  }, /*#__PURE__*/React.createElement("span", null, formatAudioTime(audioTime.current)), /*#__PURE__*/React.createElement("span", null, "\xA0/\xA0"), /*#__PURE__*/React.createElement("span", null, formatAudioTime(audioTime.duration))), /*#__PURE__*/React.createElement("div", {
    className: audioPresent ? _ReactAudioPlayerModule["default"].myProgress : _ReactAudioPlayerModule["default"].myProgressDis,
    id: "myProgress",
    onMouseDown: handler
  }, /*#__PURE__*/React.createElement("div", {
    className: _ReactAudioPlayerModule["default"].myBar,
    id: "myBar",
    style: {
      backgroundColor: textColor
    }
  })), isMuted ? /*#__PURE__*/React.createElement("button", {
    onClick: unMuteHandler,
    className: audioPresent ? _ReactAudioPlayerModule["default"].playBtn : _ReactAudioPlayerModule["default"].playBtnDis,
    disabled: audioPresent ? false : true,
    style: {
      color: textColor
    }
  }, /*#__PURE__*/React.createElement(_VolumeOff["default"], null)) : /*#__PURE__*/React.createElement("button", {
    onClick: muteHandler,
    className: audioPresent ? _ReactAudioPlayerModule["default"].playBtn : _ReactAudioPlayerModule["default"].playBtnDis,
    disabled: audioPresent ? false : true,
    style: {
      color: textColor
    }
  }, /*#__PURE__*/React.createElement(_VolumeUp["default"], null))));
};
var _default = ReactAudioPlayer;
exports["default"] = _default;