// Migrated from mongodb to redis since redis is wayyy faster
// Also, total data is relatively small since the user base isn't large and if large, data that lasts longer than 24 hours is deleted


// PROJECT Structure
// {
//    userId: string,
//    testOneScore: number,
//    testTwoScore: number,
//    testThreeScore: number,
// }
//
// Example user:
// {
//    userId: m25q00nq0.ir08ynfne0s,
//    testOneScore: 5,
//    testTwoScore: 9,
//    testThreeScore: 6,
// }
//
// At most, test scores are integers/ numbers thus eight bytes each therefore 8*3 = 24
// While userId is a string of length 21 characters thus 21 * 8 = 168 
// 168 + 24  = 192 bytes
//
// Each user' test results take up a maximum of 192 bytes.
// Also assuming that I get at most 200 users a day, that would be 192 bytes * 200 = 38400 bytes which is approximately 38.4 kb
//
// On matters concurrency and server speed, I plan to switch to golang backend instead of nextjs however typescript is great.

import Redis from 'ioredis'

const REDIS_URL: string = process.env.REDIS_URL as string;

const redisClient = new Redis(REDIS_URL)

redisClient.on('error', (err) => console.error('Redis Client Error:', err))

export default redisClient

export const getUserKey = (userId: string) => `user:${userId}`
