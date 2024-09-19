'use server'

import { cookies } from 'next/headers'
import { connectToDatabase, User } from './db';
import { redirect } from 'next/navigation';
import { erf } from 'mathjs';

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

export async function handleAge ( range: string ) {   
  try{
    console.log(`User's age range is ${range}`)
    const userId = await getUserId();
    console.log( `User's id is ${userId}`)
    await connectToDatabase();
    console.log("Successfully connected to the db")
    let starterIQ = 0;
    // I give bonus points to the elderly and kids since they don't do stupid IQ tests
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

export async function calculatePercentile (iq: number) {
    const mean = 100;
    const standardDeviation = 15;
    const zScore = (iq - mean) / standardDeviation;
    const percentile = (1 + erf(zScore / Math.sqrt(2))) / 2 * 100;
    console.log("The percentile is", percentile);
    return percentile;
 }

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

    const percentile = calculatePercentile(iq);
    console.log(`User is ${user}`);
    return { iq: iq, percentile: percentile };
  } catch (err) {
    console.log(`Error when calculating total IQ: ${err}`);
    throw err;
  }
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

    const percentile = calculatePercentile(iq)
    console.log(`User is ${user}`)
    return {iq: iq, percentile: percentile}
  }
  catch ( err ) {
    console.log(`Error when calculating total IQ: ${err}`);
    throw err;
  }
}
