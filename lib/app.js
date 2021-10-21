"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_json_1 = __importDefault(require("./config.json"));
const router_1 = __importDefault(require("./routes/default/router"));
const router_2 = __importDefault(require("./routes/cs/router"));
const router_3 = __importDefault(require("./routes/csgo/router"));
// Init app
const app = express_1.default();
/**
 * Init requests limiter
 */
const limiter = express_rate_limit_1.default({
    windowMs: config_json_1.default.rates.time * 1000,
    max: config_json_1.default.rates.requests,
    message: JSON.stringify({
        success: false,
        message: "api_limit_reached",
        data: {}
    })
});
// Use limiter on all endpoints
app.use(limiter);
// JSON format output
app.set('json spaces', 2);
// Prevent signed header by express etc
app.disable('x-powered-by');
/*
    PUBLIC ROUTES
*/
// Default router
app.use('/api', router_1.default);
// CS 1.6 router
app.use('/api', router_2.default);
// CSGO router
app.use('/api', router_3.default);
/**
 * This is last route listener in stack, if this is reached return unknown route
 */
app.get('*', (req, res) => {
    res.header(404).json({
        success: false,
        message: "unknown_route",
        data: {}
    });
});
// Start app and listen on web port
const listener = app.listen(process.env.PORT || config_json_1.default.express_port || 3000, () => {
    console.log(`Web server started on port ${listener.address().port}...`);
});
