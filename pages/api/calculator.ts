// Create another TS file to store chartjs and its intricacies
import { NextApiRequest, NextApiResponse } from "next";
// Here we calculate IQ buddy

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if ( req.method == "POST" ) {
        let starterIQ = 100;
        const { selectedAge } = req.body;

        if ( selectedAge ){
            // I don't give out free points
            starterIQ += 2;
        }

        const response = { starterIQ };
        res.status(200).json({response});
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}