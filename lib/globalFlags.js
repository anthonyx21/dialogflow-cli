"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleArguments = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _dialogflow = require("dialogflow");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var handleArguments =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(program) {
    var _program$args, path, credentialsPath, agent, auth, parent;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Assert Path
            _program$args = _slicedToArray(program.args, 1), path = _program$args[0];

            if (path) {
              _context.next = 3;
              break;
            }

            throw new TypeError(`The path wasn't specified.`);

          case 3:
            if (program.credentials) {
              _context.next = 5;
              break;
            }

            throw new TypeError(`The --credentials flag wasn't provided`);

          case 5:
            credentialsPath = program.credentials; // Make Agent

            agent = new _dialogflow.AgentsClient({
              keyFilename: credentialsPath
            }); // Wait for authentication.

            _context.next = 9;
            return agent.auth.authClientPromise;

          case 9:
            auth = _context.sent;
            // Create Project Path String
            parent = agent.projectPath(auth.projectId);
            return _context.abrupt("return", {
              parent,
              auth,
              path,
              agent
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function handleArguments(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleArguments = handleArguments;