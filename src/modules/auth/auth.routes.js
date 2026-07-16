"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ROUTES
var express_1 = require("express");
var auth_schema_js_1 = require("./auth.schema.js");
var auth_middleware_js_1 = require("../../middleware/auth.middleware.js");
var validate_middleware_js_1 = require("../../middleware/validate.middleware.js");
var auth_controller_js_1 = require("./auth.controller.js");
var router = express_1.default.Router();
router.post("/signup", (0, validate_middleware_js_1.validateRequest)(auth_schema_js_1.exampleAuthScema), auth_controller_js_1.signupController);
router.post("/login", (0, validate_middleware_js_1.validateRequest)(auth_schema_js_1.exampleAuthScema), auth_controller_js_1.loginController);
router.post("/logout", auth_controller_js_1.logoutController);
router.post("/session", (0, auth_middleware_js_1.authenticate)(), auth_controller_js_1.sessionController);
