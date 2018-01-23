// require the package
const Fortnite = require('fortnite-api');
const express = require('express');
const app = express();
const auth = [
	process.env.LOGIN_EMAIL,
	process.env.LOGIN_PASSWORD,
	process.env.OAUTH_EPIC_LAUNCHER,
	process.env.OAUTH_FORTNITE
];

auth.forEach(function (item, index) {
  if (!item) {
    console.log('Authentification failed, missing element');
    switch (index) {
      case 0:
        console.log('LOGIN_EMAIL is missing');
        break;

      case 1:
        console.log('LOGIN_PASSWORD is missing');
        break;

      case 2:
        console.log('OAUTH_EPIC_LAUNCHER is missing');
        break;

      case 3:
        console.log('OAUTH_FORTNITE is missing');
        break;

    }
  }
  process.exit();
})

console.log('Using credentials :' + auth);

// get user by name
app.get('/user/:platform/:username', function (req, res) {
	console.log(req);
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.checkPlayer(username, platform)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
  });
});

// get user stats by name
app.get('/stats/:platform/:username', function (req, res) {
	console.log(req);
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getStatsBR(username, platform)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
  });
});

// get users stats by user id
app.get('/statsById/:platform/:user', function (req, res) {
	console.log(req);
  var id = req.params.user;
  var platform = req.params.platform;
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getStatsBR(id, platform)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
  });
})

// get fortnite news
app.get('/news/:lang?', function (req, res) {
	console.log(req);
  var language = req.params.lang;
  if (!language) {
    language = 'en';
  }
  console.log(language);
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getFortniteNews(language)
    .then((news) => {
      res.json(news);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
  });
})

// get fortnite status
app.get('/check', function (req, res) {
	console.log(req);
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.checkFortniteStatus()
    .then((status) => {
      res.json(status);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
  });
})

// get pve info
app.get('/pve', function (req, res) {
	console.log(req);
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getFortnitePVEInfo()
    .then((status) => {
      res.json(status);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
  });
})

// get store
app.get('/store', function (req, res) {
	console.log(req);
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getStore()
    .then((store) => {
      res.json(store);
      console.log(store);
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
  });
})

// start server
app.listen(3000, function () {
  console.log('Listening on port 3000')
});

process.on('SIGINT', function() {
    process.exit();
});
