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
exports.worker = void 0;
var bullmq_1 = require("bullmq");
var logger_config_js_1 = require("../../configs/logger.config.js");
var redis_username = process.env.REDIS_USERNAME;
var redis_password = process.env.REDIS_PASSWORD;
var redis_host = process.env.REDIS_HOST;
var redis_port = Number(process.env.REDIS_PORT);
var worker = new bullmq_1.Worker("feature-queue", function (job) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        _a = job.data;
        return [2 /*return*/];
    });
}); }, {
    connection: {
        username: redis_username,
        password: redis_password,
        host: redis_host,
        port: redis_port,
    },
    // 3 jobs can run concurrently i.e this worker processes up to 3 documents simultaneously.
    // If you have 10 documents in the queue, the worker handles 3 at a time. The rest wait.
    // Set based on server cpu and memory
    concurrency: 3,
});
exports.worker = worker;
// Event listeners for logging
worker.on("completed", function (job) {
    logger_config_js_1.default.info("Job completed", {
        jobId: job.id,
        correlationId: job.data.correlationId
    });
});
worker.on("failed", function (job, error) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        if (!job) {
            return [2 /*return*/];
        }
        if (job.attemptsMade >= ((_a = job.opts.attempts) !== null && _a !== void 0 ? _a : 3)) {
            logger_config_js_1.default.error("Job failed permanently", {
                jobId: job === null || job === void 0 ? void 0 : job.id,
                correlationId: job === null || job === void 0 ? void 0 : job.data.correlationId,
                error: error,
            });
        }
        return [2 /*return*/];
    });
}); });
worker.on("error", function (error) {
    logger_config_js_1.default.error("Worker error", {
        error: error,
    });
});
