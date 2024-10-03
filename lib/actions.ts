'use server'

import { cookies } from 'next/headers'
import { connectToDatabase, User } from './db';
import { redirect } from 'next/navigation';
import { erf } from 'mathjs';

/*
 * Takes in an object, picks out the values, compares them with an array of values while incrementing scores
 * @param {userChoices} - userChoices
 * @param {answers} - answers
 *
 * @returns {number} - score
 */

type userChoices = {[key: string]: string};
type answers = string[]
export async function checkValidity (userChoices: userChoices, answers: answers ) {
    let score: number = 0;
    const values = Object.values(userChoices);
    for (let i = 0; i < values.length; i++ ) {
        if ( values[i] == answers[i]) {
            score++
        }
    }
    return score;
}

/* fetches the userid, stored in the cookie and if not found, creates one.
 * @ returns {string} - userId
 */

export async function getUserId () {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')
  if ( userId ) {
    console.log(`User's id is ${userId.value}`)
    return userId.value;
  }
  else {
    const userId = (Date.now().toString(36) + Math.random().toString(36));
    console.log(`User's id using my method is ${userId}`)
    cookies().set('userId', userId, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/' 
    })
    return userId;
  }
}

/* 2 extra points for anyone within age range of <16 or 60+
 * Oldheads and youngins get extra points since they don't do dumb IQ tests
 * @param {range} string - user's age range
 * @returns {void}
 *
 */

export async function handleAge ( range: string ) {   
  try{
    console.log(`User's age range is ${range}`)
    const userId = await getUserId();
    console.log( `User's id is ${userId}`)
    await connectToDatabase();
    console.log("Successfully connected to the db")
    let starterIQ: number = 0;
    if ( range == "16<" || range == "60+" ) {
      starterIQ = 2;
    }
    const newUser = await new User({ userId, starterIQ });
    await newUser.save();
  }
  catch ( error ){
    console.log(`Error during age selection: ${error}`)
  }
  redirect('/test')
}

/* Checks user's validity, stores score in db, redirects user to pre-result
 * @param {choices} userChoices - userChoices
 * @returns {void}
 * */

export async function checkTestOne (choices: userChoices) {
  const userId = await getUserId();
  console.log(`User's id is ${userId} (test one)`)
  const answers = ["False", "True", "True", "False", "False", "False", "True", "True", "False", "True"];
  const score = await checkValidity(choices, answers);
  console.log(`User's score in test one is ${score}`)
  try {
    const user = await User.findOneAndUpdate({userId}, {testOneScore: score}, {new: true})
    if ( !user ){
      console.log("User not found, test 1")
    }
    console.log("User updated successfully")
  }
  catch ( err ) {
    console.log(`Error occured when checking test one: ${err}`)
    throw err;
  }
  redirect('/pre-result')
}

/* Checks user's validity, stores score in db, redirects user to test-3
 * @param {choices} userChoices - userChoices
 * @returns {void}
 * */

export async function checkTestTwo (choices: userChoices) {
  const userId = await getUserId();
  console.log(`User's id is ${userId} (Test two)`)
  const answers = ["True", "False", "False", "False", "True", "False", "True", "False", "True"];
  const score = await checkValidity(choices, answers);
  console.log(`User's score in test two is ${score}`)
  try {
    const user = await User.findOneAndUpdate({userId}, {testTwoScore: score}, {new: true})
    if ( !user ){
      console.log("User not found, test 2")
    }
    console.log("User updated successfully")
  }
  catch ( err ) {
    console.log(`Error occured when checking test two: ${err}`)
    throw err;
  }
  redirect('/test-3')
}

/* Checks user's validity, stores score in db, redirects user to final result
 * @param {choices} userChoices - userChoices
 * @returns {void}
 * */

export async function checkTestThree (choices: userChoices) {
  const userId = await getUserId();
  console.log(`User's id is ${userId} (Test three)`)
  const answers = ["fleeting", "artist", "magnanimous", "sculpture", "True", "Box that has misfortunes and hope trapped inside",
  "False", "Cultural trend", "Economy", "argue with the opposite"];
  const score = await checkValidity(choices, answers);
  console.log(`User's score in test three is ${score}`)
  try {
    const user = await User.findOneAndUpdate({userId}, {testThreeScore: score}, {new: true})
    if ( !user ){
      console.log("User not found, test 3")
    }
    console.log("User updated successfully")
  }
  catch ( err ) {
    console.log(`Error occured when checking test three: ${err}`);
    throw err;
  }
  redirect('/result')
}

/* Calculate user's percentile using a standard deviation of 15 
 * @param {iq} number - User's IQ score 
 * @returns {percentile} number - User's percentile
 * */

export async function calculatePercentile (iq: number) {
    const mean: number = 100;
    const standardDeviation: number = 15;
    const zScore: number = (iq - mean) / standardDeviation;
    const percentile: number = (1 + erf(zScore / Math.sqrt(2))) / 2 * 100;
    console.log("The percentile is", percentile);
    return percentile;
 }

/* Estimate user's IQ and percentile using test one scores
 * @returns {IQ, percentile} Object - User's IQ, percentile
 * */

export async function preview() {
  try {
    const userId = await getUserId();
    await connectToDatabase();
    const user = await User.findOne({ userId });

    if (!user) {
      console.log(`User not found`);
      return;
    }
    
    const rawTotalScore = user.testOneScore;
    const maxScore = 10;
    // Assuming 20% variability and 75% average
    const meanRawScore = maxScore * 0.75;     
    const sdRawScore = maxScore * 0.2; 
    const zScore = (rawTotalScore - meanRawScore) / sdRawScore;

    const iq = Math.round(100 + zScore * 15 + user.starterIQ);

    const percentile = await calculatePercentile(iq);
    console.log(`User is ${user}`);
    return { iq: iq, percentile: percentile };
  } catch (err) {
    console.log(`Error when calculating total IQ: ${err}`);
    throw err;
  }
}

/* Estimate user's IQ and percentile using all three test scores
 * @returns {IQ, percentile} Object - User's IQ, percentile
 * */

export async function total () {
  try {
    const userId = await getUserId();
    await connectToDatabase();
    const user = await User.findOne({userId})
    if ( !user ) {
      console.log(`User not found`);
    }
    const rawTotalScore = user.testOneScore + user.testTwoScore + user.testThreeScore;
    const meanRawScore = 15;
    const sdRawScore = 5
    const zScore = ( rawTotalScore - meanRawScore ) / sdRawScore;
    const iq = 100 + zScore * 15 + user.starterIQ;

    const percentile = await calculatePercentile(iq)
    console.log(`User is ${user}`)
    return {iq: iq, percentile: percentile}
  }
  catch ( err ) {
    console.log(`Error when calculating total IQ: ${err}`);
    throw err;
  }
}
