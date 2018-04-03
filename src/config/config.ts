import { Client } from "pg";

// check all needed env variales
/* istanbul ignore if */
if (!process.env.LOGIN_EMAIL) {
  throw new Error("Environnement variables LOGIN_EMAIL is missing ! See https://github.com/SkYNewZ/rest-fornite-api#requirements").message;
}

/* istanbul ignore if */
if (!process.env.LOGIN_PASSWORD) {
  throw new Error("Environnement variables LOGIN_PASSWORD is missing ! See https://github.com/SkYNewZ/rest-fornite-api#requirements")
    .message;
}

/* istanbul ignore if */
if (!process.env.OAUTH_EPIC_LAUNCHER) {
  throw new Error("Environnement variables OAUTH_EPIC_LAUNCHER is missing ! See https://github.com/SkYNewZ/rest-fornite-api#requirements")
    .message;
}

/* istanbul ignore if */
if (!process.env.OAUTH_FORTNITE) {
  throw new Error("Environnement variables OAUTH_FORTNITE is missing ! See https://github.com/SkYNewZ/rest-fornite-api#requirements")
    .message;
}

if (!process.env.DATABSE_CONNECTION_STING) {
  throw new Error("No database provided. See https://github.com/SkYNewZ/rest-fornite-api#requirements")
    .message;
}

// check database connection
const client = new Client({
  connectionString: process.env.DATABSE_CONNECTION_STING,
});
client.connect((err) => {
  /* istanbul ignore if */
  if (err) {
    throw err;
  }
});

export const AppConfig = {
  application: {
    database_string: process.env.DATABSE_CONNECTION_STING,
    port: process.env.PORT || 3000,
  },
  debug: process.env.DEBUG || false,
  fortnite: {
    email: process.env.LOGIN_EMAIL,
    oauth: {
      game: process.env.OAUTH_FORTNITE,
      laucher: process.env.OAUTH_EPIC_LAUNCHER,
    },
    password: process.env.LOGIN_PASSWORD,
  },
  secret: process.env.SECRET || "g6ePcR'G36]l63n",
  static_uri: "/static",
};

export const DatabaseClient = client;
