module.exports = {
  redis: {
    host: process.env.REDIS_HOST || '172.17.0.2',
    port: process.env.REDIS_PORT || 6379,
    prefix: process.env.REDIS_PREFIX || 'api-fortnite',
    expire: 21600
  }
}
