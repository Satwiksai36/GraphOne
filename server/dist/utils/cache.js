"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = exports.flushCache = exports.deleteCache = exports.setCache = exports.getCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const response_1 = require("./response");
// Cache instance with default TTL of 5 minutes (300 seconds)
const cache = new node_cache_1.default({ stdTTL: 300, checkperiod: 60 });
const getCache = (key) => {
    return cache.get(key);
};
exports.getCache = getCache;
const setCache = (key, value, ttl = 300) => {
    return cache.set(key, value, ttl);
};
exports.setCache = setCache;
const deleteCache = (key) => {
    return cache.del(key);
};
exports.deleteCache = deleteCache;
const flushCache = () => {
    cache.flushAll();
};
exports.flushCache = flushCache;
/**
 * Express middleware to cache GET requests by request URL path.
 * Cached items have a TTL of 5 minutes (300s).
 */
const cacheMiddleware = (ttl = 300) => {
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }
        const key = req.originalUrl || req.url;
        const cachedResponse = cache.get(key);
        if (cachedResponse) {
            console.log(`⚡ Cache hit for: ${key}`);
            (0, response_1.sendSuccess)(res, cachedResponse, 'Data fetched from cache', 200);
            return;
        }
        console.log(`📥 Cache miss for: ${key}. Fetching from DB...`);
        // Override res.json to capture response body and store in cache
        const originalJson = res.json;
        res.json = function (body) {
            // Only cache success responses
            if (body && body.success === true && body.data) {
                cache.set(key, body.data, ttl);
            }
            return originalJson.call(this, body);
        };
        next();
    };
};
exports.cacheMiddleware = cacheMiddleware;
