export const AppConfig = { 
  redis: { 
    host: process.env.REDIS_HOST, 
    port: process.env.REDIS_PORT || 6379, 
    prefix: process.env.REDIS_PREFIX || 'api-fortnite', 
    expire: 21600 
  }, 
  static_uri: '/assets', 
  universal_analytics_id: 'UA-93941787-3', 
  debug: process.env.DEBUG || false 
} 