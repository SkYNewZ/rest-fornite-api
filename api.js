var Fortnite = require('fortnite-api'),
  express = require('express'),
  app = express(),
  morgan = require('morgan'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json'),
  auth = [];

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

// Authentification
var fortniteAPI = new Fortnite(auth);

//app configuration
//don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.set('port', process.env.PORT || 3000);
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// get user by name
app.get('/v1/user/:platform/:username', function(req, res) {
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
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
          } else if (err === "Impossible to fetch User. User not found on this platform") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else {
            res.status(500).send({
              code: 500,
              message: err
            });
          }
        });
    });
});

// get user stats by name
app.get('/v1/stats/:platform/:username', function(req, res) {
  var username = req.params.username;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
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
          } else if (err === "Impossible to fetch User. User not found on this platform") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else {
            res.status(500).send({
              code: 500,
              message: err
            });
          }
        });
    });
});

// get users stats by user id
app.get('/v1/stats/id/:platform/:id', function(req, res) {
  var id = req.params.id;
  var platform = req.params.platform;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsBRFromID(id, platform)
        .then((stats) => {
          res.json(stats);
        })
        .catch((err) => {
          if (err === "Impossible to fetch User. User not found on this platform") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else if (err === "Impossible to fetch User.") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else {
            res.status(500).send({
              code: 500,
              message: err
            });
          }
        });
    });
})

// PVE stats
app.get('/v1/pve/:username', function(req, res) {
  var username = req.params.username;
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStatsPVE(username)
        .then((stats) => {
          res.json(stats);
        })
        .catch((err) => {
          if (err === "Player Not Found") {
            res.status(404).send({
              code: 404,
              message: err
            });
          } else if (err === "No Data") {
            res.status(400).send({
              code: 400,
              message: err
            });
          } else {
            res.status(500).send({
              code: 500,
              message: err
            });
          }
        });
    });
})

// get fortnite news
app.get('/v1/news/:lang?', function(req, res) {
  var language = req.params.lang || 'en';
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortniteNews(language)
        .then((news) => {
          res.json(news);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
        });
    });
})

// get fortnite status
app.get('/v1/check', function(req, res) {
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.checkFortniteStatus()
        .then((status) => {
          res.json(status);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
        });
    });
})

// get store
app.get('/v1/store/:lang?', function(req, res) {
  var language = req.params.lang || 'en';
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getStore(language)
        .then((store) => {
          res.json(store);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
        });
    });
})

// getFortnitePVEInfo
app.get('/v1/pve/info/:lang?', function(req, res) {
  var language = req.params.lang || 'en';
  fortniteAPI.login()
    .then(() => {
      fortniteAPI.getFortnitePVEInfo(language)
        .then((store) => {
          res.json(store);
        })
        .catch((err) => {
          res.status(500).send({
            code: 500,
            message: err
          });
        });
    });
})

// swagger file
app.get('/v1/swagger.json', function(req, res) {
  var file = __dirname + '/swagger.json';
  res.download(file); // Set disposition and send it.
});

app.get('/v1/swagger.yaml', function(req, res) {
  var file = __dirname + '/swagger.yaml';
  res.download(file); // Set disposition and send it.
});


//swaggerUi
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start server
app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
});

process.on('SIGINT', function() {
  process.exit();
});

module.exports = app;
