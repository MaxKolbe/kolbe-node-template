"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
var successResponse = function (res, code, message, data, meta) {
    if (data === void 0) { data = null; }
    return res.status(code).json({
        success: true,
        message: message,
        data: data,
        meta: meta,
    });
};
exports.successResponse = successResponse;
