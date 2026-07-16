"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bullBoardAdapter = void 0;
// For development and admin monitoring, Bull Board gives a web UI that shows all queues, their jobs, status, progress, and failures. 
var api_1 = require("@bull-board/api");
var bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
var express_1 = require("@bull-board/express");
var feature_queue_js_1 = require("../queues/feature.queue.js");
var serverAdapter = new express_1.ExpressAdapter();
exports.bullBoardAdapter = serverAdapter;
serverAdapter.setBasePath('/api/v1/admin/queues');
(0, api_1.createBullBoard)({
    queues: [
        new bullMQAdapter_1.BullMQAdapter(feature_queue_js_1.featureQueue),
    ],
    serverAdapter: serverAdapter,
});
