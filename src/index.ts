// <----REQUIRED PACKAGES---->
import { AppConfig } from './config/config'
import * as express from 'express'
import * as morgan from 'morgan'
import * as swaggerUi from 'swagger-ui-express'
import * as ua from 'universal-analytics'
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
app.use(AppConfig.static_uri, express.static('public'))
// <----END APP CONFIG---->

// <----REDIS ACTIVATION---->
// enable redis if process.env.REDIS_HOST provided
let cache: any = null
if (AppConfig.redis.host) {
  cache = require('express-redis-cache')(AppConfig.redis)
  app.use(cache.route())
}
// <----END REDIS ACTIVATION---->

// <----IF TESTING---->
/* istanbul ignore if */
if (process.env.NODE_ENV !== 'test') {
  // use morgan to log at command line
  app.use(morgan('combined')) // 'combined' outputs the Apache style LOGs

  if (cache) {
    // redis logs
    cache.on('message', function (message: any) {
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
      if (cache) {
        cache.route({
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
    if (cache) {
      cache.route({
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
    if (cache) {
      cache.route({
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
    if (cache) {
      cache.route({
        expire: 3600
      })
    }
    next()
  }, store.getStore)

// swaggerUi
const swaggerDocument = require('../public/swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
