import { timestamp } from "./timestamp";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { RequestExtended } from "@/pages/api/generate-token";
// fix the below URL
const stkPushUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

// fix the invalid phone number 
export default async function handler( req: RequestExtended, res: NextApiResponse) {
    const { phoneNumber, amount, token } = req.body;
    const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE as string;

    const password = Buffer.from( BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + timestamp).toString("base64");

    const payload = {
        BusinessShortCode : BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
        phoneNumber: phoneNumber,
        CallBackUrl: "https://localhost:3000/payment/callback",
        AccountReference: "Jipime app",
        TransactionDesc: "Payment"
    }
    try {
        console.log("Payload is ", payload)
        console.log("Token is ", token)
        const response = await axios.post( stkPushUrl, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("Response was", response)
        res.status(201).json({message: true, data: response.data})
    }
    catch ( err:any ) {
        console.error("Failed to initiate mpesa payment", err);
        res.status(500).json({error: "Failed to initiate mpesa payment"})
    }
}