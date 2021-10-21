import express from 'express';


const router = express.Router();

import {Browser} from '../../wrapper/browser';
import { message } from '../../helper/helper';
import cache from '../../cache/cache';

const browser = new Browser();

/**
 * 
 */
router.get('/csgo/config', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetConfig",
                                            query: "query GetConfig {\n  config {\n    key\n    value\n    __typename\n  }\n}\n",
                                            variables: {}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('config', data));

        })

    } catch (error) {
        return res.status(500).send(message('config', (error as Error).toString(), false));
    }
});


router.get('/csgo/modes', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetGameDetails",
                                            query: "query GetGameDetails($gameID: smallint!) {\n  game_match_modes(\n    where: {game_id: {_eq: $gameID}}\n    order_by: [{team_size: desc}, {disabled: asc}]\n  ) {\n    id\n    name_ru\n    name_uk\n    name_en\n    name_de\n    name_pl\n    name_pt\n    name_es\n    name_hbs\n    name_tr\n    description_ru\n    description_uk\n    description_en\n    description_de\n    description_pl\n    description_pt\n    description_es\n    description_hbs\n    description_tr\n    team_size\n    disabled\n    ranked\n    __typename\n  }\n  maps(\n    where: {game_id: {_eq: $gameID}}\n    order_by: [{matches_count: desc}, {disabled: asc}]\n  ) {\n    id\n    raw_name\n    name\n    type\n    disabled\n    matches_count\n    matchmaking_enabled\n    workshop_id\n    __typename\n  }\n}\n",
                                            variables: {gameID: 3}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('modes', data));

        })

    } catch (error) {
        return res.status(500).send(message('modes', (error as Error).toString(), false));
    }
});



router.get('/csgo/statistic', cache(60),  async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetStatisticsTotal",
                                            query: "query GetStatisticsTotal($gameID: smallint!) {\n  statisticsTotal: statistics_total_by_pk(game_id: $gameID) {\n    matchesLiveCount: matches_live\n    matchesCreatedCount: matches_created\n    matchesCount: matches\n    usersPlayedCount: users_played\n    usersOnlineCount: users_online\n    usersInSearch: users_insearch\n    usersIngameCount: users_ingame\n    __typename\n  }\n}\n",
                                            variables: {gameID: 3}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('statistic', data));

        })

    } catch (error) {
        return res.status(500).send(message('statistic', (error as Error).toString(), false));
    }
});


router.get('/csgo/tournaments', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetFutureTournaments",
                                            query: "query GetFutureTournaments($gameID: smallint!) {\n  tournaments(\n    where: {game_id: {_eq: $gameID}, state: {_in: [\"REGISTRATION\", \"ACTIVE\"]}, visible: {_eq: true}}\n    order_by: {first_stage_scheduled_at: asc}\n    limit: 4\n  ) {\n    id\n    name\n    slots\n    prize_fund\n    logo\n    invitation_only\n    state\n    active_rosters\n    first_stage_scheduled_at\n    gameMode {\n      id\n      name_en\n      __typename\n    }\n    serverRegions {\n      server_region_id\n      __typename\n    }\n    __typename\n  }\n}\n",
                                            variables: {gameID: 3}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('tournaments', data));

        })

    } catch (error) {
        return res.status(500).send(message('tournaments', (error as Error).toString(), false));
    }
});


router.get('/csgo/regions', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetServerRegions",
                                            query: "query GetServerRegions($gameID: smallint!) {\n  serverRegions: server_regions(\n    where: {game_settings: {}}\n    order_by: {city: {country_id: asc}}\n  ) {\n    id\n    city {\n      id\n      name_ru\n      name_uk\n      name_en\n      name_de\n      name_pl\n      name_pt\n      name_es\n      name_hbs\n      name_tr\n      country {\n        id\n        name_ru\n        name_uk\n        name_en\n        name_de\n        name_pl\n        name_pt\n        name_es\n        name_hbs\n        name_tr\n        iso2\n        __typename\n      }\n      __typename\n    }\n    pingUrl: ping_url\n    gameSettings: game_settings(where: {game_id: {_eq: $gameID}}) {\n      visible\n      disabled\n      name\n      gameID: game_id\n      __typename\n    }\n    pingResponseRequired: ping_response_required\n    lokiFilterName: loki_filter_name\n    clusterID: gameflare_cluster_id\n    clientRequired: client_required\n    __typename\n  }\n}\n",
                                            variables: {gameID: 3}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('regions', data));

        })

    } catch (error) {
        return res.status(500).send(message('regions', (error as Error).toString(), false));
    }
});


router.get('/csgo/leagues', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetLeaguesTop",
                                            query: "fragment LeaguesTopSeasonInfo on league_seasons {\n  id\n  starts_at\n  finishes_at\n  prize_fund\n  divisions(order_by: {rankMin: {rating_min: asc}}) {\n    prize_fund\n    globalDivision {\n      id\n      name\n      __typename\n    }\n    rankMin {\n      rating_min\n      __typename\n    }\n    rankMax {\n      rating_min\n      __typename\n    }\n    ladders(where: {type: {_eq: \"MONTHLY\"}}, order_by: {starts_at: asc}, limit: 1) {\n      id\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nquery GetLeaguesTop($gameID: smallint!, $now: timestamptz!) {\n  leagues(\n    order_by: {id: desc}\n    where: {game_id: {_eq: $gameID}, seasons: {divisions: {}}}\n  ) {\n    id\n    name_ru\n    name_en\n    organizer {\n      name\n      __typename\n    }\n    gameMode {\n      id\n      name_en\n      __typename\n    }\n    current_season: seasons(\n      where: {starts_at: {_lte: $now}, finishes_at: {_gte: $now}}\n      order_by: {id: desc}\n      limit: 1\n    ) {\n      ...LeaguesTopSeasonInfo\n      __typename\n    }\n    last_season: seasons(order_by: {id: desc}, limit: 1) {\n      ...LeaguesTopSeasonInfo\n      __typename\n    }\n    __typename\n  }\n}\n",
                                            variables: {gameID: 3, now: new Date().toISOString()}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('leagues', data));

        })

    } catch (error) {
        return res.status(500).send(message('leagues', (error as Error).toString(), false));
    }
});


router.get('/csgo/streamers', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetStreamsForHomePage",
                                            query: "query GetStreamsForHomePage($gameID: smallint!) {\n  streams: user_streams(\n    where: {game_id: {_eq: $gameID}, online: {_eq: true}}\n    order_by: {viewers: desc}\n  ) {\n    id\n    name\n    description\n    viewers\n    preview\n    user {\n      id\n      nickName: nick_name\n      link\n      city {\n        id\n        name_ru\n        name_uk\n        name_en\n        name_de\n        name_pl\n        name_pt\n        name_es\n        name_hbs\n        name_tr\n        __typename\n      }\n      country {\n        id\n        name_ru\n        name_uk\n        name_en\n        name_de\n        name_pl\n        name_pt\n        name_es\n        name_hbs\n        name_tr\n        iso2\n        __typename\n      }\n      __typename\n    }\n    service {\n      id\n      name\n      rawName: raw_name\n      __typename\n    }\n    __typename\n  }\n}\n",
                                            variables: {gameID: 3}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('streamers', data));

        })

    } catch (error) {
        return res.status(500).send(message('streamers', (error as Error).toString(), false));
    }
});


router.get('/csgo/servers', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetModServersForHomePage",
                                            query: "query GetModServersForHomePage($gameID: smallint!) {\n  modServers: mod_servers(\n    where: {game_id: {_eq: $gameID}, mod: {name: {_eq: \"CSDM\"}}}\n  ) {\n    id\n    ip\n    regionID: server_region_id\n    __typename\n  }\n}\n",
                                            variables: {gameID: 3}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('servers', data));

        })

    } catch (error) {
        return res.status(500).send(message('servers', (error as Error).toString(), false));
    }
});



router.get('/csgo/ranks', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetRanks",
                                            query: "query GetRanks($gameModeID: smallint!) {\n  ranks(where: {game_mode_id: {_eq: $gameModeID}}, order_by: {rating_min: desc}) {\n    id\n    name\n    ratingMin: rating_min\n    __typename\n  }\n}\n",
                                            variables: {gameModeID: 7}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('ranks', data));

        })

    } catch (error) {
        return res.status(500).send(message('ranks', (error as Error).toString(), false));
    }
});



router.get('/csgo/ladder', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetLeaguesTopLadderStats",
                                            query: "query GetLeaguesTopLadderStats($ladderID: Int!, $gameModeID: smallint!) {\n  league_ladder_stats(\n    where: {ladder_id: {_eq: $ladderID}}\n    order_by: {place: asc}\n    limit: 5\n  ) {\n    place\n    points\n    matches_won\n    matches_lost\n    user {\n      ...UserCommon\n      ...UserGeo\n      matchMemberships(\n        where: {rating_diff: {_is_null: false}, match_cancelled: {_eq: false}, game_mode_id: {_eq: $gameModeID}}\n        order_by: {match_id: desc}\n        limit: 10\n      ) {\n        private {\n          rating\n          __typename\n        }\n        rating_diff\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment UserCommon on users {\n  id\n  nickName: nick_name\n  avatar\n  online\n  isMobile: is_mobile\n  link\n  __typename\n}\n\nfragment UserGeo on users {\n  city {\n    id\n    regionID: region_id\n    name_ru\n    name_uk\n    name_en\n    name_de\n    name_pl\n    name_pt\n    name_es\n    name_hbs\n    name_tr\n    __typename\n  }\n  country {\n    id\n    name_ru\n    name_uk\n    name_en\n    name_de\n    name_pl\n    name_pt\n    name_es\n    name_hbs\n    name_tr\n    iso2\n    __typename\n  }\n  __typename\n}\n",
                                            variables: {gameModeID: 6, ladderID: 551}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('ladder', data));

        })

    } catch (error) {
        return res.status(500).send(message('ladder', (error as Error).toString(), false));
    }
});


router.get('/csgo/matches', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{
            
            await page.goto(
                'https://csgo.fastcup.net/', {waitUntil: 'networkidle0'}
            )

            const data = await page.evaluate(async () => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetCreatedMatches",
                                            query: "query GetCreatedMatches($gameID: smallint!) {\n  matches(\n    where: {game_id: {_eq: $gameID}, status: {_eq: \"CREATED\"}, type: {_neq: \"TOURNAMENT\"}}\n    order_by: {created_at: desc}\n  ) {\n    id\n    type\n    password\n    created_at\n    game_mode_id\n    server_region_id\n    fake_server_region_id\n    anticheat_enabled\n    best_of\n    readiness_passed\n    creator {\n      id\n      nick_name\n      avatar\n      stats(\n        where: {game_id: {_eq: $gameID}, map_id: {_is_null: true}, game_mode_id: {_is_null: false}}\n      ) {\n        game_mode_id\n        rating\n        __typename\n      }\n      __typename\n    }\n    maps {\n      id\n      map_id\n      __typename\n    }\n    members_aggregate {\n      aggregate {\n        count\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n",
                                            variables: {gameID: 3}
                                        }),
                                    }).then(res => res.json());

                return response;
            });

            // Close current tab
            await page.close();
            
            return res.send(message('matches', data));

        })

    } catch (error) {
        return res.status(500).send(message('matches', (error as Error).toString(), false));
    }
});


router.get('/csgo/player/:type/:id/info', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{

            await page.goto(
                `https://csgo.fastcup.net/`, {waitUntil: 'networkidle0'}
            )

            // Get user id
            const type = req.params.type;
            const value = req.params.id;

            // Fake returned object
            let data: string = '{}';

            if(['id', 'steamid', 'link'].includes(type)){

                let data = await page.evaluate(async (value : string, type: string) => {

                    let custom: any = {};
    
                    custom[type] = value;
    
                    const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                            method: 'POST',
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({
                                                operationName: "GetUser",
                                                query: "query GetUser($gameID: smallint!, $id: Int, $link: String, $steamID: Int) {\n  users(\n    where: {id: {_eq: $id}, link: {_eq: $link}, steam_id: {_eq: $steamID}}\n    limit: 1\n  ) {\n    id\n    ...UserCommon\n    ...UserStats\n    ...UserBan\n    ...UserGeo\n    steamID: steam_id\n    blacklisted {\n      targetUserID: target_user_id\n      userID: user_id\n      __typename\n    }\n    isMeBlacklisted {\n      targetUserID: target_user_id\n      userID: user_id\n      private {\n        reason\n        __typename\n      }\n      __typename\n    }\n    firstName: first_name\n    lastName: last_name\n    gender\n    birthday\n    lastActivity: last_activity\n    createdAt: created_at\n    friendsCount: friends_count\n    friends(where: {state: {_eq: \"ACCEPTED\"}}, order_by: {date: desc}, limit: 5) {\n      ...Friend\n      __typename\n    }\n    streams(where: {game_id: {_eq: $gameID}}, limit: 1) {\n      id\n      name\n      followers\n      views\n      viewers\n      online\n      service {\n        id\n        name\n        rawName: raw_name\n        __typename\n      }\n      source\n      chatID: chat_id\n      __typename\n    }\n    matchMemberships(\n      where: {match: {status: {_in: [\"CREATED\", \"LIVE\"]}}, finished: {_eq: false}, game_id: {_eq: $gameID}}\n      limit: 1\n    ) {\n      kills\n      deaths\n      assists\n      finished\n      match_id\n      match {\n        status\n        type\n        readiness_passed\n        game_status\n        teams(order_by: {id: asc}) {\n          size\n          score\n          __typename\n        }\n        created_at\n        started_at\n        best_of\n        maps(order_by: {number: asc}) {\n          map {\n            id\n            name\n            raw_name\n            __typename\n          }\n          game_status\n          __typename\n        }\n        serverInstance {\n          ip\n          tv_port\n          __typename\n        }\n        gameMode {\n          id\n          name_en\n          __typename\n        }\n        tv_address_hidden\n        __typename\n      }\n      __typename\n    }\n    teamMemberships(\n      where: {game_id: {_eq: $gameID}, accepted_at: {_is_null: false}, finished_at: {_is_null: true}}\n    ) {\n      team {\n        id\n        name\n        logo\n        tag\n        verified\n        country {\n          id\n          iso2\n          name_ru\n          name_uk\n          name_en\n          name_de\n          name_pl\n          name_pt\n          name_es\n          name_hbs\n          name_tr\n          __typename\n        }\n        members(\n          where: {game_id: {_eq: $gameID}, accepted_at: {_is_null: false}, finished_at: {_is_null: true}}\n        ) {\n          user {\n            ...UserCommon\n            ...UserStats\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    verified\n    vkID: vk_id\n    fbID: fb_id\n    twitchID: twitch_id\n    instagramID: instagram_id\n    privacyFeedWrite: privacy_feed_write\n    __typename\n  }\n}\n\nfragment UserCommon on users {\n  id\n  nickName: nick_name\n  avatar\n  online\n  isMobile: is_mobile\n  link\n  __typename\n}\n\nfragment UserStats on users {\n  stats(\n    where: {game_id: {_eq: $gameID}, map_id: {_is_null: true}, game_mode_id: {_is_null: false}}\n  ) {\n    gameModeID: game_mode_id\n    rating\n    place\n    kills\n    deaths\n    __typename\n  }\n  __typename\n}\n\nfragment UserBan on users {\n  bans(\n    where: {active: {_eq: true}, game_id: {_eq: $gameID}}\n    order_by: {until: desc}\n  ) {\n    id\n    since\n    until\n    reason {\n      id\n      name_ru\n      name_uk\n      name_en\n      name_de\n      name_pl\n      name_pt\n      name_es\n      name_hbs\n      name_tr\n      description_ru\n      description_uk\n      description_en\n      description_de\n      description_pl\n      description_pt\n      description_es\n      description_hbs\n      description_tr\n      restrictions\n      __typename\n    }\n    comment\n    __typename\n  }\n  __typename\n}\n\nfragment Friend on friends {\n  userID: user_id\n  friendID: friend_id\n  date\n  state\n  user {\n    ...UserCommon\n    ...UserStats\n    ...UserLastActiveBan\n    __typename\n  }\n  __typename\n}\n\nfragment UserLastActiveBan on users {\n  bans(\n    where: {active: {_eq: true}, game_id: {_eq: $gameID}}\n    order_by: {length_minutes: desc}\n    limit: 1\n  ) {\n    id\n    since\n    until\n    __typename\n  }\n  __typename\n}\n\nfragment UserGeo on users {\n  city {\n    id\n    regionID: region_id\n    name_ru\n    name_uk\n    name_en\n    name_de\n    name_pl\n    name_pt\n    name_es\n    name_hbs\n    name_tr\n    __typename\n  }\n  country {\n    id\n    name_ru\n    name_uk\n    name_en\n    name_de\n    name_pl\n    name_pt\n    name_es\n    name_hbs\n    name_tr\n    iso2\n    __typename\n  }\n  __typename\n}\n",
                                                variables: {gameID: 3, ...custom}
                                            }),
                                        }).then(res => res.json());
    
                    return response;
                }, value, type);

                // Close current tab
                await page.close();
                
                return res.send(message('player_info', data));

            }else{

                // Close current tab
                await page.close();
                    
                return res.send(message('player_info', data));
            }

        })

    } catch (error) {
        return res.status(500).send(message('player_info', (error as Error).toString(), false));
    }
});



router.get('/csgo/player/:id/:limit/nicknames', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{

            await page.goto(
                `https://csgo.fastcup.net/`, {waitUntil: 'networkidle0'}
            )

            // Get user id
            const value = req.params.id;
            const limit = parseFloat(req.params.limit);

            let data = await page.evaluate(async (value : string, limit: number) => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetUserNickNameEdits",
                                            query: "query GetUserNickNameEdits($userID: Int!, $limit: Int!, $createdAtLt: timestamptz) {\n  userNickNameEdits: user_nick_name_edits(\n    where: {user_id: {_eq: $userID}, created_at: {_lt: $createdAtLt}}\n    order_by: {created_at: desc}\n    limit: $limit\n  ) {\n    nickName: nick_name\n    createdAt: created_at\n    __typename\n  }\n}\n",
                                            variables: {userID: value, limit: limit}
                                        }),
                                    }).then(res => res.json());

                return response;
            }, value, limit);

            // Close current tab
            await page.close();
            
            return res.send(message('nicknames', data));

        })

    } catch (error) {
        return res.status(500).send(message('nicknames', (error as Error).toString(), false));
    }
});



router.get('/cs/player/:id/:limit/feed', cache(3600), async (req, res) =>{


    try {

        browser.page().then( async (page: any) =>{

            await page.goto(
                `https://cs.fastcup.net/`, {waitUntil: 'networkidle0'}
            )

            // Get user id
            const value = req.params.id;
            const limit = parseFloat(req.params.limit);

            let data = await page.evaluate(async (value : string, limit: number) => {

                const response = await fetch('https://hasura.fastcup.net/v1/graphql', {
                                        method: 'POST',
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            operationName: "GetUserFeed",
                                            query: "query GetUserFeed($userID: Int!, $gameID: smallint!, $limit: Int!, $idLt: Int) {\n  userFeed: user_feed(\n    where: {user_id: {_eq: $userID}, parent_post_id: {_is_null: true}, id: {_lt: $idLt}}\n    order_by: {id: desc}\n    limit: $limit\n  ) {\n    ...FeedPost\n    comments(order_by: {id: desc}, limit: 3) {\n      ...FeedPost\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment FeedPost on user_feed {\n  id\n  userID: user_id\n  parentPostID: parent_post_id\n  author {\n    ...UserCommon\n    ...UserStats\n    ...UserLastActiveBan\n    __typename\n  }\n  date\n  text\n  likesCount: likes_count\n  myLikes {\n    post_id\n    user_id\n    __typename\n  }\n  replyTo {\n    id\n    author {\n      ...UserCommon\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment UserCommon on users {\n  id\n  nickName: nick_name\n  avatar\n  online\n  isMobile: is_mobile\n  link\n  __typename\n}\n\nfragment UserStats on users {\n  stats(\n    where: {game_id: {_eq: $gameID}, map_id: {_is_null: true}, game_mode_id: {_is_null: false}}\n  ) {\n    gameModeID: game_mode_id\n    rating\n    place\n    kills\n    deaths\n    __typename\n  }\n  __typename\n}\n\nfragment UserLastActiveBan on users {\n  bans(\n    where: {active: {_eq: true}, game_id: {_eq: $gameID}}\n    order_by: {length_minutes: desc}\n    limit: 1\n  ) {\n    id\n    since\n    until\n    __typename\n  }\n  __typename\n}\n",
                                            variables: {userID: value, limit: limit, gameID: 3}
                                        }),
                                    }).then(res => res.json());

                return response;
            }, value, limit);

            // Close current tab
            await page.close();
            
            return res.send(message('feed', data));

        })

    } catch (error) {
        return res.status(500).send(message('feed', (error as Error).toString(), false));
    }
});


export default router;