import puppeteer, {PuppeteerNode} from 'puppeteer';


export interface Browser extends PuppeteerNode{
    instance: any;
    headless: boolean;
}


/**
 * Browser class
 */
export class Browser{

    constructor(headless: boolean = true){

        // Launch browser
        this.instance = '';
        this.headless = headless;

        this.launchBrowser().then(context =>{
            this.instance = context;
        }).catch((error) =>{
            throw new Error(`Launch error: ${error.toString()}`);
        })
        
    }

    /**
     * Launchs new context of browser
     * 
     * @returns Promise
     */
    async launchBrowser(){

        return new Promise( async(resolve,reject)=>{

            try {

                // Create new browser instance
                const instance = await puppeteer.launch({
                    headless: this.headless, 
                    ignoreHTTPSErrors: true,
                    args: ['--no-sandbox','--disable-setuid-sandbox']
                });

                const context = await instance.createIncognitoBrowserContext();

                // Resolve with context
                resolve(context);

            } catch (error) {

                // Reject with error
                reject(error);
            }
        }); 
    };


    /**
     * 
     * Launch a new browser page
     * 
     * @returns Promise
     */
    async page(){

        return new Promise( async(resolve,reject)=>{

            try {

                // Create new browser page
                const newpage = await this.instance.newPage();

                // Resolve with new page
                resolve(newpage);

            }catch(error){

                // Reject with error
                reject(error);
            }

        })
        
    }

}




