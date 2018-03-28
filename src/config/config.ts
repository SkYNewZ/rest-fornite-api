require('dotenv').config()

export const AppConfig = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    auth_pass: process.env.REDIS_PASSWORD || '',
    prefix: process.env.REDIS_PREFIX || 'api-fortnite',
    expire: {
      "200": 3600,
      "4xx": 10,
      "5xx": 10,
      "xxx": 1
    }
  },
  static_uri: '/static',
  universal_analytics_id: 'UA-93941787-3',
  debug: process.env.DEBUG || false
}