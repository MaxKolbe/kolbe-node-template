"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callExampleApi = void 0;
var callapi_1 = require("@zayne-labs/callapi");
var logger_config_js_1 = require("../../configs/logger.config.js");
exports.callExampleApi = (0, callapi_1.createFetchClient)({
    baseURL: process.env.EXAMPLE_BASE_URL,
    retryAttempts: 1,
    throwOnError: true,
    timeout: 10000,
    dedupeStrategy: "cancel",
    // credentials: "same-origin",
    auth: process.env.EXAMPLE_API_KEY,
    onRequest: function (ctx) {
        logger_config_js_1.default.info("Request to --- has been made", {
            date: new Date(Date.now()),
            context: ctx.data,
        });
    },
    onResponse: function (ctx) {
        logger_config_js_1.default.info("Response from --- has been received", {
            date: new Date(Date.now()),
            context: ctx.data,
        });
    },
    onError: function (ctx) {
        logger_config_js_1.default.error("--- Api returned an error", {
            date: new Date(Date.now()),
            context: ctx.data,
        });
    },
    onSuccess: function (ctx) {
        logger_config_js_1.default.info("Request to --- was successfuly", {
            date: new Date(Date.now()),
            context: ctx.data,
        });
    },
    onRetry: function (ctx) {
        logger_config_js_1.default.info("Request failed. Retrying...", { date: new Date(Date.now()), context: ctx.data });
    },
});
