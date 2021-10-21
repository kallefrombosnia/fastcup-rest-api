"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Browser = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
/**
 * Browser class
 */
class Browser {
    constructor(headless = true) {
        // Launch browser
        this.instance = '';
        this.headless = headless;
        this.launchBrowser().then(context => {
            this.instance = context;
        }).catch((error) => {
            throw new Error(`Launch error: ${error.toString()}`);
        });
    }
    /**
     * Launchs new context of browser
     *
     * @returns Promise
     */
    async launchBrowser() {
        return new Promise(async (resolve, reject) => {
            try {
                // Create new browser instance
                const instance = await puppeteer_1.default.launch({
                    headless: this.headless,
                    ignoreHTTPSErrors: true,
                });
                const context = await instance.createIncognitoBrowserContext();
                // Resolve with context
                resolve(context);
            }
            catch (error) {
                // Reject with error
                reject(error);
            }
        });
    }
    ;
    /**
     *
     * Launch a new browser page
     *
     * @returns Promise
     */
    async page() {
        return new Promise(async (resolve, reject) => {
            try {
                // Create new browser page
                const newpage = await this.instance.newPage();
                // Resolve with new page
                resolve(newpage);
            }
            catch (error) {
                // Reject with error
                reject(error);
            }
        });
    }
}
exports.Browser = Browser;
