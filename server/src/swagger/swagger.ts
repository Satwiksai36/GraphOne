import swaggerJsdoc from 'swagger-jsdoc';
import { env } from '../config/env';

const options: swaggerJsdoc.Options = {
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
        url: `http://localhost:${env.PORT}`,
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

export const swaggerSpec = swaggerJsdoc(options);
