import { NextApiRequest, NextApiResponse } from "next";
// computation for test one of the exams
// True False is part one of the test
export default async function handler (req: NextApiRequest, res:NextApiResponse ){
    if ( req.method == "POST" ) {
        let testOneScore = 0;
        console.log("The request body is", req.body);
        // const {  } = req.body;
        // // Simple testOneScore, delete later
        // console.log("Values equals", values);
        // // create an array of answers and countercheck with values provided by user
        // const answers = [false, true, true, false, false, false, true, true, false, true];
        // const checkValidity = (values: any, answers: boolean[]) => {
        //     const keys = Object.keys(values)
        //     console.log(keys);
        //     for (let i = 0; i < Math.min(keys.length , answers.length); i++ ){
        //         const key = keys[i];
        //         if (values[key] == answers[i]) {
        //             testOneScore++
        //         }
        //     }
        //     console.log(testOneScore);
        //     return testOneScore;
        // }
        // checkValidity(values, answers);
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}