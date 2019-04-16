#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _commands = require("../commands");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander.default.option("--credentials [path]", "The path of the credentials json file.");

(0, _commands.registerCommands)(_commander.default);

_commander.default.parse(process.argv);