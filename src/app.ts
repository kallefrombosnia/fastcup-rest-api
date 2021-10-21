import express from 'express';
import rateLimiter from 'express-rate-limit';
import config from './config.json'


import defaultRouter from './routes/default/router';
import csRouter from './routes/cs/router';
import csgoRouter from './routes/csgo/router';

// Init app
const app = express();

/**
 * Init requests limiter
 */
const limiter = rateLimiter({
    windowMs: config.rates.time * 1000,
    max: config.rates.requests,
    message: JSON.stringify({
        success: false,
        message: "api_limit_reached",
        data: {}
    })
});

// Use limiter on all endpoints
app.use(limiter);
  
// JSON format output
app.set('json spaces', 2)

// Prevent signed header by express etc
app.disable('x-powered-by')


/*
    PUBLIC ROUTES
*/

// Default router
app.use('/api', defaultRouter);

// CS 1.6 router
app.use('/api', csRouter);

// CSGO router
app.use('/api', csgoRouter);


/**
 * This is last route listener in stack, if this is reached return unknown route
 */
app.get('*', (req, res) =>{
    res.header(404).json({
        success: false,
        message: "unknown_route",
        data: {}
    });
});

// Start app and listen on web port
app.listen(config.express_port, () =>{
    console.log(`Web server started on port ${config.express_port}...`);
});