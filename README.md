# Fortnite-API on NodeJs Server
[![Build Status](https://travis-ci.org/SkYNewZ/rest-fornite-api.svg?branch=master)](https://travis-ci.org/SkYNewZ/rest-fornite-api)
[![codecov](https://codecov.io/gh/SkYNewZ/rest-fornite-api/branch/master/graph/badge.svg)](https://codecov.io/gh/SkYNewZ/rest-fornite-api)
[![Docker Pulls](https://img.shields.io/docker/pulls/skynewz/fortnite-api.svg)](https://hub.docker.com/r/skynewz/fortnite-api/)
[![](https://images.microbadger.com/badges/version/skynewz/fortnite-api.svg)](https://microbadger.com/images/skynewz/fortnite-api "Get your own version badge on microbadger.com")
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/QLemaire/2)
![Analytics](https://ga-beacon.appspot.com/UA-93941787-4/skynewz/rest-fornite-api?useReferer&pixel)
 
A simple NodeJS API under docker container to retrieve stats and infos from [Fortnite Game](https://www.epicgames.com/fortnite/fr/home) API.
See on [Docker Hub](https://hub.docker.com/r/skynewz/fortnite-api/).
Thanks to [qlaffont](https://github.com/qlaffont/fortnite-api) for doing this API.
 
## Example
You can found SwaggerUI here [https://skynewz-api-fortnite.herokuapp.com/api-docs](https://skynewz-api-fortnite.herokuapp.com/api-docs)
 
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
This will listening on port 3000. You can check at [http://localhost:3000/check](http://localhost:3000/check)
 
> **Note:**
> You can can the option -e PORT=1234 in order to use a custom port
 
## Start with nodejs
### Requirements
* Nodejs >= 8.9