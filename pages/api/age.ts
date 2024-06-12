// Create another TS file to store chartjs and its intricacies
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, User } from "./connect";
// Here we calculate IQ buddy

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if ( req.method == "POST" ) {
        await connectToDatabase();
        let starterIQ = 100;
        const { selectedAge, userId } = req.body;
        console.log(req.body)

        if ( selectedAge ){
            // I don't give out free points
            starterIQ += 2;
        }
        const newUser = new User({userId , starterIQ});
        await newUser.save();
        return res.status(200).json(newUser);
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}