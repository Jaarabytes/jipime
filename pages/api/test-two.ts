import { NextApiRequest, NextApiResponse } from "next";
import { User, connectToDatabase } from "./connect";
import { parseCookies } from "./cookieParser";
import { Cookies } from "./cookieParser";
// computation for test two of the exams
export default async function handler (req: NextApiRequest, res:NextApiResponse ){
    if ( req.method == "POST" ) {
        // connect to database
        console.log("Connecting to database")
        await connectToDatabase();
        // get the userId/ cookie value
        console.log("Getting cookies")
        const cookies: Cookies = parseCookies(req.headers);
        const userId = cookies.userId;
        console.log("The userId (cookie) is ", userId);
        let testTwoScore = 0;
        console.log("The request body is", req.body);
        const userChoices = JSON.parse(req.body);
        // Simple testTwoScore, delete later
        console.log("Values equals", userChoices);
        // create an array of answers and countercheck with values provided by user
        const answers = ["True", "False", "False", "False", "True", "False", "True", "False", "True"];
        // initialize types
        type userChoices = {[key: string]: string};
        type answers = string[]
        // function to countercheck
        const checkValidity = ( userChoices: userChoices, answers: answers ) => {
            const values = Object.values(userChoices)
            // console.log("Mapped into, ",values);
            for (let i = 0; i < values.length; i++ ){
                if (values[i] == answers[i]) {
                    testTwoScore++
                }
            }
            console.log(testTwoScore);
            return testTwoScore;
        }
        checkValidity(userChoices, answers);
        const response = { testTwoScore }
        await User.updateOne({ userId }, { $set: { testTwoScore: response.testTwoScore } }, { new: true });
        return res.status(200).json({response});
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}