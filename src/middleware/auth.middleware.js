"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticateWithHeaders = exports.authenticate = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_services_js_1 = require("../services/auth.services.js");
var rbac_util_js_1 = require("../utils/rbac.util.js");
var token_util_js_1 = require("../utils/token.util.js");
var error_js_1 = require("../lib/error.js");
var cookie_js_1 = require("../lib/cookie.js");
var authenticate = function () { return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, payload, error_1, refreshToken, authResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.cookies["cookie-name"];
                if (!token)
                    throw new error_js_1.UnauthorizedError("No token provided");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 2, , 5]);
                payload = (0, token_util_js_1.verifyAccessToken)(token);
                if (payload.type !== "access")
                    throw new error_js_1.UnauthorizedError("Invalid token type");
                req.user = { id: payload.sub };
                next();
                return [3 /*break*/, 5];
            case 2:
                error_1 = _a.sent();
                if (!(error_1 instanceof jsonwebtoken_1.default.TokenExpiredError || error_1 instanceof jsonwebtoken_1.default.JsonWebTokenError)) return [3 /*break*/, 4];
                refreshToken = req.cookies["cookie-name"];
                if (!refreshToken)
                    throw new error_js_1.UnauthorizedError("No refresh token provided");
                return [4 /*yield*/, (0, auth_services_js_1.refresh)(refreshToken, req.correlationId, req.headers["user-agent"])];
            case 3:
                authResponse = _a.sent();
                res.cookie("cookie-name", authResponse.meta.accessToken, cookie_js_1.accessCookieOptions);
                res.cookie("cookie-name", authResponse.meta.refreshToken, cookie_js_1.refreshCookieOptions);
                req.user = {
                    id: authResponse.meta.sub,
                };
                return [2 /*return*/, next()];
            case 4: throw new error_js_1.UnauthorizedError("Invalid access token");
            case 5: return [2 /*return*/];
        }
    });
}); }; };
exports.authenticate = authenticate;
var authenticateWithHeaders = function () { return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var header, token, payload;
    return __generator(this, function (_a) {
        header = req.headers["authorization"];
        if (!header || !header.startsWith("Bearer")) {
            throw new error_js_1.UnauthorizedError("No token provided");
        }
        token = header.split(" ")[1];
        try {
            payload = (0, token_util_js_1.verifyAccessToken)(token);
            if (payload.type !== "access")
                throw new error_js_1.UnauthorizedError("Invalid token type");
            req.user = { id: payload.sub };
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                throw new error_js_1.UnauthorizedError("Token expired");
            }
            throw new error_js_1.UnauthorizedError("Invalid access token");
        }
        return [2 /*return*/];
    });
}); }; };
exports.authenticateWithHeaders = authenticateWithHeaders;
var authorize = function () {
    var requiredPermissions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        requiredPermissions[_i] = arguments[_i];
    }
    return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var userPermissions_1, missing, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        throw new error_js_1.UnauthorizedError();
                    }
                    return [4 /*yield*/, (0, rbac_util_js_1.getUserPermissions)(req.user.id)];
                case 1:
                    userPermissions_1 = _a.sent();
                    missing = requiredPermissions.filter(function (p) { return !userPermissions_1.includes(p); });
                    if (missing.length > 0) {
                        throw new error_js_1.ForbiddentError("You do not have the required permission");
                    }
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    next(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
exports.authorize = authorize;
