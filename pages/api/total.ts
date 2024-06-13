import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, User } from "./connect";
import { parseCookies, Cookies } from "./cookieParser";
import { erf } from 'mathjs'
export default async function handler (req: NextApiRequest, res:NextApiResponse ){
// try to implement bonus points if user completes before expected time
// fix: user 404 when delivering results
// add suspense library for async requests
    if ( req.method == "GET" ) {
        try {
            // get cookies/userId
            const cookies: Cookies = parseCookies(req.headers);
            const userId = cookies.userId;
            // connect to database and find user
            await connectToDatabase();
            const user = await User.findOne({userId});
            console.log("user is ", user);
            if ( !user ) {
                return res.status(404).json({message: "User not found"})
            }
            // calculate user's iq
            const rawTotalScore = user.starterIQ + user.testOneScore + user.testTwoScore + user.testThreeScore;
            console.log(`Raw total score is ${rawTotalScore}/30`);
            const maxScore = 30; //yes, i know it's 29 but hey only i'm winning here
            const meanRawScore = 15 //(half of the total availabale score)
            const sdRawScore = 5 //satndard deviation for raw scores.
            // convert raw scores into z-scores
            const zScore = (rawTotalScore - meanRawScore) / sdRawScore;
            // convert sdscore into raw iq
            const iq = 100 + zScore * 15;
            // calculating percentile
            const calculatePercentile = (iq: number) => {
                const mean = 100;
                const standardDeviation = 15;
                const zScore = ( iq - mean ) / standardDeviation;
                const percentile = ( 1 + erf(zScore/Math.sqrt(2))) / 2 * 100;
                console.log("The percentile is", percentile)
                return percentile;
            }
            // calculating deviation
            const calculateDeviation = (iq: number) => {
                const mean = 100;
                const standardDeviation = 15;
                const deviation = ( iq - mean )/standardDeviation;
                console.log("The deviation is", deviation)
                return deviation;
            }
            console.log(iq);
            const percentile = calculatePercentile(iq)
            const deviation = calculateDeviation(iq);
            return res.status(200).json({iq: iq, deviation: deviation, percentile: percentile});
        }
        catch ( err ) {
            console.log("error when fetching user's results", err);
            return res.status(500).json({error: "Internal server error"})
        }
    }
    else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}