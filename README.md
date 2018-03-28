# Fortnite-API on NodeJs Server
[![Build Status](https://travis-ci.org/SkYNewZ/rest-fornite-api.svg?branch=master)](https://travis-ci.org/SkYNewZ/rest-fornite-api)
[![codecov](https://codecov.io/gh/SkYNewZ/rest-fornite-api/branch/master/graph/badge.svg)](https://codecov.io/gh/SkYNewZ/rest-fornite-api)
[![Docker Pulls](https://img.shields.io/docker/pulls/skynewz/fortnite-api.svg)](https://hub.docker.com/r/skynewz/fortnite-api/)
[![](https://images.microbadger.com/badges/version/skynewz/fortnite-api.svg)](https://microbadger.com/images/skynewz/fortnite-api "Get your own version badge on microbadger.com")
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/QLemaire/2)

A simple NodeJS API under docker container to retrieve stats and infos from [Fortnite Game](https://www.epicgames.com/fortnite/fr/home) API.
See on [Docker Hub](https://hub.docker.com/r/skynewz/fortnite-api/).
Thanks to [qlaffont](https://github.com/qlaffont/fortnite-api) for doing this API.

## Example
You can found SwaggerUI here https://api.fortnite.lemairepro.fr/api-docs

## INIT
To setup this module, you need to have an account on Epic Games. After that you need to get 2 dedicated headers from Fortnite.

How to get these headers ?
- Install & Open [Fiddler 4](https://www.telerik.com/download/fiddler)
- In Tools -> Options -> HTTPS, Select Capture HTTPS Connects
- After that start your epic games launcher.
- You will see a request with */account/api/oauth/token*. Click on it and click after that on Inspectors get the header (Authorization header content and remove basic) => **This header is your Client Launcher Token**
- Launch Fortnite
- You will see again a request with */account/api/oauth/token*. Click on it and click after that on Inspectors get the header (Authorization header content and remove basic) => **This header is your Fortnite Client Token**

--------

## Start as docker container

### With REDIS
If you want to use a [Redis](https://hub.docker.com/_/redis/), use this [docker-compose.yml for example](https://github.com/SkYNewZ/rest-fornite-api/blob/master/docker-compose.yml) **replacing environements variables values by yours**.


### Without REDIS
```bash
$ docker run -d --restart=always \     
  -e LOGIN_EMAIL=EMAIL ACCOUNT \
  -e LOGIN_PASSWORD=PASSWORD \
  -e OAUTH_EPIC_LAUNCHER=CLIENT LAUNCHER TOKEN \
  -e OAUTH_FORTNITE=FORTNITE CLIENT TOKEN \
  -p 3000:3000
  skynewz/fortnite-api
```
This will listening on port 3000. You can check at http://localhost:3000/check

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
You can view endpoints at https://api.fortnite.lemairepro.fr/api-docs/

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/26750012?v=4" width="100px;"/><br /><sub><b>Quentin LEMAIRE</b></sub>](https://www.lemairepro.fr/)<br />[💻](https://github.com/SkYNewZ/rest-fornite-api/commits?author=SkYNewZ "Code") [📖](https://github.com/SkYNewZ/rest-fornite-api/commits?author=SkYNewZ "Documentation") [💡](#example-SkYNewZ "Examples") [🤔](#ideas-SkYNewZ "Ideas, Planning, & Feedback") [📦](#platform-SkYNewZ "Packaging/porting to new platform") [⚠️](https://github.com/SkYNewZ/rest-fornite-api/commits?author=SkYNewZ "Tests") | [<img src="https://avatars1.githubusercontent.com/u/24639184?v=4" width="100px;"/><br /><sub><b>Xewtwo</b></sub>](https://github.com/Xewtwo)<br />[🐛](https://github.com/SkYNewZ/rest-fornite-api/issues?q=author%3AXewtwo "Bug reports") [🤔](#ideas-Xewtwo "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/10044790?v=4" width="100px;"/><br /><sub><b>Quentin</b></sub>](http://qlaffont.com)<br />[💻](https://github.com/SkYNewZ/rest-fornite-api/commits?author=qlaffont "Code") [🤔](#ideas-qlaffont "Ideas, Planning, & Feedback") [⚠️](https://github.com/SkYNewZ/rest-fornite-api/commits?author=qlaffont "Tests") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->
