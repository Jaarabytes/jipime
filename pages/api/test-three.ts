import { NextApiRequest, NextApiResponse } from "next";
// computation for test three of the exams
// Critical Thinking is part three of the test
export default async function handler (req: NextApiRequest, res:NextApiResponse ){
    if ( req.method == "POST" ) {
        let testThreeScore = 0;
        console.log("The request body is", req.body);
        const userChoices = JSON.parse(req.body);
        // Simple testThreeScore, delete later
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
                // console.log(values[i] != answers[i])
            }
            console.log(testThreeScore);
            return testThreeScore;
        }
        checkValidity(userChoices, answers);
        const response = { testThreeScore }
        return res.status(200).json({response});
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}