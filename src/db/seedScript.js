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
exports.seedReferencesTable = exports.createReferencesTable = void 0;
var logger_config_js_1 = require("../configs/logger.config.js");
var db_js_1 = require("./db.js");
// CLEAR TABLES
var clearTables = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                logger_config_js_1.default.info("Clearing tables...");
                return [4 /*yield*/, db_js_1.default.query("DELETE FROM \"references\"")];
            case 1:
                _a.sent();
                logger_config_js_1.default.info("Tables cleared :)");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                logger_config_js_1.default.error("Could not delete all tables", {
                    message: error_1.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// INSTALL EXTENSIONS
var installExtensions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                logger_config_js_1.default.info("Installing Extensions");
                return [4 /*yield*/, db_js_1.default.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")];
            case 1:
                _a.sent();
                logger_config_js_1.default.info("Extensions Installed :)");
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                logger_config_js_1.default.error("Could not install extensions", {
                    message: error_2.message,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createReferencesTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var query, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "\n    CREATE TABLE IF NOT EXISTS \"references\" (\n      id uuid PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n      int integer,\n      int1 integer DEFAULT 10,\n      int2 integer NOT NULL,\n      boolean boolean,\n      text1 text NOT NULL,\n      text2 text,\n      varchar1 varchar,\n      varchar2 varchar(256),\n      char1 char,\n      char2 char(256),\n      numeric1 numeric,\n      numeric2 numeric(100),\n      numeric3 numeric(100, 20),\n      json1 json,\n      json2 json DEFAULT '{\"foo\":\"bar\"}'::json,\n      jsonb1 jsonb,\n      jsonb2 jsonb DEFAULT '{\"foo\":\"bar\"}'::jsonb,\n      uuid1 uuid,\n      uuid2 uuid DEFAULT gen_random_uuid(),\n      time1 time,\n      date date,\n      number_array numeric[],\n      string_array1 text[],\n      \"unique\" text,\n      string_array2 text[] NOT NULL,\n      timestamp1 timestamp,\n      updated_at timestamp,\n      created_at timestamp NOT NULL DEFAULT now(),\n      deleted_at timestamp,\n      CONSTRAINT references_unique_unique UNIQUE (\"unique\")\n    );\n    CREATE INDEX IF NOT EXISTS example_idx ON \"references\" USING btree (text2);\n    CREATE INDEX IF NOT EXISTS example_search_index ON \"references\" USING gin (\n      (\n        setweight(to_tsvector('english', text1), 'A') ||\n        setweight(to_tsvector('english', coalesce(text2, '')), 'B') ||\n        setweight(array_to_tsvector(coalesce(string_array1, ARRAY[]::text[])), 'C') ||\n        setweight(to_tsvector('english', coalesce(numeric1::text, '')), 'D')\n      )\n    );";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_js_1.default.query(query)];
            case 2:
                _a.sent();
                console.log('Table "references" created');
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.log('error creating references table', err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createReferencesTable = createReferencesTable;
var seedReferencesTable = function () { return __awaiter(void 0, void 0, void 0, function () {
    var query, rows, _i, rows_1, row, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = "\n    INSERT INTO \"references\"\n      (int, int1, int2, boolean, text1, text2, varchar1, varchar2, char1, char2,\n       numeric1, numeric2, numeric3, json1, json2, jsonb1, jsonb2, uuid1,\n       time1, date, number_array, string_array1, \"unique\", string_array2, timestamp1)\n    VALUES\n      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,\n       $11, $12, $13, $14, $15, $16, $17, $18,\n       $19, $20, $21, $22, $23, $24, $25);";
                rows = [
                    {
                        int: 5,
                        int1: 20,
                        int2: 100,
                        boolean: true,
                        text1: "First seeded reference row",
                        text2: "search text alpha",
                        varchar1: "v",
                        varchar2: "varchar value one",
                        char1: "a",
                        char2: "char value one",
                        numeric1: 3.14,
                        numeric2: 12345,
                        numeric3: 1.2345,
                        json1: { note: "plain json 1" },
                        json2: { foo: "baz" },
                        jsonb1: { note: "jsonb 1" },
                        jsonb2: { foo: "qux" },
                        uuid1: "11111111-1111-1111-1111-111111111111",
                        time1: "09:00:00",
                        date: "2026-01-01",
                        number_array: [1, 2, 3],
                        string_array1: ["red", "green"],
                        unique: "unique-row-1",
                        string_array2: ["mandatory", "array", "one"],
                        timestamp1: "2026-01-01 09:00:00",
                    },
                    {
                        int: 15,
                        int1: 25,
                        int2: 200,
                        boolean: false,
                        text1: "Second seeded reference row",
                        text2: "search text beta",
                        varchar1: "w",
                        varchar2: "varchar value two",
                        char1: "b",
                        char2: "char value two",
                        numeric1: 2.71,
                        numeric2: 54321,
                        numeric3: 9.8765,
                        json1: { note: "plain json 2" },
                        json2: { foo: "bar" },
                        jsonb1: { note: "jsonb 2" },
                        jsonb2: { foo: "bar" },
                        uuid1: "22222222-2222-2222-2222-222222222222",
                        time1: "13:30:00",
                        date: "2026-02-14",
                        number_array: [4, 5, 6],
                        string_array1: ["blue"],
                        unique: "unique-row-2",
                        string_array2: ["mandatory", "array", "two"],
                        timestamp1: "2026-02-14 13:30:00",
                    },
                    {
                        int: null,
                        int1: 30,
                        int2: 300,
                        boolean: true,
                        text1: "Third seeded reference row",
                        text2: null,
                        varchar1: "x",
                        varchar2: "varchar value three",
                        char1: "c",
                        char2: "char value three",
                        numeric1: 1.41,
                        numeric2: 99999,
                        numeric3: 5.0001,
                        json1: { note: "plain json 3" },
                        json2: { foo: "bar" },
                        jsonb1: { note: "jsonb 3" },
                        jsonb2: { foo: "bar" },
                        uuid1: "33333333-3333-3333-3333-333333333333",
                        time1: "18:45:00",
                        date: "2026-03-21",
                        number_array: [7, 8],
                        string_array1: null,
                        unique: "unique-row-3",
                        string_array2: ["mandatory", "array", "three"],
                        timestamp1: null,
                    },
                    {
                        int: 42,
                        int1: 10,
                        int2: 400,
                        boolean: false,
                        text1: "Fourth seeded reference row",
                        text2: "search text delta",
                        varchar1: "y",
                        varchar2: "varchar value four",
                        char1: "d",
                        char2: "char value four",
                        numeric1: 0.577,
                        numeric2: 11111,
                        numeric3: 3.3333,
                        json1: { note: "plain json 4" },
                        json2: { foo: "bar" },
                        jsonb1: { note: "jsonb 4" },
                        jsonb2: { foo: "bar" },
                        uuid1: "44444444-4444-4444-4444-444444444444",
                        time1: "22:15:00",
                        date: "2026-04-30",
                        number_array: [9, 10, 11],
                        string_array1: ["yellow", "purple", "orange"],
                        unique: "unique-row-4",
                        string_array2: ["mandatory", "array", "four"],
                        timestamp1: "2026-04-30 22:15:00",
                    },
                ];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                _i = 0, rows_1 = rows;
                _a.label = 2;
            case 2:
                if (!(_i < rows_1.length)) return [3 /*break*/, 5];
                row = rows_1[_i];
                return [4 /*yield*/, db_js_1.default.query(query, [
                        row.int,
                        row.int1,
                        row.int2,
                        row.boolean,
                        row.text1,
                        row.text2,
                        row.varchar1,
                        row.varchar2,
                        row.char1,
                        row.char2,
                        row.numeric1,
                        row.numeric2,
                        row.numeric3,
                        row.json1,
                        row.json2,
                        row.jsonb1,
                        row.jsonb2,
                        row.uuid1,
                        row.time1,
                        row.date,
                        row.number_array,
                        row.string_array1,
                        row.unique,
                        row.string_array2,
                        row.timestamp1,
                    ])];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log('Table "references" seeded with 4 rows');
                return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                console.log("error seeding references table", err_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.seedReferencesTable = seedReferencesTable;
clearTables();
installExtensions();
(0, exports.createReferencesTable)();
(0, exports.seedReferencesTable)();
