// <----REQUIRED PACKAGES---->
import { AppConfig } from './config/config'
import * as express from 'express'
import * as morgan from 'morgan'
import * as swaggerUi from 'swagger-ui-express'
import * as ua from 'universal-analytics'
import * as cache from 'express-redis-cache'
require('dotenv').config()

const app: express.Application = express()

// routes methods
import * as user from './routes/user'
import * as pve from './routes/pve'
import * as stats from './routes/stats'
import * as store from './routes/store'
import * as check from './routes/check'
import * as news from './routes/news'
// <----END REQUIRED PACKAGES---->

// analytics
let visitor: ua.Visitor = ua(AppConfig.universal_analytics_id)

// <----APP CONFIG---->
app.set('port', process.env.PORT || 3000)
app.all('/*', function (req: express.Request, res: express.Response, next: express.NextFunction): void {
  res.header('Access-Control-Allow-Origin', '*')
  visitor.pageview(req.url, req.headers.host).send()
  next()
})
app.use(AppConfig.static_uri, express.static(__dirname + '/swagger'))
// <----END APP CONFIG---->

// <----REDIS ACTIVATION---->
// enable redis if process.env.REDIS_HOST provided
let cacheClient: any = null
if (AppConfig.redis.host) {
  cacheClient = cache(AppConfig.redis);
  app.use(cacheClient.route())
}
// <----END REDIS ACTIVATION---->

// <----IF TESTING---->
/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')) // 'combined' outputs the Apache style LOGs

  if (cacheClient) {
    // redis logs
    cacheClient.on('message', function (message: any) {
      console.log('[REDIS] : ' + message)
    })
  }
}
// <---END IF TESTING---->

// <----ROUTING---->
// check user bu username
app.route('/user/:platform/:username')
  .get(user.checkPlayer)

// get user stats by username
app.route('/stats/:platform/:username')
  .get(
    // enable caching if cache enable ^^
    function (req: express.Request, res: express.Response, next: express.NextFunction) {
      if (cacheClient) {
        cacheClient.route({
          expire: 3600
        })
      }
      next()
    },
    stats.getStatsBR)

// get users stats by user id
app.route('/stats/id/:platform/:id')
  .get(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    // enable caching if cache enable ^^
    if (cacheClient) {
      cacheClient.route({
        expire: 3600
      })
    }
    next()
  }, stats.getStatsBRFromID)

// PVE stats by username
app.route('/pve/:username')
  .get(pve.getStatsPVE)

// getFortnitePVEInfo
app.route('/pve/info/:lang?')
  .get(pve.getFortnitePVEInfo)

// get fortnite news
app.route('/news/:lang?')
  .get(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    // enable caching if cache enable ^^
    if (cacheClient) {
      cacheClient.route({
        expire: 3600
      })
    }
    next()
  }, news.getFortniteNews)

// get fortnite status
app.route('/check')
  .get(check.checkFortniteStatus)

// get store
app.route('/store/:lang?')
  .get(function (req: express.Request, res: express.Response, next: express.NextFunction) {
    // enable caching if cache enable ^^
    if (cacheClient) {
      cacheClient.route({
        expire: 3600
      })
    }
    next()
  }, store.getStore)

// swaggerUi
const swaggerDocument = require('./swagger/swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//display https://skynewz.github.io/rest-fornite-api/ on hone page
app.get('/', function(rreq: express.Request, res: express.Response) {
  res.send('<iframe src="https://skynewz.github.io/rest-fornite-api/" style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">Your browser doesn\'t support iframes</iframe>');
});
// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req: express.Request, res: express.Response) {
  res.sendStatus(404);
})
// <----END ROUTING---->

// start server
app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'))
})

export const AppServer: express.Application = app;
