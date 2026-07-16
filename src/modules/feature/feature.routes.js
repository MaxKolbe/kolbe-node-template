"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//ROUTES
var express_1 = require("express");
var multer_config_js_1 = require("../../configs/multer.config.js");
var router = express_1.default.Router();
router.get("/");
router.post("/");
router.put("/");
router.delete("/");
router.post("/", multer_config_js_1.upload.single("file"));
router.post("/", multer_config_js_1.upload.fields([
    { name: "exampleFile1", maxCount: 1 },
    { name: "exampleFile2", maxCount: 1 },
    { name: "exampleFile3", maxCount: 1 },
]));
exports.default = router;
