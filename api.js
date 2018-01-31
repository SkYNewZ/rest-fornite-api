var express = require('express'),
  app = express(),
  morgan = require('morgan'),
  swaggerUi = require('swagger-ui-express'),
  Config = require('./src/config'),
  auth = [];

//routes methods
var user = require('./routes/user'),
  news = require('./routes/news'),
  pve = require('./routes/pve'),
  stats = require('./routes/stats'),
  store = require('./routes/store'),
  check = require('./routes/check');

//don't show the log when it is test
/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs

  //enable redis if process.env.REDIS_HOST provided
  if (Config.redis.host) {
    var cache = require('express-redis-cache')(Config.redis);
    app.use(cache.route());
    //redis config
    cache.on('message', function(message) {
      console.log('[REDIS] : ' + message);
    });
  }
}

app.set('port', process.env.PORT || 3000);
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use('/static', express.static('public'));

// check user bu username
app.route('/v1/user/:platform/:username').get(user.checkPlayer);

// get user stats by username
app.route('/v1/stats/:platform/:username').get(
  //enable caching if cache enable ^^
  function(req, res, next) {
    if (cache) {
      cache.route({
        expire: 3600
      });
      next();
    }
  },
  stats.getStatsBR);

// get users stats by user id
app.route('/v1/stats/id/:platform/:id').get(function(req, res, next) {
  //enable caching if cache enable ^^
  if (cache) {
    cache.route({
      expire: 3600
    });
    next();
  }
}, stats.getStatsBRFromID);

// PVE stats by username
app.route('/v1/pve/:username').get(pve.getStatsPVE);

// getFortnitePVEInfo
app.route('/v1/pve/info/:lang?').get(pve.getFortnitePVEInfo);

// get fortnite news
app.route('/v1/news/:lang?').get(function(req, res, next) {
  //enable caching if cache enable ^^
  if (cache) {
    cache.route({
      expire: 3600
    });
    next();
  }
}, news.getFortniteNews);

// get fortnite status
app.route('/v1/check').get(check.checkFortniteStatus);

// get store
app.route('/v1/store/:lang?').get(function(req, res, next) {
  //enable caching if cache enable ^^
  if (cache) {
    cache.route({
      expire: 3600
    });
    next();
  }
}, store.getStore);


//swaggerUi
var swaggerDocument = require('./public/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res) {
  res.status(404).send({
    code: 404,
    message: "Page not found"
  });
});

// start server
app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
});

module.exports = app;
