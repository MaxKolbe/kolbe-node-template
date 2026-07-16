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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheGetOrSet = exports.hashKey = exports.cacheDelPattern = exports.cacheDel = exports.cacheSet = exports.cacheGet = exports.CACHE_TTL = void 0;
var logger_config_js_1 = require("../configs/logger.config.js");
var cache_config_js_1 = require("../configs/cache.config.js");
var crypto_1 = require("crypto");
exports.CACHE_TTL = {
    PERMISSIONS: 300, // 5 mins
    /*
      ...other TTLs
      */
};
var cacheGet = function (key) { return __awaiter(void 0, void 0, Promise, function () {
    var raw;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cache_config_js_1.default.get(key)];
            case 1:
                raw = _a.sent();
                if (!raw)
                    return [2 /*return*/, null];
                try {
                    logger_config_js_1.default.debug("*cacheGet fxn* cache hit @".concat(new Date(Date.now())));
                    return [2 /*return*/, JSON.parse(raw)];
                }
                catch (_b) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.cacheGet = cacheGet;
var cacheSet = function (key, value, ttlseconds) { return __awaiter(void 0, void 0, Promise, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cache_config_js_1.default.setEx(key, ttlseconds, JSON.stringify(value))];
            case 1:
                _a.sent();
                logger_config_js_1.default.debug("*cacheSet fxn* cache set @".concat(new Date(Date.now())));
                return [2 /*return*/];
        }
    });
}); };
exports.cacheSet = cacheSet;
var cacheDel = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, cache_config_js_1.default.del(key)];
            case 1:
                _a.sent();
                logger_config_js_1.default.debug("*cacheDel fxn* cache key deleted @".concat(new Date(Date.now())));
                return [2 /*return*/];
        }
    });
}); };
exports.cacheDel = cacheDel;
var cacheDelPattern = function (pattern) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, _b, _c, key, e_1_1;
    var _d, e_1, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 6, 7, 12]);
                _a = true, _b = __asyncValues(cache_config_js_1.default.scanIterator({ MATCH: pattern, COUNT: 100 }));
                _g.label = 1;
            case 1: return [4 /*yield*/, _b.next()];
            case 2:
                if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                _f = _c.value;
                _a = false;
                key = _f;
                return [4 /*yield*/, cache_config_js_1.default.del(key)];
            case 3:
                _g.sent();
                _g.label = 4;
            case 4:
                _a = true;
                return [3 /*break*/, 1];
            case 5: return [3 /*break*/, 12];
            case 6:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 7:
                _g.trys.push([7, , 10, 11]);
                if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 9];
                return [4 /*yield*/, _e.call(_b)];
            case 8:
                _g.sent();
                _g.label = 9;
            case 9: return [3 /*break*/, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 11: return [7 /*endfinally*/];
            case 12:
                logger_config_js_1.default.debug("*cacheDelPattern fxn* cache key pattern deleted @".concat(new Date(Date.now())));
                return [2 /*return*/];
        }
    });
}); };
exports.cacheDelPattern = cacheDelPattern;
var hashKey = function () {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, Promise, function () {
        var data;
        return __generator(this, function (_a) {
            data = parts.join(":");
            return [2 /*return*/, crypto_1.default.createHash("sha256").update(data).digest("hex").substring(0, 16)];
        });
    });
};
exports.hashKey = hashKey;
var cacheGetOrSet = function (key, ttlseconds, fetchFn) { return __awaiter(void 0, void 0, Promise, function () {
    var cached, lockKey, acquired, value, retried;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.cacheGet)(key)];
            case 1:
                cached = _a.sent();
                if (cached !== null)
                    return [2 /*return*/, cached];
                lockKey = "cedarrise:lock:".concat(key);
                return [4 /*yield*/, cache_config_js_1.default.set(lockKey, "1", { EX: 5, condition: "NX" })];
            case 2:
                acquired = _a.sent();
                if (!acquired) return [3 /*break*/, 8];
                _a.label = 3;
            case 3:
                _a.trys.push([3, , 6, 8]);
                return [4 /*yield*/, fetchFn()];
            case 4:
                value = _a.sent();
                return [4 /*yield*/, (0, exports.cacheSet)(key, value, ttlseconds)];
            case 5:
                _a.sent();
                return [2 /*return*/, value];
            case 6: return [4 /*yield*/, cache_config_js_1.default.del(lockKey)];
            case 7:
                _a.sent();
                return [7 /*endfinally*/];
            case 8: 
            //3. someone else has the lock. Wait briefly, then try cache again
            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
            case 9:
                //3. someone else has the lock. Wait briefly, then try cache again
                _a.sent();
                return [4 /*yield*/, (0, exports.cacheGet)(key)];
            case 10:
                retried = _a.sent();
                if (retried !== null)
                    return [2 /*return*/, retried];
                //4. Lock holder failed or cache still empty. Just fetch directly
                return [2 /*return*/, fetchFn()];
        }
    });
}); };
exports.cacheGetOrSet = cacheGetOrSet;
