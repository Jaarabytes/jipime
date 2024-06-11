import { NextApiRequest, NextApiResponse } from "next";
import checkValidity from "@/pages/api/checkValidity";
const TestThreeAnswers = ["fleeting", "artist", "magnanimous", "sculpture", "True", "Box that has misfortunes and hope trapped inside",
         "False", "Cultural trend", "Economy", "argue with the opposite"];
const TestTwoAnswers = ["True", "False", "False", "False", "True", "False", "True", "False", "True"];
const TestOneAnswers = ["False", "True", "True", "False", "False", "False", "True", "True", "False", "True"];

export default async function handler (req: NextApiRequest, res:NextApiResponse ){
    if ( req.body === "POST" ) {
        const { test1, test2, test3 } = req.body;

        if ( !test1 || !test2 || !test3 ) {
            return res.status(400).json({ error: "All form data must be provided"})
        }

        const testOneScore = checkValidity( test1, TestOneAnswers )
        const testTwoScore = checkValidity( test2, TestTwoAnswers )
        const testThreeScore = checkValidity( test3, TestThreeAnswers )

        const totalScore =  testOneScore + testTwoScore  + testThreeScore;
        // add time factor and initialIQ (from age)
        return res.status(200).json({ totalScore });
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}