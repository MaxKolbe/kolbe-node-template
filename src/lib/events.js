"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEvents = void 0;
var events_1 = require("events");
exports.appEvents = new events_1.EventEmitter();
exports.appEvents.setMaxListeners(20);
