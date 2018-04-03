# Fortnite-API on NodeJs Server

[![Build Status](https://travis-ci.org/SkYNewZ/rest-fornite-api.svg?branch=master)](https://travis-ci.org/SkYNewZ/rest-fornite-api)
[![codecov](https://codecov.io/gh/SkYNewZ/rest-fornite-api/branch/master/graph/badge.svg)](https://codecov.io/gh/SkYNewZ/rest-fornite-api)
[![Docker Pulls](https://img.shields.io/docker/pulls/skynewz/fortnite-api.svg)](https://hub.docker.com/r/skynewz/fortnite-api/)
[![](https://images.microbadger.com/badges/version/skynewz/fortnite-api.svg)](https://microbadger.com/images/skynewz/fortnite-api "Get your own version badge on microbadger.com")
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/QLemaire/2)

## Example

You can found SwaggerUI here https://skynewz-api-fortnite.herokuapp.com/api-docs

## Authentification JWT
:warning: **This API is now with JWT authentification. [Send me an e-mail ](mailto:quentin@lemairepro.fr) to obtain a login and password in order to use this with a valid token** :warning:
For all the `/api` routes, you need to set the `Authorization; Bearer <token>` header.

## INIT

To setup this module, you need to have an account on Epic Games. After that you need to get 2 dedicated headers from Fortnite.

How to get these headers ?

* Install & Open [Fiddler 4](https://www.telerik.com/download/fiddler)
* In Tools -> Options -> HTTPS, Select Capture HTTPS Connects
* After that start your epic games launcher.
* You will see a request with _/account/api/oauth/token_. Click on it and click after that on Inspectors get the header (Authorization header content and remove basic) => **This header is your Client Launcher Token**
* Launch Fortnite
* You will see again a request with _/account/api/oauth/token_. Click on it and click after that on Inspectors get the header (Authorization header content and remove basic) => **This header is your Fortnite Client Token**

---

## Start with docker :whale:

You can use this [docker-compose.yml](https://github.com/SkYNewZ/rest-fornite-api/blob/master/docker-compose.yml) **replacing environements variables values by yours**. in order to startup this API.
Just download this file and `docker-compose up`

## Start with nodejs

### Requirements

* Nodejs >= 8.9
* Rename `.env.example` to `.env` and set your values for the environements variables :
```
LOGIN_EMAIL=Your epic games account
LOGIN_PASSWORD=Your epic games password
OAUTH_EPIC_LAUNCHER=See init part
OAUTH_FORTNITE=See init part
PGHOST=Postgres host
PGPORT=Postgres port
PGDATABASE=Postgres database
PGUSER=Postgres user
PGPASSWORD=Postgres password
```

### Start in developement mode

```bash
$ git clone https://github.com/SkYNewZ/rest-fornite-api
$ cd rest-fornite-api
# Run
$ npm run dev
```

### Start in production mode

```bash
$ git clone https://github.com/SkYNewZ/rest-fornite-api
$ cd rest-fornite-api
# build the TypeScript
$ npm run build
# Run
$ npm start
```

## Endpoint

Supported plateform : `pc`, `ps4`, `xb1`.
You can view endpoints at https://skynewz-api-fortnite.herokuapp.com/api-docs/

## Just for fun

[![Skynewz Stats](https://signature.stats-fortnite.com/pc/skynewz/signature.png)](https://stats-fortnite.com/battleroyale/profil/skynewz/pc)
