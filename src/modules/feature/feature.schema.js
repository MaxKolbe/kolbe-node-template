"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleBodWithFilesSchema = exports.examplepaginationQuerySchema = exports.exampleParamSchema = exports.exampleQuerySchema = exports.exampleBodySchema = void 0;
//MODELS
var z = require("zod");
var globalSchema_js_1 = require("../../db/globalSchema.js");
exports.exampleBodySchema = z.object({
    body: z.object({
        exampleString: z.string().min(1, "--- is required").max(500),
        exampleNumber: z.coerce.number().int().min(1).max(100).default(20),
        exampleEnum: z.enum(["", "", ""]).optional(),
        exampleBoolean: z.coerce.boolean(),
        exampleDate: z.coerce.date(),
    }),
});
exports.exampleQuerySchema = z.object({
    query: z.object({
        exampleString: z.string(),
        exampleNumber: z.number(),
        exampleEnum: z.enum(["", "", ""]),
    }),
});
exports.exampleParamSchema = z.object({
    params: z.object({
        exampleId: z.uuid("Invalid ID"),
    }),
});
exports.examplepaginationQuerySchema = z.object({
    query: z.object({
        page: (0, globalSchema_js_1.optionalQueryNumber)(1),
        limit: (0, globalSchema_js_1.optionalQueryNumber)(25),
        orderBy: z.preprocess(function (v) { return (v === "" ? undefined : v); }, z.enum(["asc", "desc"]).default("desc")),
        search: z.string().trim().optional(),
        // sortBy: z.preprocess((v) => (v === "" ? undefined : v), z.enum([" ", " "]).default(" ")),
    }),
});
exports.exampleBodWithFilesSchema = z.object({
    body: z.object({
        exampleString: z.string().min(1, "--- is required").max(500),
        exampleNumber: z.coerce.number().int().min(1).max(100).default(20),
        exampleEnum: z.enum(["", "", ""]).optional(),
        exampleBoolean: z.coerce.boolean(),
        exampleDate: z.coerce.date(),
    }),
    file: z.object({
        fieldname: z.string(),
        originalname: z.string(),
        encoding: z.string(),
        mimetype: z.enum(["image/jpeg", "image/jpg", "image/png", "image/webp"], "Uploaded file should be a jpg, jpeg, png or webp"),
        size: z.number().max(20 * 1024 * 1024, "file must not be more than 20mb"), // 20MB,
        buffer: z.instanceof(Buffer),
    }),
    files: z.object({
        exampleFile1: z.array(z.object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string(),
            size: z.number().max(20 * 1024 * 1024, "file must not be more than 20mb"),
            buffer: z.instanceof(Buffer),
        })),
        exampleFile2: z.array(z.object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string(),
            size: z.number().max(20 * 1024 * 1024, "file must not be more than 20mb"),
            buffer: z.instanceof(Buffer),
        })),
        exampleFile3: z
            .array(z.object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string(),
            size: z.number().max(20 * 1024 * 1024, "file must not be more than 20mb"),
            buffer: z.instanceof(Buffer),
        }))
            .optional(),
    }),
});
