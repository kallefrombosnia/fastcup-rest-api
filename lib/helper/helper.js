"use strict";
/**
 * Craft outgoing message
 * @param event
 * @param success
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = void 0;
exports.message = (event, data, success = true) => {
    // Return JSON object stringified
    return JSON.stringify({
        success,
        message: event,
        data
    });
};
