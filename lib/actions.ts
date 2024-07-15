'use server'

import { v4 as uuidv4 } from 'uuid'
import { cookies } from 'next/headers'
import { connectToDatabase, User } from './db';
import { redirect } from 'next/navigation';
import { erf } from 'mathjs';


// func that checks if user's choice is equal to answer and if so, it increments their score
type userChoices = {[key: string]: string};
type answers = string[]
export async function checkValidity (userChoices: userChoices, answers: answers ) {
    let score = 0;
    const values = Object.values(userChoices);
    for (let i = 0; i < values.length; i++ ) {
        if ( values[i] == answers[i]) {
            score++
        }
    }
    return score;
}

export async function getUserId () {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')
  if ( userId ) {
    return userId.value;
  }
  else {
    const userId = uuidv4();
    cookies().set('userId', userId, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/' 
    })
    return userId;
  }
}

export async function handleAge ( range: string ) {   
  try{
    console.log(`User's age range is ${range}`)
    const userId = await getUserId();
    console.log( `User's id is ${userId}`)
    await connectToDatabase();
    console.log("Successfully connected to the db")
    let starterIQ = 0;
    if ( range == "16<" || range == "60+" ) {
      starterIQ = 2;
    }
    const newUser = await new User({ userId, starterIQ });
    await newUser.save();
    console.log(`The newly saved user is ${newUser}`)
  }
  catch ( error ){
    console.log(`Error during age selection: ${error}`)
  }
  redirect('/test')
}

export async function checkTestOne (choices: userChoices) {
  const userId = await getUserId();
  console.log(`User's id is ${userId}`)
  const answers = ["False", "True", "True", "False", "False", "False", "True", "True", "False", "True"];
  console.log(`User's choices on question one are ${JSON.stringify(choices)}`)
  const score = await checkValidity(choices, answers);
  console.log(`User's score in test one is ${score}`)
  // const response = { testOneScore } 
  try {
    const user = await User.findOneAndUpdate({userId}, {testOneScore: score}, {new: true})
    if ( !user ){
      console.log("User not found, test 1")
    }
    console.log("User updated successfully")
  }
  catch ( err ) {
    console.log(`Error occured when checking test one: ${err}`)
  }
  redirect('/test-2')
}

export async function checkTestTwo (choices: userChoices) {
  const userId = await getUserId();
  console.log(`User's id is ${userId}`)
  const answers = ["True", "False", "False", "False", "True", "False", "True", "False", "True"];
  console.log(`User's choices on test two are ${JSON.stringify(choices)}`)
  const score = await checkValidity(choices, answers);
  console.log(`User's score in test two is ${score}`)
  try {
    const user = await User.findOneAndUpdate({userId}, {testTwoScore: score}, {new: true})
    if ( !user ){
      console.log("User not found, test 1")
    }
    console.log("User updated successfully")
  }
  catch ( err ) {
    console.log(`Error occured when checking test one: ${err}`)
  }
  redirect('/test-3')
}

export async function checkTestThree (choices: userChoices) {
  const userId = await getUserId();
  console.log(`User's id is ${userId}`)
  const answers = ["fleeting", "artist", "magnanimous", "sculpture", "True", "Box that has misfortunes and hope trapped inside",
  "False", "Cultural trend", "Economy", "argue with the opposite"];
  console.log(`User's choices on test three are ${JSON.stringify(choices)}`)
  const score = await checkValidity(choices, answers);
  console.log(`User's score in test three is ${score}`)
  try {
    const user = await User.findOneAndUpdate({userId}, {testThreeScore: score}, {new: true})
    if ( !user ){
      console.log("User not found, test 1")
    }
    console.log("User updated successfully")
  }
  catch ( err ) {
    console.log(`Error occured when checking test one: ${err}`)
  }
  redirect('/result')
}

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

    const calculatePercentile = (iq: number) => {
      const mean = 100;
      const standardDeviation = 15;
      const zScore = ( iq - mean ) / standardDeviation;
      const percentile = ( 1 + erf(zScore/Math.sqrt(2))) / 2 * 100;
      console.log("The percentile is", percentile)
      return percentile;
    }
    console.log(iq);
    const percentile = calculatePercentile(iq)
    console.log(`User is ${user}`)
    return {iq: iq, percentile: percentile}
  }
  catch ( err ) {
    console.log(`Error when calculating total IQ: ${err}`)
  }
}

export { connectToDatabase, User }