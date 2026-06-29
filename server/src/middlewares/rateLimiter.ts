import rateLimit from 'express-rate-limit';
import { env } from '../config/env';
import { sendError } from '../utils/response';

export const rateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  // Relax rate limits in development to prevent 429 errors from local page refreshes & dev environment tools
  max: env.NODE_ENV === 'development' ? 10000 : env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for localhost/loopback requests (e.g. Next.js SSR) or on Vercel Serverless Functions
    const ip = req.ip || req.socket.remoteAddress || '';
    return (
      ip === '127.0.0.1' ||
      ip === '::1' ||
      ip === '::ffff:127.0.0.1' ||
      env.NODE_ENV === 'development' ||
      !!process.env.VERCEL // Serverless functions have ephemeral in-memory state
    );
  },
  handler: (_req, res) => {
    sendError(
      res,
      'TOO_MANY_REQUESTS',
      'Too many requests from this IP. Please try again later.',
      429
    );
  },
});
