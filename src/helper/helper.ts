
/**
 * Craft outgoing message
 * @param event 
 * @param success 
 */

export const message = (event: string, data: string, success: boolean = true) : string =>{

    // Return JSON object stringified
    return JSON.stringify({
        success,
        message: event,
        data
    })
}