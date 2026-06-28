"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statsController_1 = require("../controllers/statsController");
const cache_1 = require("../utils/cache");
const router = (0, express_1.Router)();
router.get('/', (0, cache_1.cacheMiddleware)(300), statsController_1.StatsController.getStats);
exports.default = router;
