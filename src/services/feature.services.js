"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.example = void 0;
//SERVICES
var example = function (options, correlationId) {
    return {
        code: 200,
        message: "Success",
        data: {},
        meta: {
            correlationId: correlationId,
        },
    };
};
exports.example = example;
