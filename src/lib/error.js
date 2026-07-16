"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflictError = exports.NotFoundError = exports.ForbiddentError = exports.UnauthorizedError = exports.ValidationError = exports.AppError = void 0;
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(message, statusCode, code, details) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.code = code;
        _this.isOperational = true;
        _this.details = details;
        Error.captureStackTrace(_this, _this.constructor);
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, details) {
        return _super.call(this, message, 400, "VALIDATION_ERROR", details) || this;
    }
    return ValidationError;
}(AppError));
exports.ValidationError = ValidationError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        if (message === void 0) { message = "Authentication required"; }
        return _super.call(this, message, 401, "UNAUTHORIZED") || this;
    }
    return UnauthorizedError;
}(AppError));
exports.UnauthorizedError = UnauthorizedError;
var ForbiddentError = /** @class */ (function (_super) {
    __extends(ForbiddentError, _super);
    function ForbiddentError(message) {
        if (message === void 0) { message = "Access denied"; }
        return _super.call(this, message, 403, "FORBIDDEN") || this;
    }
    return ForbiddentError;
}(AppError));
exports.ForbiddentError = ForbiddentError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        return _super.call(this, message, 404, "NOT_FOUND") || this;
    }
    return NotFoundError;
}(AppError));
exports.NotFoundError = NotFoundError;
var conflictError = /** @class */ (function (_super) {
    __extends(conflictError, _super);
    function conflictError(message) {
        return _super.call(this, message, 409, "CONFLICT") || this;
    }
    return conflictError;
}(AppError));
exports.conflictError = conflictError;
