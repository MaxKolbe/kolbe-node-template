"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_js_1 = require("./app.js");
var db_js_1 = require("./db/db.js");
var logger_config_js_1 = require("./configs/logger.config.js");
var port = process.env.PORT || 3000;
await db_js_1.default.execute("SELECT 1");
logger_config_js_1.default.info("Drizzle connected successfully");
app_js_1.default.listen(port, function () {
    logger_config_js_1.default.info("Server running on port: ".concat(port));
});
