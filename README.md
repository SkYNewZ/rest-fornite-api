# Fortnite-API on NodeJs Server
[![Build Status](https://travis-ci.org/SkYNewZ/REST-Fornite-api.svg?branch=master)](https://travis-ci.org/SkYNewZ/REST-Fornite-api)
[![codecov](https://codecov.io/gh/SkYNewZ/REST-Fornite-api/branch/master/graph/badge.svg)](https://codecov.io/gh/SkYNewZ/REST-Fornite-api)
[![Docker Pulls](https://img.shields.io/docker/pulls/skynewz/fortnite-api.svg)](https://hub.docker.com/r/skynewz/fortnite-api/)
[![](https://images.microbadger.com/badges/image/skynewz/fortnite-api.svg)](https://microbadger.com/images/skynewz/fortnite-api "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/skynewz/fortnite-api.svg)](https://microbadger.com/images/skynewz/fortnite-api "Get your own version badge on microbadger.com")

A simple NodeJS API under docker container to retrieve stats and infos from [Fortnite Game](https://www.epicgames.com/fortnite/fr/home) API.
See on [Docker Hub](https://hub.docker.com/r/skynewz/fortnite-api/).
Thanks to [qlaffont](https://github.com/qlaffont/fortnite-api) for doing this API. You can support him with a donation : [Paypal Donation](https://www.paypal.me/qlaffont)

## Example
You can found this API as an example here https://api.fortnite.lemairepro.fr

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

## SETUP API
```bash
$ docker run -d --restart=always \     
  -e LOGIN_EMAIL=EMAIL_ACCOUNT \
  -e LOGIN_PASSWORD=PASSWORD \
  -e OAUTH_EPIC_LAUNCHER=CLIENT LAUNCHER TOKEN \
  -e OAUTH_FORTNITE=FORTNITE CLIENT TOKEN \
  -p 3000:3000
  skynewz/fortnite-api
```
This will launch node server, listening on port 3000. You can check at http://localhost:3000/news

> **Note:**
> You can can the option -e PORT=1234 in order to use a custom port

--------

## Endpoint
Supported plateform : `pc`, `ps4`, `xb1`.

- `/v1/user/<platform>/<username>` get user info by epic games username
https://api.fortnite.lemairepro.fr/v1/user/pc/skynewz
```js
{
  "id": "8b057df0e63744f38962f3c7635674b4",
  "displayName": "SkYNewZ"
}
```

---

- `/v1/stats/<platform>/<username>` Get stats of given username
https://api.fortnite.lemairepro.fr/v1/stats/pc/skynewz
```js
{
  "group": {
    "solo": {
      "wins": 0,
      "top3": 0,
      "top5": 0,
      "top6": 0,
      "top10": 2,
      "top12": 0,
      "top25": 9,
      "k/d": "0.44",
      "win%": "0.00",
      "matches": 52,
      "kills": 23,
      "timePlayed": "4h 8m",
      "killsPerMatch": "0.44",
      "killsPerMin": "0.09",
      "score": 5749
    },
    "duo": {
      "wins": 7,
      "top3": 0,
      "top5": 57,
      "top6": 0,
      "top10": 0,
      "top12": 109,
      "top25": 0,
      "k/d": "0.60",
      "win%": "1.24",
      "matches": 563,
      "kills": 336,
      "timePlayed": "2d 5h 49m",
      "killsPerMatch": "0.60",
      "killsPerMin": "0.10",
      "score": 83961
    },
    "squad": {
      "wins": 7,
      "top3": 21,
      "top5": 0,
      "top6": 38,
      "top10": 0,
      "top12": 0,
      "top25": 0,
      "k/d": "0.70",
      "win%": "3.17",
      "matches": 221,
      "kills": 150,
      "timePlayed": "22h 40m",
      "killsPerMatch": "0.68",
      "killsPerMin": "0.11",
      "score": 42685
    }
  },
  "info": {
    "accountId": "8b057df0e63744f38962f3c7635674b4",
    "username": "SkYNewZ",
    "platform": "pc"
  },
  "lifetimeStats": {
    "wins": 14,
    "top3s": 21,
    "top5s": 57,
    "top6s": 38,
    "top10s": 2,
    "top12s": 109,
    "top25s": 9,
    "k/d": "0.62",
    "win%": "1.67",
    "matches": 836,
    "kills": 509,
    "killsPerMin": "0.11",
    "timePlayed": "3d 8h 37m",
    "killsPerMatch": "0.61"
  }
}
```

---

- `/v1/pve/<username>` Get stats of given username
https://api.fortnite.lemairepro.fr/v1/pve/skynewz
---

- `/v1/news/<lang>` Check Fortnite ETA
https://api.fortnite.lemairepro.fr/v1/news
```js
{
  "common": {
    "_type": "CommonUI Simple Message Base",
    "title": "Battle Royale",
    "body": "Now with SQUADS! Grab three friends and hop into the action. \n\nRemember - Squads are here! Teaming in solo play is still unfair to others and is a bannable offense."
  },
  "br": [
    {
      "image": "https://cdn2.unrealengine.com/Fortnite%2FFNBR_MOTD_New-POI-256x256-589475a047855266499cf9aac03782fe868bf3f1.png",
      "_type": "CommonUI Simple Message Base",
      "title": "Map Update!",
      "body": " Discover a new city, underground mine and more."
    },
    {
      "image": "https://cdn2.unrealengine.com/Fortnite%2FFNBR_MOTD_TierBundle-256x256-d64ea9edadbcd75714b5e9c1fc578b547d22238b.png",
      "_type": "CommonUI Simple Message Base",
      "title": "10 Tier Bundle: On Sale Now!",
      "body": "Buy ten Battle Pass tiers for the price of six with this limited time bundle. "
    }
  ],
  "loginmessage": {
    "_type": "CommonUI Simple Message Base",
    "title": "Map Update is live!",
    "body": "BATTLE ROYALE:\n\nDiscover a new city, underground mine and more.\n\nBATTLE PASS BUNDLE:\n\nBuy ten Battle Pass tiers for the price of six in the item shop. On sale now for a limited time!\n\nSAVE THE WORLD: \n\nHelp Ray bring holiday cheer to this husk-ridden world for the last week of the holiday event.\n"
  },
  "survivalmessage": {
    "_type": "CommonUI Simple Message Base",
    "title": "The Survive the Storm event is now live!",
    "body": "Take the pledge:\nSelect a target survival time of 3 or 7 nights.\n\nSend Feedback:\nSurvive the Storm is still in development. We’d love to hear what you think."
  }
}
```

---

- `/v1/check`
https://api.fortnite.lemairepro.fr/v1/check
```js
true
```
