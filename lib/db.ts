import Redis from 'ioredis'

const REDIS_URL: string = process.env.REDIS_URL as string;

const redisClient = new Redis(REDIS_URL)

redisClient.on('error', (err) => console.error('Redis Client Error:', err))

export default redisClient

export const getUserKey = (userId: string) => `user:${userId}`
