import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const mpesaApiUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

export default async function handler ( req: NextApiRequest, res: NextApiResponse) {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_PASS_KEY;

    if (!consumerKey || !consumerSecret ) {
        return res.status(400).json({error: "Missing MPESA API credentials"})
    }

    const encodedCredentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

    try {
        const response = await axios.get(mpesaApiUrl, {
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        })
        return res.status(200).json({response: response.data})
    }
    catch ( err ) {
        console.error(err);
        return res.status(500).json({error: "Internal server error"})
    }
}