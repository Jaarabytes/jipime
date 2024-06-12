import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, User } from "./connect";
import { parseCookies } from "./cookieParser";
import { Cookies } from "./cookieParser";
// computation for test three of the exams
// Critical Thinking is part three of the test
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
        let testThreeScore = 0;
        console.log("The request body is", req.body);
        const userChoices = JSON.parse(req.body);
        console.log("Values equals", userChoices);
        // create an array of answers and countercheck with values provided by user
        const answers = ["fleeting", "artist", "magnanimous", "sculpture", "True", "Box that has misfortunes and hope trapped inside",
         "False", "Cultural trend", "Economy", "argue with the opposite"];
        // initialize types
        type userChoices = {[key: string]: string};
        type answers = string[]
        // function to countercheck
        const checkValidity = ( userChoices: userChoices, answers: answers ) => {
            const values = Object.values(userChoices)
            // console.log("Mapped into, ",values);
            for (let i = 0; i < values.length; i++ ){
                if (values[i] == answers[i]) {
                    testThreeScore++
                }
            }
            console.log(testThreeScore);
            return testThreeScore;
        }
        checkValidity(userChoices, answers);
        const response = { testThreeScore }
         // find user and update testThreeScore
         try {
            const user = await User.findOneAndUpdate({userId}, {testThreeScore: response.testThreeScore}, {new: true})
            if ( user ) {
                return res.status(200).json({message: "User updated successfully"});
            }
            else {
                return res.status(404).json({message: "User not found"})
            }

        }
        catch ( err ) {
            console.log("Error occured when submitting test-three", err);
            return res.status(500).json({error : "Internal server error"})
        }
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}