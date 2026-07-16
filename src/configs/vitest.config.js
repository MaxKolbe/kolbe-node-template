"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_path_1 = require("node:path");
var config_1 = require("vitest/config");
var configDir = import.meta.dirname;
var rootDir = node_path_1.default.resolve(configDir, "../..");
exports.default = (0, config_1.defineConfig)({
    envDir: rootDir,
    test: {
        setupFiles: [node_path_1.default.resolve(configDir, "vitest.setup.ts")],
        globals: true,
        environment: "node",
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            include: ["src/**/*.ts"],
            exclude: ["src/**/*.test.ts", "src/configs/**"],
        },
    },
});
