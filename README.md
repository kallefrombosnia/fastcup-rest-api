# FASTCUP API WRAPPER

## Idea
Main reason of creating this project is that developers couldn't use graphql to query backend and use it for own purposes.  
With this API wrapper you will be able to call standard querys which FASTCUP.net uses.

## Principle of work
Project uses Puppeteer headless Chromium automated browser, which browses and fetches info like a normal client.

**Why not direct query?**
If you send query directly, you will be blocked by CloudFlare protection. So we need to emulate normal user, which will do query.


## REST API

**Default info**

On public API this will be cached and updated every minute!  

If there is any error, **success** will be **false**.

| ENDPOINT               | METHOD | RETURN                                               | NOTE |
|------------------------|--------|------------------------------------------------------|------|
| **api/default/gamestatus** | GET    | {"success":true,"message":"gamestatus","data":{...}} |      |
| **api/default/gameguard**  | GET    | {"success":true,"message":"gameguard","data":{...}}  |      |


**CS 1.6**
| ENDPOINT           | METHOD | RETURN                                           | NOTE |
|--------------------|--------|--------------------------------------------------|------|
| **api/cs/config**     |   GET  | {"success":true,"message":"config","data":{...}} |      |
| **api/cs/modes**     |   GET  | {"success":true,"message":"modes","data":{...}}  |      |
| **api/cs/statistic**   |   GET  | {"success":true,"message":"statistic","data":{...}}  |      |
| **api/cs/tournaments** |   GET  | {"success":true,"message":"tournaments","data":{...}}  |      |
| **api/cs/regions**     |   GET  | {"success":true,"message":"regions","data":{...}}  |      |
| **api/cs/leagues**     |   GET  | {"success":true,"message":"leagues","data":{...}}  |      |
| **api/cs/streamers**   |   GET  | {"success":true,"message":"streamers","data":{...}}  |      |
| **api/cs/servers**     |   GET  | {"success":true,"message":"servers","data":{...}}  |      |
| **api/cs/ranks**       |   GET  | {"success":true,"message":"ranks","data":{...}}  |      |
| **api/cs/ladder**      |   GET  | {"success":true,"message":"ladder","data":{...}}  |      |
| **api/cs/matches**      |   GET  | {"success":true,"message":"matches","data":{...}}  |      |

