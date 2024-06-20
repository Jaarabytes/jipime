// Create another TS file to store chartjs and its intricacies
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, User } from "./connect";
import { parseCookies } from "./cookieParser";
import { Cookies } from "./cookieParser";
// Here we calculate IQ buddy

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if ( req.method == "POST" ) {
        await connectToDatabase();
        let starterIQ = 0;
        const { selectedAge } = req.body;
        console.log(req.body);
        // userId is no longer sent with the async request, it is now parsed from the req body
        const cookies: Cookies = parseCookies(req.headers);
        const userId = cookies.userId;
        console.log("User's cookies (user id) is: ", userId);
        if ( selectedAge ){
            // I don't give out free points
            starterIQ += 2;
        }
        const newUser = new User({userId , starterIQ});
        await newUser.save();
        console.log(`New user's id is ${userId} and his starterIQ is ${starterIQ}`);
        return res.status(200).json(newUser);
    }
    else {
        res.setHeader('Allow', ["POST"]);
        res.status(405).end(`Method ${req.method} not allowed`)
    }
}