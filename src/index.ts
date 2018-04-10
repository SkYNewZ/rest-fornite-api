import { config } from "dotenv";
config();
import { json, urlencoded } from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as swaggerUi from "swagger-ui-express";
import { AppConfig } from "./config/config";

const app: express.Application = express();
const apiRoutes = express.Router();
const freeRoutes = express.Router();

// routes methods
import * as security from "./middlewares/security";
import * as check from "./routes/check";
import * as news from "./routes/news";
import * as pve from "./routes/pve";
import * as stats from "./routes/stats";
import * as store from "./routes/store";
import * as user from "./routes/user";
// <----END REQUIRED PACKAGES---->

// <----IF TESTING---->
/* istanbul ignore if */
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}
// <---END IF TESTING---->

// <----APP CONFIG---->
app.set("port", AppConfig.application.port);
app.use(AppConfig.static_uri, express.static(__dirname + "/public"));
app.use(json());
app.use(urlencoded({ extended: false }));
// swaggerUi
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerUrl: "https://skynewz-api-fortnite.herokuapp.com/static/swagger.json"
  })
);

// oauth
apiRoutes.use(security.authMiddleware);

// set prefix
app.use("/api", apiRoutes);
app.use("/", freeRoutes);
// <----END APP CONFIG---->

// <----ROUTING---->

// get token
apiRoutes.post("/oauth/token", security.getToken);

// check user bu username
apiRoutes.get("/user/:platform/:username", user.checkPlayer);

// get user stats by username
apiRoutes.get("/stats/:platform/:username", stats.getStatsBR);

// get users stats by user id
apiRoutes.get("/stats/id/:platform/:id", stats.getStatsBRFromID);

// PVE stats by username
apiRoutes.get("/pve/user/:username", pve.getStatsPVE);

// getFortnitePVEInfo
apiRoutes.get("/pve/info/:lang?", pve.getFortnitePVEInfo);

// get fortnite news
apiRoutes.get("/news/:lang?", news.getFortniteNews);

// get fortnite status
apiRoutes.get("/check", check.checkFortniteStatus);

// get store
apiRoutes.get("/store/:lang?", store.getStore);

// display https://skynewz.github.io/rest-fornite-api/ on home page
freeRoutes.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(__dirname + "/public/index.html");
});

// The 404 Route (ALWAYS Keep this as the last route)
freeRoutes.get("*", (req: express.Request, res: express.Response) => {
  res.sendStatus(404);
});

// start server
app.listen(app.get("port"), () =>
  console.log("Listening on port " + app.get("port"))
);

export const AppServer: express.Application = app;
