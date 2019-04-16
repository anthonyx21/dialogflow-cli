"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _archiver = _interopRequireDefault(require("archiver"));

var _commander = _interopRequireDefault(require("commander"));

var _rawBody = _interopRequireDefault(require("raw-body"));

var _globalFlags = require("../globalFlags");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

// Given a path, compress the files at the path and make a string of the
// contents.
var makeArchive =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(path) {
    var archive, zipStringPromise;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            archive = (0, _archiver.default)("zip", {});
            zipStringPromise = (0, _rawBody.default)(archive);
            archive.on("warning", function (err) {
              if (err.code === "ENOENT") {
                // log warning
                // eslint-disable-next-line no-console
                console.warn(err);
              } else {
                // throw error
                throw err;
              }
            });
            archive.on("error", function (err) {
              throw err;
            });
            archive.directory(path, ".");
            archive.finalize();
            _context.next = 8;
            return zipStringPromise;

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function makeArchive(_x) {
    return _ref.apply(this, arguments);
  };
}();

var main =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var _ref3, agent, path, parent, agentContent, _ref4, _ref5, operation;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _globalFlags.handleArguments)(_commander.default);

          case 2:
            _ref3 = _context2.sent;
            agent = _ref3.agent;
            path = _ref3.path;
            parent = _ref3.parent;
            _context2.next = 8;
            return makeArchive(path);

          case 8:
            agentContent = _context2.sent;
            _context2.next = 11;
            return agent.importAgent({
              parent,
              agentContent
            });

          case 11:
            _ref4 = _context2.sent;
            _ref5 = _slicedToArray(_ref4, 1);
            operation = _ref5[0];
            _context2.next = 16;
            return operation.promise();

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function main() {
    return _ref2.apply(this, arguments);
  };
}();

var attachCommand = function attachCommand(program) {
  program.command("import [path]").description("Zips and imports the files at the specified path into the dialogflow agent").action(function () {
    main();
  });
};

var _default = attachCommand;
exports.default = _default;