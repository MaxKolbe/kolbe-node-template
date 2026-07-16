"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = require("multer");
// MEMORY STORAGE
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
});
/** DISK STORAGE */
// export const upload = multer({
//   storage: multer.diskStorage({
//     destination: "uploads/",
//   }),
//   // It is better system design to enforce limits at the application level
//   //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });
