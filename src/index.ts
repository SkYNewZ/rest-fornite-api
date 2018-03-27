// <----REQUIRED PACKAGES---->
import * as express from 'express';
import * as morgan from 'morgan'
import * as swaggerUi from 'swagger-ui-express'
import { AppConfig } from './config/config'
import * as ua from 'universal-analytics'

const app = express()

// routes methods
import * as user from './routes/user'
import * as pve from './routes/pve'
import * as stats from './routes/stats'
import * as store from './routes/store'
import * as check from './routes/check'
import * as news from './routes/news'
// <----END REQUIRED PACKAGES---->

// analytics
let visitor = ua(AppConfig.universal_analytics_id)

// <----APP CONFIG---->
app.set('port', 3000)
app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  visitor.pageview(req.url, req.headers.host).send()
  next()
})
app.use(AppConfig.static_uri, express.static('public'))
// <----END APP CONFIG---->

// <----REDIS ACTIVATION---->
// enable redis if process.env.REDIS_HOST provided
let cache = null
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
    cache.on('message', function (message) {
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
    function (req, res, next) {
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
  .get(function (req, res, next) {
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
  .get(function (req, res, next) {
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
  .get(function (req, res, next) {
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
app.get('*', function (req, res) {
  res.status(404)
    .send({
      code: 404,
      message: 'Page not found'
    })
})
// <----END ROUTING---->

// start server
app.listen(app.get('port'), function () {
  console.log('Listening on port ' + app.get('port'))
})

export const AppServer = app;
