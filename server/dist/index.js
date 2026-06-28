"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const env_1 = require("./config/env");
const routes_1 = __importDefault(require("./routes"));
const swagger_1 = require("./swagger/swagger");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const rateLimiter_1 = require("./middlewares/rateLimiter");
const app = (0, express_1.default)();
// 1. Security Headers (Helmet)
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false, // Keep it disabled to allow swagger ui assets to load easily
}));
// 2. Enable CORS
app.use((0, cors_1.default)({
    origin: env_1.env.CORS_ORIGIN === '*' ? '*' : env_1.env.CORS_ORIGIN.split(','),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
// 3. Rate Limiter
app.use('/api/', rateLimiter_1.rateLimiter);
// 4. Request Logging (Morgan)
if (env_1.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined'));
}
// 5. Gzip Compression
app.use((0, compression_1.default)());
// 6. Body Parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 7. Swagger Documentation Route
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
// 8. Base API Route
app.use('/api', routes_1.default);
// 9. Root fallback handler
app.get('/', (_req, res) => {
    res.status(200).json({
        message: 'GraphOne Backend API is running.',
        docs: '/api-docs'
    });
});
// 10. 404 Fallback Route
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'The requested resource was not found on this server.'
        }
    });
});
// 11. Global Error Handler Middleware
app.use(errorMiddleware_1.errorHandler);
// Start Server
app.listen(env_1.env.PORT, () => {
    console.log(`🚀 GraphOne Server listening on http://localhost:${env_1.env.PORT}`);
    console.log(`📚 Swagger documentation available at http://localhost:${env_1.env.PORT}/api-docs`);
});
exports.default = app;
