"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleAuthScema = void 0;
var z = require("zod");
exports.exampleAuthScema = z.object({
    body: z.object({
        email: z.email("Must be a valid email").transform(function (v) { return v.toLowerCase().trim(); }),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .max(128, "Password cannot exceed 128 characters")
            .regex(/[A-Z]/, "Must contain an uppercase letter")
            .regex(/[0-9]/, "Must contain a number"),
    }),
});
