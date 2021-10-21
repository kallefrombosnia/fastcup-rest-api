# FASTCUP API WRAPPER

## Idea
Main reason of creating this project is that developers couldn't use graphql to query backend and use it for own purposes.  
With this API wrapper you will be able to call standard querys which FASTCUP.net uses.

## Principle of work
Project uses Puppeteer headless Chromium automated browser, which browses and fetches info like a normal client.

**Why not direct query?**
If you send query directly, you will be blocked by CloudFlare protection. So we need to emulate normal user, which will do query.

## Terms of usage
Our public API is very restricted in terms of requests and caching. Main reason of this is not to be blocked by FASTCUP.net




## REST API

**Default info**

On public API this will be cached and updated on specific time periods!

For statistic like live info it will be 60 seconds, other routes is under 1H cache.

If there is any error, **success** will be **false**.

| ENDPOINT               | METHOD | RETURN                                               | NOTE |
|------------------------|--------|------------------------------------------------------|------|
| **api/default/gamestatus** | GET    | {"success":true,"message":"gamestatus","data":{...}} |  Cache: **1 minute**     |
| **api/default/gameguard**  | GET    | {"success":true,"message":"gameguard","data":{...}}  |   Cache: **1 minute**    |


**CS 1.6**
| ENDPOINT           | METHOD | RETURN                                           | NOTE |
|--------------------|--------|--------------------------------------------------|------|
| **api/cs/config**     |   GET  | {"success":true,"message":"config","data":{...}} |   Cache: **1 hour**   |
| **api/cs/modes**     |   GET  | {"success":true,"message":"modes","data":{...}}  |   Cache: **1 minute**   |
| **api/cs/statistic**   |   GET  | {"success":true,"message":"statistic","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/tournaments** |   GET  | {"success":true,"message":"tournaments","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/regions**     |   GET  | {"success":true,"message":"regions","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/leagues**     |   GET  | {"success":true,"message":"leagues","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/streamers**   |   GET  | {"success":true,"message":"streamers","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/servers**     |   GET  | {"success":true,"message":"servers","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/ranks**       |   GET  | {"success":true,"message":"ranks","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/ladder**      |   GET  | {"success":true,"message":"ladder","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/matches**      |   GET  | {"success":true,"message":"matches","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/:type/:value/info**      |   GET  | {"success":true,"message":"player_info","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/:id/:limit/nicknames**      |   GET  | {"success":true,"message":"nicknames","data":{...}}  |   Cache: **1 hour**    |
| **api/cs/:id/:limit/feed**      |   GET  | {"success":true,"message":"feed","data":{...}}  |   Cache: **1 hour**    |


**CS GO**
| ENDPOINT           | METHOD | RETURN                                           | NOTE |
|--------------------|--------|--------------------------------------------------|------|
| **api/csgo/config**     |   GET  | {"success":true,"message":"config","data":{...}} |   Cache: **1 hour**   |
| **api/csgo/modes**     |   GET  | {"success":true,"message":"modes","data":{...}}  |   Cache: **1 minute**   |
| **api/csgo/statistic**   |   GET  | {"success":true,"message":"statistic","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/tournaments** |   GET  | {"success":true,"message":"tournaments","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/regions**     |   GET  | {"success":true,"message":"regions","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/leagues**     |   GET  | {"success":true,"message":"leagues","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/streamers**   |   GET  | {"success":true,"message":"streamers","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/servers**     |   GET  | {"success":true,"message":"servers","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/ranks**       |   GET  | {"success":true,"message":"ranks","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/ladder**      |   GET  | {"success":true,"message":"ladder","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/matches**      |   GET  | {"success":true,"message":"matches","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/:type/:value/info**      |   GET  | {"success":true,"message":"player_info","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/:id/:limit/nicknames**      |   GET  | {"success":true,"message":"nicknames","data":{...}}  |   Cache: **1 hour**    |
| **api/csgo/:id/:limit/feed**      |   GET  | {"success":true,"message":"feed","data":{...}}  |   Cache: **1 hour**    |

**ERRORS**

*   **Limit reached**

    By default you have 10 requests in 60 seconds interval.
    ```json
    {
        "success": false,
        "message": "api_limit_reached",
        "data": {}
    }
    ```


*   **Response error**

    Browser will return error on JS fail or request fail!
    ```json
    {
        "success": false,
        "message": {event},
        "data": {}
    }
    ```

*   **Unknown route**

    Unknown route, returns 404 header.
    ```json
    {
        "success": false,
        "message": "unknown_route",
        "data": {}
    }
    ```

## Contribution 
All changes are welcome under pull requests.
Leave a :star: if you like this project!


## Issues
Leave an issue if you find something that is not working.

## License

MIT

