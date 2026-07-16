"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshCookieOptions = exports.accessCookieOptions = void 0;
var isProduction = process.env.NODE_ENV === "production";
var sameSite = isProduction ? "none" : "lax";
exports.accessCookieOptions = {
    httpOnly: true,
    secure: isProduction, // should browser send the cookie over https?
    sameSite: sameSite,
    maxAge: 1000 * 60 * 60 * 24 * 7, // Long lived for retrieval 
};
exports.refreshCookieOptions = {
    httpOnly: true,
    secure: isProduction, // should browser send the cookie over https?
    sameSite: sameSite,
    maxAge: 1000 * 60 * 60 * 24 * 7, // matches refresh token exp age
};
