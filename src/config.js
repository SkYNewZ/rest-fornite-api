module.exports = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    prefix: process.env.REDIS_PREFIX || 'api-fortnite',
    expire: 21600
  },
  static_uri: '/assets'
}