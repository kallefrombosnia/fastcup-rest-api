"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_cache_1 = __importDefault(require("memory-cache"));
/**
 * Define cache function
 * @param duration
 * @returns
 */
const cache = (duration) => {
    // Define middleware
    return (req, res, next) => {
        // Set unique key for this path
        let key = '__express__' + req.originalUrl || req.url;
        // Try to fetch value
        let cachedBody = memory_cache_1.default.get(key);
        // Check if cache exists
        if (cachedBody) {
            // Send cached response
            res.send(cachedBody);
            // Break here
            return;
        }
        else {
            // Reference send to the other function
            res.sendResponse = res.send;
            // Catch on send event
            res.send = (body) => {
                // Put body with specific url as a key
                memory_cache_1.default.put(key, body, duration * 1000);
                // Call send again without rebinding
                res.sendResponse(body);
            };
            // Continue with the request
            next();
        }
    };
};
exports.default = cache;
