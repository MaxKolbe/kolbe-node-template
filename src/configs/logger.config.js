"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
// import { LogtailTransport } from "@logtail/winston";
// Create a Logtail client
// const logtail = new Logtail(process.env.SOURCE_TOKEN!, {
//   endpoint: `https://${process.env.INGESTING_HOST}`,
// });
var _a = winston_1.default.format, combine = _a.combine, timestamp = _a.timestamp, json = _a.json, errors = _a.errors, align = _a.align, colorize = _a.colorize, printf = _a.printf;
var isProduction = process.env.NODE_ENV === "production";
var logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: combine(timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }), errors({ stack: true }), isProduction
        ? combine(json(), align())
        : combine(colorize(), printf(function (_a) {
            var timestamp = _a.timestamp, level = _a.level, message = _a.message, meta = __rest(_a, ["timestamp", "level", "message"]);
            var metaStr = Object.keys(meta).length ? " ".concat(JSON.stringify(meta)) : "";
            return "".concat(timestamp, " ").concat(level, ": ").concat(message).concat(metaStr);
        }))),
    defaultMeta: { service: "template-service" },
    transports: [new winston_1.default.transports.Console() /*, new LogtailTransport(logtail)*/],
});
exports.default = logger;
