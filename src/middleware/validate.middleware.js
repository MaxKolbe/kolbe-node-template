"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
var error_js_1 = require("../lib/error.js");
var validateRequest = function (schema) {
    return function (req, res, next) {
        var _a, _b, _c;
        var result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
            file: req.file,
            files: req.files
        });
        if (!result.success) {
            var errors = result.error.issues.map(function (issue) { return ({
                field: issue.path.slice(1).join("."), // Remove 'body'/'query' prefix
                message: issue.message,
            }); });
            // Replace with custom error
            throw new error_js_1.ValidationError("Request validation failed", errors);
        }
        req.body = (_a = result.data.body) !== null && _a !== void 0 ? _a : req.body;
        req.qtransformed = (_b = result.data.query) !== null && _b !== void 0 ? _b : req.query;
        req.params = (_c = result.data.params) !== null && _c !== void 0 ? _c : req.params;
        next();
    };
};
exports.validateRequest = validateRequest;
