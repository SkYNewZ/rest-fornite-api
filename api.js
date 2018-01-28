var express = require('express'),
  app = express(),
  morgan = require('morgan'),
  swaggerUi = require('swagger-ui-express'),
  auth = [];

//routes methods
var user = require('./routes/user'),
  news = require('./routes/news'),
  pve = require('./routes/pve'),
  stats = require('./routes/stats'),
  store = require('./routes/store'),
  check = require('./routes/check');

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
app.use('/static', express.static('public'));

// check user bu username
app.route('/v1/user/:platform/:username').get(user.checkPlayer);

// get user stats by username
app.route('/v1/stats/:platform/:username').get(stats.getStatsBR);

// get users stats by user id
app.route('/v1/stats/id/:platform/:id').get(stats.getStatsBRFromID);

// PVE stats by username
app.route('/v1/pve/:username').get(pve.getStatsPVE);

// getFortnitePVEInfo
app.route('/v1/pve/info/:lang?').get(pve.getFortnitePVEInfo);

// get fortnite news
app.route('/v1/news/:lang?').get(news.getFortniteNews);

// get fortnite status
app.route('/v1/check').get(check.checkFortniteStatus);

// get store
app.route('/v1/store/:lang?').get(store.getStore);


//swaggerUi
var swaggerDocument = require('./public/swagger.json');
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// start server
app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
});

module.exports = app;
