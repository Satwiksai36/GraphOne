"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const response_1 = require("../utils/response");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        (0, response_1.sendError)(res, 'UNAUTHORIZED', 'Not authorized to access this resource. Token missing.', 401);
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        (0, response_1.sendError)(res, 'UNAUTHORIZED', 'Not authorized to access this resource. Token invalid or expired.', 401);
    }
};
exports.protect = protect;
const adminOnly = async (req, res, next) => {
    if (!req.user) {
        (0, response_1.sendError)(res, 'UNAUTHORIZED', 'Not authorized.', 401);
        return;
    }
    if (req.user.role !== 'admin') {
        (0, response_1.sendError)(res, 'FORBIDDEN', 'Access denied. Administrator privileges required.', 403);
        return;
    }
    next();
};
exports.adminOnly = adminOnly;
