import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, User } from "./connect";
import { parseCookies, Cookies } from "./cookieParser";
export default async function handler (req: NextApiRequest, res:NextApiResponse ){
// try to implement bonus points if user completes before expected time
// fix: user 404 when delivering results
// add suspense library for async requests
    if ( req.method == "GET" ) {
        try {
            // get cookies/userId
            const cookies: Cookies = parseCookies(req.headers);
            const userId = cookies.userId;
            // connect to database
            await connectToDatabase();
            const user = await User.findOne({userId}, { projection: { starterIQ: 1, testOneScore: 1, testTwoScore: 1, testThreeScore: 1 } });
            if ( !user ) {
                return res.status(404).json({message: "User not found"})
            }
            return res.status(200).json({message: "results are here"});
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