"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var logger_config_js_1 = require("../configs/logger.config.js");
var dbMap = new Map([
    ["development", process.env.PG_DATABASE_DEV_URL],
    ["test", process.env.PG_DATABASE_TEST_URL],
    ["production", process.env.PG_DATABASE_PROD_URL],
]);
var dburl = dbMap.get(process.env.NODE_ENV);
var pool = new pg_1.Pool({
    connectionString: dburl,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
pool.on("connect", function () {
    logger_config_js_1.default.info("Connected to the database Pool successfully");
});
pool.on("error", function () {
    logger_config_js_1.default.info("Error Connecting to the database Pool");
});
exports.default = pool;
