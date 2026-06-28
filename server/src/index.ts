import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env';
import apiRouter from './routes';
import { swaggerSpec } from './swagger/swagger';
import { errorHandler } from './middlewares/errorMiddleware';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();

// 1. Security Headers (Helmet)
app.use(helmet({
  contentSecurityPolicy: false, // Keep it disabled to allow swagger ui assets to load easily
}));

// 2. Enable CORS
app.use(cors({
  origin: env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 3. Rate Limiter
app.use('/api/', rateLimiter);

// 4. Request Logging (Morgan)
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// 5. Gzip Compression
app.use(compression());

// 6. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 7. Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 8. Base API Route
app.use('/api', apiRouter);

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
app.use(errorHandler);

// Start Server
app.listen(env.PORT, () => {
  console.log(`🚀 GraphOne Server listening on http://localhost:${env.PORT}`);
  console.log(`📚 Swagger documentation available at http://localhost:${env.PORT}/api-docs`);
});

export default app;
