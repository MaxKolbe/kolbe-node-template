"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
var REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
var generateAccessToken = function (user) {
    return jsonwebtoken_1.default.sign({ sub: user.id, type: "access" }, ACCESS_SECRET, { expiresIn: "15m" });
};
exports.generateAccessToken = generateAccessToken;
var generateRefreshToken = function (user) {
    return jsonwebtoken_1.default.sign({ sub: user.id, type: "refresh" }, REFRESH_SECRET, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
var verifyAccessToken = function (token) {
    return jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
var verifyRefreshToken = function (token) {
    return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
