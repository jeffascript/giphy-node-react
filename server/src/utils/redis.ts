import redis from 'redis';
import util from 'util';

// compare with this docs: https://github.com/NodeRedis/node-redis
export const redisClient = redis.createClient({
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT as unknown as number,
    password: process.env.REDIS_PASSWORD,
});

export const cacheExpiration = Math.floor(2 * 24 * 60 * 60); // 2 days

redisClient.on('error', (err) => {
    console.log(process.env.REDIS_PASSWORD);
    throw err;
});

export const getRedisCacheAsync = util.promisify(redisClient.get).bind(redisClient);
