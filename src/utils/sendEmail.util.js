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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
var ejs_1 = require("ejs");
var logger_config_js_1 = require("../configs/logger.config.js");
var brevo_1 = require("@getbrevo/brevo");
var brevo = new brevo_1.BrevoClient({ apiKey: process.env.BREVO_API_KEY.toString() });
var sendEmail = function (to_1, subject_1, content_1) {
    var args_1 = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args_1[_i - 3] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([to_1, subject_1, content_1], args_1, true), void 0, function (to, subject, content, name) {
        var html, result, err_1, retryAfter;
        if (name === void 0) { name = "Example"; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ejs_1.default.renderFile(process.cwd() + "/src/views/layout/template.ejs", { subject: subject, title: subject, content: content }, { async: true })];
                case 1:
                    html = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, brevo.transactionalEmails.sendTransacEmail({
                            subject: subject,
                            htmlContent: html,
                            sender: { name: name, email: process.env.BREVO_EMAIL.toString() },
                            to: [{ email: to }],
                        })];
                case 3:
                    result = _a.sent();
                    logger_config_js_1.default.info("Message sent successfully", {
                        messageId: result.messageId,
                    });
                    return [2 /*return*/, result];
                case 4:
                    err_1 = _a.sent();
                    if (err_1.statusCode === 401) {
                        logger_config_js_1.default.error("Invalid API key:", { recipient: to });
                    }
                    else if (err_1.statusCode === 429) {
                        retryAfter = err_1.rawResponse.headers["retry-after"];
                        logger_config_js_1.default.error("Rate limited. Retry after ".concat(retryAfter, "s"), { recipient: to });
                    }
                    else if (err_1 instanceof brevo_1.BrevoError) {
                        logger_config_js_1.default.error("Brevo API error ".concat(err_1.statusCode), {
                            recipient: to,
                            errorMessage: err_1.message,
                        });
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.sendEmail = sendEmail;
