// <----REQUIRED PACKAGES---->
let express = require('express'),
    app = express(),
    morgan = require('morgan'),
    swaggerUi = require('swagger-ui-express'),
    Config = require('./src/config'),
    auth = [];

//routes methods
let user = require('./routes/user'),
    news = require('./routes/news'),
    pve = require('./routes/pve'),
    stats = require('./routes/stats'),
    store = require('./routes/store'),
    check = require('./routes/check');
// <----END REQUIRED PACKAGES---->

let cache = null;

// <----APP CONFIG---->
app.set('port', process.env.PORT || 3000);
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(Config.static_uri, express.static('public'));
// <----END APP CONFIG---->

// <----REDIS ACTIVATION---->
//enable redis if process.env.REDIS_HOST provided
if (Config.redis.host) {
    let cache = require('express-redis-cache')(Config.redis);
    app.use(cache.route());
}
// <----END REDIS ACTIVATION---->

// <----IF TESTING---->
/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs

    if (cache) {
        //redis logs
        cache.on('message', function (message) {
            console.log('[REDIS] : ' + message);
        });
    }
}
// <---END IF TESTING---->


// <----ROUTING---->
// check user bu username
app.route('/user/:platform/:username').get(user.checkPlayer);

// get user stats by username
app.route('/stats/:platform/:username').get(
    //enable caching if cache enable ^^
    function (req, res, next) {
        if (cache) {
            cache.route({
                expire: 3600
            });
        }
        next();
    },
    stats.getStatsBR);

// get users stats by user id
app.route('/stats/id/:platform/:id').get(function (req, res, next) {
    //enable caching if cache enable ^^
    if (cache) {
        cache.route({
            expire: 3600
        });
    }
    next();
}, stats.getStatsBRFromID);

// PVE stats by username
app.route('/pve/:username').get(pve.getStatsPVE);

// getFortnitePVEInfo
app.route('/pve/info/:lang?').get(pve.getFortnitePVEInfo);

// get fortnite news
app.route('/news/:lang?').get(function (req, res, next) {
    //enable caching if cache enable ^^
    if (cache) {
        cache.route({
            expire: 3600
        });
    }
    next();
}, news.getFortniteNews);

// get fortnite status
app.route('/check').get(check.checkFortniteStatus);

// get store
app.route('/store/:lang?').get(function (req, res, next) {
    //enable caching if cache enable ^^
    if (cache) {
        cache.route({
            expire: 3600
        });
    }
    next();
}, store.getStore);


//swaggerUi
let swaggerDocument = require('./public/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).send({
        code: 404,
        message: "Page not found"
    });
});
// <----END ROUTING---->

// start server
app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'))
});

module.exports = app;
