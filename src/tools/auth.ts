import FortniteAPI = require("fortnite-api");
import { AppConfig } from "../config/config";

/* istanbul ignore if */
if (!process.env.LOGIN_EMAIL) {
  throw new Error("Environnement variables LOGIN_EMAIL is missing !").message;
}

/* istanbul ignore if */
if (!process.env.LOGIN_PASSWORD) {
  throw new Error("Environnement variables LOGIN_PASSWORD is missing !")
    .message;
}

/* istanbul ignore if */
if (!process.env.OAUTH_EPIC_LAUNCHER) {
  throw new Error("Environnement variables OAUTH_EPIC_LAUNCHER is missing !")
    .message;
}

/* istanbul ignore if */
if (!process.env.OAUTH_FORTNITE) {
  throw new Error("Environnement variables OAUTH_FORTNITE is missing !")
    .message;
}

export const fortniteAPI = new FortniteAPI(
  [
    process.env.LOGIN_EMAIL,
    process.env.LOGIN_PASSWORD,
    process.env.OAUTH_EPIC_LAUNCHER,
    process.env.OAUTH_FORTNITE,
  ],
  {
    debug: AppConfig.debug,
  },
);
