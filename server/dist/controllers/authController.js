"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const response_1 = require("../utils/response");
class AuthController {
    static async register(req, res, next) {
        try {
            const result = await authService_1.AuthService.register(req.body);
            (0, response_1.sendSuccess)(res, result, 'Registration successful', 201);
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const result = await authService_1.AuthService.login(req.body);
            (0, response_1.sendSuccess)(res, result, 'Login successful', 200);
        }
        catch (error) {
            next(error);
        }
    }
    static async getProfile(req, res, next) {
        try {
            if (!req.user) {
                throw new Error('Not authenticated');
            }
            const result = await authService_1.AuthService.getProfile(req.user.userId);
            (0, response_1.sendSuccess)(res, result, 'Profile fetched successfully', 200);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
