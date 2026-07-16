"use strict";
//SERVICES
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.logout = exports.login = exports.signup = void 0;
var signup = function (options, correlationId) {
    return {
        code: 200,
        message: "",
        data: {},
        meta: {
            correlationId: correlationId,
        },
    };
};
exports.signup = signup;
var login = function (options, correlationId) {
    return {
        code: 200,
        message: "",
        data: {},
        meta: {
            correlationId: correlationId,
        },
    };
};
exports.login = login;
var logout = function (rawRefreshToken) {
    return;
};
exports.logout = logout;
var refresh = function (rawRefreshToken, correlationId, deviceInfo) {
    return {
        code: 200,
        message: "",
        data: {},
        meta: {
            sub: "",
            accessToken: "",
            refreshToken: "",
            correlationId: correlationId,
        },
    };
};
exports.refresh = refresh;
