"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var requestLogger_middleware_js_1 = require("./middleware/requestLogger.middleware.js");
var errorHandler_middleware_js_1 = require("./middleware/errorHandler.middleware.js");
// import { connectRedis } from "./configs/cache.config.js";
// import { bullBoardAdapter } from "./configs/bull-board.config.js";
// import featureRouter from "./modules/feature/feature.routes.js";
// import "./queues/workers/feature.worker.js"
var app = (0, express_1.default)();
var whitelist = ["http://localhost:".concat(process.env.PORT)];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin || "") !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true, //Allow cookies/auth headers
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // Cache preflight requests for 24 hours
};
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(requestLogger_middleware_js_1.default);
// (async () => {
//   await connectRedis();
// })();
//ROUTES
/* app.use("/api/v1", featureRouter); */
// app.use("/queues", bullBoardAdapter.getRouter());
// BULL BOARD DASHBOARD. (ADD AUTH N' AUTH IN PRODUCTION)
// app.use("/api/v1/admin/queues", bullBoardAdapter.getRouter());
// HANDLER FOR UNKNOWN ROUTES
app.use(function (req, res) {
    res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Route ".concat(req.path, " not found") },
    });
});
//GLOBAL ERROR HANDLER
app.use(errorHandler_middleware_js_1.default);
exports.default = app;
