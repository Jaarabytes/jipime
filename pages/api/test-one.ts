import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, User } from "./connect";
import { parseCookies, Cookies } from "./cookieParser";
// computation for test one of the exams
// True False is part one of the test
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
        // calculating his/her score
        let testOneScore = 0;
        console.log("The request body is", req.body);
        const userChoices = JSON.parse(req.body);
        console.log("Values equals", userChoices);
        const answers = ["False", "True", "True", "False", "False", "False", "True", "True", "False", "True"];
        // initialize types
        type userChoices = {[key: string]: string};
        type answers = string[]
        // function to countercheck
        const checkValidity = ( userChoices: userChoices, answers: answers ) => {
            const values = Object.values(userChoices)
            for (let i = 0; i < values.length; i++ ){
                if (values[i] == answers[i]) {
                    testOneScore++
                }
            }
            console.log(testOneScore);
            return testOneScore;
        }
        checkValidity(userChoices, answers);
        const response = { testOneScore }
        console.log("The response is ", response)
        // find user and update testOneScore
        try {
            const user = await User.findOneAndUpdate({userId}, {testOneScore: response.testOneScore}, {new: true})
            if ( user ) {
                return res.status(200).json({message: "User updated successfully"});
            }
            else {
                return res.status(404).json({message: "User not found"})
            }

        }
        catch ( err ) {
            console.log("Error occured when submitting test-one", err);
            return res.status(500).json({error : "Internal server error"})
        }
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}