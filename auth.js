var Fortnite = require('fortnite-api');
var auth = [];

if (process.env.LOGIN_EMAIL) {
  auth.push(process.env.LOGIN_EMAIL);
}

if (process.env.LOGIN_PASSWORD) {
  auth.push(process.env.LOGIN_PASSWORD);
}

if (process.env.OAUTH_EPIC_LAUNCHER) {
  auth.push(process.env.OAUTH_EPIC_LAUNCHER);
}

if (process.env.OAUTH_FORTNITE) {
  auth.push(process.env.OAUTH_FORTNITE);
}

var fortniteAPI = new Fortnite(auth);

module.exports = fortniteAPI;