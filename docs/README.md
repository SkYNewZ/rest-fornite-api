  -e LOGIN_PASSWORD=PASSWORD \
  -e OAUTH_EPIC_LAUNCHER=CLIENT LAUNCHER TOKEN \
  -e OAUTH_FORTNITE=FORTNITE CLIENT TOKEN \
  -p 3000:3000
  skynewz/fortnite-api
```
This will listening on port 3000. You can check at [http://localhost:3000/check](http://localhost:3000/check)
 
> **Note:**
> You can can the option -e PORT=1234 in order to use a custom port
 
## Start with nodejs
### Requirements
* Nodejs >= 8.9
> **Note:**
> You can can the option environements variable PORT=1234 in order to use a custom port
 
### Start in developement mode
```bash
$ git clone https://github.com/SkYNewZ/rest-fornite-api
$ cd rest-fornite-api
# write a .env file with you credentials from abose
$ vim .env
# Run
$ npm run start-dev
```
 
### Start in production mode
```bash
$ git clone https://github.com/SkYNewZ/rest-fornite-api
$ cd rest-fornite-api
# write a .env file with you credentials from abose
$ vim .env
# build the TypeScript
$ npm run build
# Run
$ npm start
```
 
## Endpoint
Supported plateform : `pc`, `ps4`, `xb1`.
You can view endpoints at [https://skynewz-api-fortnite.herokuapp.com/api-docs](https://skynewz-api-fortnite.herokuapp.com/api-docs)