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
		process.exit();
  }
})

function getCurrentDate(){
  var currentdate = new Date();
  return datetime = currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();
}

// Authentification
let fortniteAPI = new Fortnite(auth);

app.use(function(req, res, next) {
  console.log(getCurrentDate() + ' : Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log(getCurrentDate() + ' : Request Type:', req.method);
  next();
});

// get user by name
app.get('/v1/user/:platform/:username', function (req, res) {
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.checkPlayer(username, platform)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      if (err === "Player Not Found") {
        res.status(404).send({
          code: 404,
          message: err
        });
      }
      if (err === "Impossible to fetch User. User not found on this platform") {
        res.status(404).send({
          code: 404,
          message: err
        });
      }
      else {
        res.status(500).send({
          code: 500,
          message: err
        });
      }
      console.log(err);
    });
  });
});

// get user stats by name
app.get('/v1/stats/:platform/:username', function (req, res) {
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getStatsBR(username, platform)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      if (err === "Player Not Found") {
        res.status(404).send({
          code: 404,
          message: err
        });
      }
      if (err === "Impossible to fetch User. User not found on this platform") {
        res.status(404).send({
          code: 404,
          message: err
        });
      }
      else {
        res.status(500).send({
          code: 500,
          message: err
        });
      }
      console.log(err);
    });
  });
});

// get users stats by user id
app.get('/v1/statsById/:platform/:user', function (req, res) {
  var id = req.params.user;
  var platform = req.params.platform;
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getStatsBR(id, platform)
    .then((stats) => {
      res.json(stats);
    })
    .catch((err) => {
      if (err === "Player Not Found") {
        res.status(404).send({
          code: 404,
          message: err
        });
      }
      if (err === "Impossible to fetch User. User not found on this platform") {
        res.status(404).send({
          code: 404,
          message: err
        });
      }
      else {
        res.status(500).send({
          code: 500,
          message: err
        });
      }
      console.log(err);
    });
  });
})

// get fortnite news
app.get('/v1/news/:lang?', function (req, res) {
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
      res.status(500).send({
        code: 500,
        message: err
      });
      console.log(err);
    });
  });
})

// get fortnite status
app.get('/v1/check', function (req, res) {
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.checkFortniteStatus()
    .then((status) => {
      res.json(status);
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: err
      });
      console.log(err);
    });
  });
})

// get pve info
app.get('/v1/pve', function (req, res) {
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getFortnitePVEInfo()
    .then((status) => {
      res.json(status);
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: err
      });
      console.log(err);
    });
  });
})

// get store
app.get('/v1/store', function (req, res) {
  fortniteAPI.login()
  .then(()=> {
    fortniteAPI.getStore()
    .then((store) => {
      res.json(store);
      console.log(store);
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: err
      });
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
