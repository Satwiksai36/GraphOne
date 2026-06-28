"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const statsService_1 = require("../services/statsService");
const response_1 = require("../utils/response");
class StatsController {
    static async getStats(_req, res, next) {
        try {
            const result = await statsService_1.StatsService.getStats();
            (0, response_1.sendSuccess)(res, result, 'Dashboard stats fetched successfully');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StatsController = StatsController;
