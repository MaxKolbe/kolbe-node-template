"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalQueryNumber = void 0;
var z = require("zod");
var optionalQueryNumber = function (defaultValue) {
    return z.preprocess(function (v) {
        if (v === "" || v === undefined || Number.isNaN(Number(v))) {
            return undefined;
        }
        return v;
    }, z.coerce.number().int().min(1).max(100).default(defaultValue));
};
exports.optionalQueryNumber = optionalQueryNumber;
