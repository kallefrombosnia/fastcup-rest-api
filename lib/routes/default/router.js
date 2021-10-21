"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const browser_1 = require("../../wrapper/browser");
const helper_1 = require("../../helper/helper");
const cache_1 = __importDefault(require("../../cache/cache"));
const browser = new browser_1.Browser();
/**
 *
 */
router.get('/default/statusgames', cache_1.default(60), async (req, res) => {
    try {
        browser.page().then(async (page) => {
            await page.goto('https://fastcup.net/', { waitUntil: 'networkidle0' });
            const data = await page.evaluate(async () => {
                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        operationName: "GetGamesWithStats",
                        query: "query GetGamesWithStats {\n  games(order_by: {stats: {matches: desc}}) {\n    id\n    name\n    shortName: short_name\n    rawName: raw_name\n    disabled\n    stats {\n      matchesLive: matches_live\n      usersInGame: users_ingame\n      __typename\n    }\n    __typename\n  }\n}\n",
                        variables: {}
                    }),
                }).then(res => res.json());
                return response;
            });
            // Close current tab
            await page.close();
            return res.send(helper_1.message('gamestatus', data));
        });
    }
    catch (error) {
        return res.status(500).send(helper_1.message('gamestatus', error.toString(), false));
    }
});
router.get('/default/gameguard', cache_1.default(60), async (req, res) => {
    try {
        browser.page().then(async (page) => {
            await page.goto('https://gameguard.ac/', { waitUntil: 'networkidle0' });
            const data = await page.evaluate(async () => {
                const response = await fetch('https://api.gameguard.ac/', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        operationName: "Counters",
                        query: "query Counters {\n  serversProtected\n  usersOnline\n  usersBanned\n}\n",
                        variables: {}
                    }),
                }).then(res => res.json());
                return response;
            });
            // Close current tab
            await page.close();
            return res.send(helper_1.message('gameguard', data));
        });
    }
    catch (error) {
        return res.status(500).send(helper_1.message('gameguard', error.toString(), false));
    }
});
exports.default = router;
