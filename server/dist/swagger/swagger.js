"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("../config/env");
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GraphOne API Documentation',
            version: '1.0.0',
            description: 'Production-grade API backend for tracking the AI Economy',
            contact: {
                name: 'GraphOne Support',
                email: 'support@graphone.com'
            }
        },
        servers: [
            {
                url: `http://localhost:${env_1.env.PORT}`,
                description: 'Local development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token in the format: Bearer <token>'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    // Parse comments in route files
    apis: ['./src/routes/*.ts', './src/routes/*.js', './dist/routes/*.js']
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
