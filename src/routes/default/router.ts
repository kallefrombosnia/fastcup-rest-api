import express from 'express';
import routes from './routes.json';

const router = express.Router();

import {Browser} from '../../wrapper/browser';
import { message } from '../../helper/helper';

const browser = new Browser(false);

/**
 * 
 */
router.get('/default/statusgames', async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                routes.gamesstatus.URL, {waitUntil: 'networkidle0'}
            )

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
            
            return res.send(message(routes.gamesstatus.EVENT_NAME, data));

        })

    } catch (error: any) {
        return res.status(500).send(message(routes.gamesstatus.EVENT_NAME, error.toString(), false));
    }
});


router.get('/default/gameguard', async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                routes.gameguard.URL, {waitUntil: 'networkidle0'}
            )

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
            
            return res.send(message(routes.gameguard.EVENT_NAME, data));

        })

    } catch (error: any) {
        return res.status(500).send(message(routes.gameguard.EVENT_NAME, error.toString(), false));
    }
});



export default router;