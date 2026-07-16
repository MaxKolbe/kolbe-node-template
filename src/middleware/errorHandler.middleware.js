"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_js_1 = require("../lib/error.js");
var logger_config_js_1 = require("../configs/logger.config.js");
var errorHandler = function (err, req, res, next) {
    if (err instanceof error_js_1.AppError) {
        logger_config_js_1.default.warn("APPERROR INSTANCE", {
            code: err.code,
            message: err.message,
            details: err.details ? err.details : "",
        });
        return res.status(err.statusCode).json({
            status: false,
            error: __assign({ code: err.isOperational ? err.code : 500, message: err.isOperational ? err.message : "Internal server error" }, (err.details && err.isOperational && { details: err.details })),
        });
    }
    // bug
    logger_config_js_1.default.error("Unhandled error", { error: err });
    console.log("\n Unhandled error", err); // Remove on prod
    res.status(500).json({
        status: false,
        error: {
            code: "INTERNAL_ERROR",
            message: "An unexpected error occured",
        },
    });
};
exports.default = errorHandler;
