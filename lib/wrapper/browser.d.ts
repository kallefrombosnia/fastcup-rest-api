import { PuppeteerNode } from 'puppeteer';
export interface Browser extends PuppeteerNode {
    instance: any;
    headless: boolean;
}
/**
 * Browser class
 */
export declare class Browser {
    constructor(headless?: boolean);
    /**
     * Launchs new context of browser
     *
     * @returns Promise
     */
    launchBrowser(): Promise<unknown>;
    /**
     *
     * Launch a new browser page
     *
     * @returns Promise
     */
    page(): Promise<unknown>;
}
