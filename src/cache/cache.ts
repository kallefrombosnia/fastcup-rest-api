import mcache from 'memory-cache';
import {Request, Response, NextFunction} from 'express';


interface ResponseCustom extends Response{
    sendResponse: any;
}


/**
 * Define cache function
 * @param duration 
 * @returns 
 */
const cache = (duration: number): any => {

    // Define middleware
    return (req: Request, res: ResponseCustom, next: NextFunction) => {

        // Set unique key for this path
        let key = '__express__' + req.originalUrl || req.url

        // Try to fetch value
        let cachedBody = mcache.get(key)

        // Check if cache exists
        if (cachedBody) {
            
            // Send cached response
            res.send(cachedBody);

            // Break here
            return;
            
        } else {

            // Reference send to the other function
            res.sendResponse = res.send;
           
            // Catch on send event
            res.send = (body: string) : any => {

                // Put body with specific url as a key
                mcache.put(key, body, duration * 1000);

                // Call send again without rebinding
                res.sendResponse(body);
            }

            // Continue with the request
            next();
        }
    }
}

export default cache;