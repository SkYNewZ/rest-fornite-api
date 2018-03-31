export const AppConfig = {
  debug: process.env.DEBUG || false,
  redis: {
    auth_pass: process.env.REDIS_PASSWORD || "",
    expire: {
      "200": 3600,
      "4xx": 10,
      "5xx": 10,
      "xxx": 1,
    },
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    prefix: process.env.REDIS_PREFIX || "api-fortnite",
  },
  static_uri: "/static",
  universal_analytics_id: "UA-93941787-3",
};
