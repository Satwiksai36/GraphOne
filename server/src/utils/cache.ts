import NodeCache from 'node-cache';
import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from './response';

// Cache instance with default TTL of 5 minutes (300 seconds)
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

export const getCache = (key: string): any => {
  return cache.get(key);
};

export const setCache = (key: string, value: any, ttl = 300): boolean => {
  return cache.set(key, value, ttl);
};

export const deleteCache = (key: string | string[]): number => {
  return cache.del(key);
};

export const flushCache = (): void => {
  cache.flushAll();
};

/**
 * Express middleware to cache GET requests by request URL path.
 * Cached items have a TTL of 5 minutes (300s).
 */
export const cacheMiddleware = (ttl = 300) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      console.log(`⚡ Cache hit for: ${key}`);
      sendSuccess(res, cachedResponse, 'Data fetched from cache', 200);
      return;
    }

    console.log(`📥 Cache miss for: ${key}. Fetching from DB...`);
    
    // Override res.json to capture response body and store in cache
    const originalJson = res.json;
    res.json = function (body: any): Response {
      // Only cache success responses
      if (body && body.success === true && body.data) {
        cache.set(key, body.data, ttl);
      }
      return originalJson.call(this, body);
    };

    next();
  };
};
