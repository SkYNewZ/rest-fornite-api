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
app.get('/user/:platform/:username', user.checkPlayer)

// get user stats by username
app.get('/stats/:platform/:username', stats.getStatsBR)

// get users stats by user id
app.get('/stats/id/:platform/:id', stats.getStatsBRFromID)

// PVE stats by username
app.get('/pve/:username', pve.getStatsPVE)

// getFortnitePVEInfo
app.get('/pve/info/:lang?', pve.getFortnitePVEInfo)

// get fortnite news
app.get('/news/:lang?', news.getFortniteNews)

// get fortnite status
app.get('/check', check.checkFortniteStatus)

// get store
app.get('/store/:lang?', store.getStore)

// swaggerUi
const swaggerDocument = require('./swagger/swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//display https://skynewz.github.io/rest-fornite-api/ on hone page
app.get('/', function (req: express.Request, res: express.Response) {
  res.send('<iframe src="https://skynewz.github.io/rest-fornite-api" style="position:fixed; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">Your browser doesn\'t support iframes</iframe>');
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
