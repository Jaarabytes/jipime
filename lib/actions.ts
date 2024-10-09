'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { erf } from 'mathjs'
import redisClient, { getUserKey } from './db'

type UserChoices = { [key: string]: string }
type Answers = string[]

/*
 * Takes in an object, picks out the values, compares them with an array of values while incrementing scores
 * @param {userChoices} - userChoices
 * @param {answers} - answers
 *
 * @returns {number} - score
 */

const checkValidity = (userChoices: UserChoices, answers: Answers): number => {
  return Object.values(userChoices).reduce((score, value, index) => 
    value === answers[index] ? score + 1 : score, 0)
}

/* fetches the userid, stored in the cookie and if not found, creates one.
 * @ returns {string} - userId
 */

export async function getUserId () {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId')
  if (userId) {
    return userId.value
  }
  const newUserId = Date.now().toString(36) + Math.random().toString(36)
  cookies().set('userId', newUserId, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/'
  })
  return newUserId
}

const logError = (context: string, error: unknown) => {
  console.error(`Error in ${context}:`, error)
}


/* 2 extra points for anyone within age range of <16 or 60+
 * Oldheads and youngins get extra points since they don't do dumb IQ tests
 * @param {range} string - user's age range
 * @returns {void}
 *
 */

export const handleAge = async (range: string): Promise<void> => {
  try {
    const userId = await getUserId()
    const starterIQ = (range === "16<" || range === "60+") ? 2 : 0
    await redisClient.hset(getUserKey(userId), {
      userId,
      starterIQ: starterIQ.toString()
    })
  } catch (error) {
    logError('handleAge', error)
  }
  redirect('/test')
}


/* Checks user's validity, stores score in db
 * @param {testName} string - The test ie testOne, testTwo or testThree
 * @param {choices} userChoices - userChoices
 * @param {answers} answers - Answers
 * @param {redirectPath} string - where to be redirect next
 * @returns {void}
 * */

const checkTest = async (
  testName: string, 
  choices: UserChoices, 
  answers: Answers, 
  redirectPath: string
): Promise<void> => {
  const userId = await getUserId()
  const score = checkValidity(choices, answers)
  try {
    await redisClient.hset(getUserKey(userId), `test${testName}Score`, score.toString())
  } catch (error) {
    logError(`checkTest${testName}`, error)
    throw error
  }
  redirect(redirectPath)
}

export const checkTestOne = (choices: UserChoices) => checkTest(
  'One',
  choices,
  ["False", "True", "True", "False", "False", "False", "True", "True", "False", "True"],
  '/pre-result'
)

export const checkTestTwo = (choices: UserChoices) => checkTest(
  'Two',
  choices,
  ["True", "False", "False", "False", "True", "False", "True", "False", "True"],
  '/test-3'
)

export const checkTestThree = (choices: UserChoices) => checkTest(
  'Three',
  choices,
  ["fleeting", "artist", "magnanimous", "sculpture", "True", "Box that has misfortunes and hope trapped inside",
   "False", "Cultural trend", "Economy", "argue with the opposite"],
  '/result'
)


/* Calculate user's percentile using a standard deviation of 15 
 * @param {iq} number - User's IQ score 
 * @returns {percentile} number - User's percentile
 * */

const calculatePercentile = (iq: number): number => {
  const mean = 100
  const standardDeviation = 15
  const zScore = (iq - mean) / standardDeviation
  return (1 + erf(zScore / Math.sqrt(2))) / 2 * 100
}

/* Calculate user's IQ
 * @param {rawScore} number - User's total test score 
 * @param {meanScore} number - User's mean test score 
 * @param {sdScore} number - User's standard deviation score 
 * @param {starterIQ} number - User's yummy bonus points 
 * @returns {IQ} number - User's IQ result
 * */

const calculateIQ = (rawScore: number, meanScore: number, sdScore: number, starterIQ: number): number => {
  const zScore = (rawScore - meanScore) / sdScore
  return Math.round(100 + zScore * 15 + starterIQ)
}

/*
 * Retrieves all user data provided user's id
 * @param {userId} string - user's random id provided during age selection
 * @returns user 
 * */

const getUserData = async (userId: string) => {
  const user = await redisClient.hgetall(getUserKey(userId))
  if (!user.userId) throw new Error('User not found')
  return user
}

/* Estimate user's IQ and percentile using test one scores
 * @returns {IQ, percentile} Object - User's IQ, percentile
 * */

export const preview = async (): Promise<{ iq: number, percentile: number }> => {
  try {
    const userId = await getUserId()
    const user = await getUserData(userId)
    const rawTotalScore = parseInt(user.testOneScore || '0')
    const iq = calculateIQ(rawTotalScore, 7.5, 2, parseInt(user.starterIQ || '0'))
    const percentile = calculatePercentile(iq)
    return { iq, percentile }
  } catch (error) {
    logError('preview', error)
    throw error
  }
}

/* Estimate user's IQ and percentile using all three test scores
 * @returns {IQ, percentile} Object - User's IQ, percentile
 * */

export const total = async (): Promise<{ iq: number, percentile: number }> => {
  try {
    const userId = await getUserId()
    const user = await getUserData(userId)
    const rawTotalScore = ['One', 'Two', 'Three'].reduce(
      (sum, test) => sum + parseInt(user[`test${test}Score`] || '0'), 0
    )
    const iq = calculateIQ(rawTotalScore, 15, 5, parseInt(user.starterIQ || '0'))
    const percentile = calculatePercentile(iq)
    return { iq, percentile }
  } catch (error) {
    logError('total', error)
    throw error
  }
}
