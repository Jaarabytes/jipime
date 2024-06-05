import { timestamp } from "@/pages/timestamp";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
// fix the below URL
const mpesaApiUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

export default async function handleStkPush( req: NextApiRequest, res: NextApiResponse) {
    const { phone, amount } = req.body;
    const BUSINESS_SHORT_CODE = process.env.BUSINESS_SHORT_CODE as string;

    const password = Buffer.from( BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + timestamp).toString("base64");

    const payload = {
        BusinessShortCode : BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
        phoneNumber: phone,
        CallBackUrl: "https://localhost:3000/payment/callback",
        AccountReference: "Jipime app",
        TransactionDesc: "Payment"
    }

    // // Verify the validity of the above
    // let accessToken;
    // // get the access token

    // if ( !accessToken ) {
    //     return res.status(401).json({error: 'Missing access token'});
    // }
    try {
        const response = await axios.post( mpesaApiUrl, payload, {
            headers: {
                Authorization: `Bearer ${req.token}`
            }
        })
        res.status(201).json({message: true, data: response.data})
    }
    catch ( err ) {
        console.error(err);
        res.status(500).json({error: "Failed to initiate mpesa payment"})
    }
}