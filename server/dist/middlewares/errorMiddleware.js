"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const errorHandler = (err, _req, res, _next) => {
    console.error('💥 Unhandled Exception:', err);
    const statusCode = err.statusCode || 500;
    const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'An unexpected error occurred on the server.';
    (0, response_1.sendError)(res, errorCode, message, statusCode);
};
exports.errorHandler = errorHandler;
