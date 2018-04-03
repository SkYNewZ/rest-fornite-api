import FortniteAPI = require("fortnite-api");
import { AppConfig } from "../config/config";

const fortniteAPI = new FortniteAPI(
  [
    AppConfig.fortnite.email,
    AppConfig.fortnite.password,
    AppConfig.fortnite.oauth.laucher,
    AppConfig.fortnite.oauth.game,
  ],
  {
    debug: AppConfig.debug,
  },
);
fortniteAPI.login();

export default fortniteAPI;
