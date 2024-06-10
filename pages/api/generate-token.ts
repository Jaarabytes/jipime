import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const mpesaApiUrl = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
export type RequestExtended = NextApiRequest & { token?:string };

export default async function generateToken ( req: RequestExtended, res: NextApiResponse) {
    const consumerKey = process.env.CONSUMER_KEY;
    const consumerSecret = process.env.CONSUMER_SECRET;

    if ( !consumerKey || !consumerSecret ) {
        return res.status(400).json({error: "Missing MPESA API credentials"})
    }

    const encodedCredentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    try {
        const response = await axios(mpesaApiUrl, {
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        });
        req.token = response.data.access_token;
        console.log("Access token successfully generated")
        return res.status(200).json({response: response.data})
    }
    catch ( err: any ) {
        console.error("Failed to generate access token");
        return res.status(500).json({error: "Internal server error"})
    }
}