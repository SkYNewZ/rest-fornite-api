// <----REQUIRED PACKAGES---->
import { config } from "dotenv";
config();
import * as express from "express";
import * as cache from "express-redis-cache";
import { existsSync, mkdirSync } from "fs";
import * as morgan from "morgan";
import { join } from "path";
import * as rfs from "rotating-file-stream";
import * as swaggerUi from "swagger-ui-express";
import { AppConfig } from "./config/config";

const app: express.Application = express();

// routes methods
import * as check from "./routes/check";
import * as news from "./routes/news";
import * as pve from "./routes/pve";
import * as stats from "./routes/stats";
import * as store from "./routes/store";
import * as user from "./routes/user";
// <----END REQUIRED PACKAGES---->

// logs
const logDirectory = join(__dirname, "logs");
existsSync(logDirectory) || mkdirSync(logDirectory);
const accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory,
});

// <----APP CONFIG---->
app.set("port", process.env.PORT || 3000);
app.all(
  "/*",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  },
);
app.use(AppConfig.static_uri, express.static(__dirname + "/public"));
// <----END APP CONFIG---->

// <----REDIS ACTIVATION---->
// enable redis if process.env.REDIS_HOST provided
let cacheClient: any = null;
if (AppConfig.redis.host) {
  cacheClient = cache(AppConfig.redis);
  app.use(cacheClient.route());
}
// <----END REDIS ACTIVATION---->

// <----IF TESTING---->
/* istanbul ignore if */
if (process.env.NODE_ENV !== "test") {
  // use morgan to log at command line
  app.use(morgan("combined", { stream: accessLogStream })); // 'combined' outputs the Apache style LOGs
  app.use(morgan("combined"));
  if (cacheClient) {
    // redis logs
    cacheClient.on("message", (message: any) => {
      console.log("[REDIS] : " + message);
    });
  }
}
// <---END IF TESTING---->

// <----ROUTING---->
// check user bu username
app.get("/user/:platform/:username", user.checkPlayer);

// get user stats by username
app.get("/stats/:platform/:username", stats.getStatsBR);

// get users stats by user id
app.get("/stats/id/:platform/:id", stats.getStatsBRFromID);

// PVE stats by username
app.get("/pve/user/:username", pve.getStatsPVE);

// getFortnitePVEInfo
app.get("/pve/info/:lang?", pve.getFortnitePVEInfo);

// get fortnite news
app.get("/news/:lang?", news.getFortniteNews);

// get fortnite status
app.get("/check", check.checkFortniteStatus);

// get store
app.get("/store/:lang?", store.getStore);

// swaggerUi
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerUrl: "https://skynewz-api-fortnite.herokuapp.com/static/swagger.json",
  }),
);

// display https://skynewz.github.io/rest-fornite-api/ on home page
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + "/public/index.html");
});
// The 404 Route (ALWAYS Keep this as the last route)
app.get("*", (req: express.Request, res: express.Response) => {
  res.sendStatus(404);
});
// <----END ROUTING---->

// start server
app.listen(app.get("port"), () =>
  console.log("Listening on port " + app.get("port")),
);

export const AppServer: express.Application = app;
