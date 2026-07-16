"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
var logger_config_js_1 = require("../configs/logger.config.js");
var crypto_1 = require("crypto");
var requestLogger = function (req, res, next) {
    // generate unique correlation id
    var correlationId = req.headers["x-correlation-id"] || (0, crypto_1.randomUUID)();
    // attach to request object
    req.correlationId = correlationId;
    // add to response headers so client can reference
    res.setHeader("x-correlation-id", correlationId);
    var startTime = Date.now();
    // Log incoming request
    logger_config_js_1.default.http("Request Received", {
        correlationId: correlationId,
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
    });
    // Log the response when it finishes
    res.on("finish", function () {
        var _a;
        var duration = Date.now() - startTime;
        var logData = {
            correlationId: correlationId,
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
            durationMs: duration,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        };
        if (res.statusCode >= 500) {
            logger_config_js_1.default.error("Request failed", logData);
        }
        else if (res.statusCode >= 400) {
            logger_config_js_1.default.error("Request failed - client error", logData);
        }
        else {
            logger_config_js_1.default.info("Request completed", logData);
        }
    });
    next();
};
exports.requestLogger = requestLogger;
exports.default = exports.requestLogger;
