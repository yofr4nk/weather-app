const redis = require('redis');
const {promisify} = require('util');

class RedisService {
  constructor() {
    this.client;
    this.getAsync;
    this.setAsync;
    this.keysAsync;
    this.hsetAsync;
    this.init();
  }

  init() {
    this.createClient();
  }

  createClient() {
    this.client = redis.createClient(process.env.REDIS_URL);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.keysAsync = promisify(this.client.keys).bind(this.client);
    this.hsetAsync = promisify(this.client.hset).bind(this.client);
  }

}

module.exports = RedisService;