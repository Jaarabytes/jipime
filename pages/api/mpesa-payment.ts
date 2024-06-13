import { timestamp } from "./timestamp";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { RequestExtended } from "@/pages/api/generate-token";
// fix the below URL
const stkPushUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

// phone number and amount are empty (burp suite)
// issue is request extended
export default async function handler( req: RequestExtended, res: NextApiResponse) {
    console.log("The request body is", JSON.parse(req.body))
    const { phone, amount } = JSON.parse(req.body);
    // add a business short code
    const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE as string;

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
    try {
        console.log("Payload is ", payload)
        console.log("Token is ", req.token)
        const response = await axios.post( stkPushUrl, payload, {
            headers: {
                Authorization: `Bearer ${req.token}`
            }
        })
        res.status(201).json({message: true, data: response.data})
    }
    catch ( err:any ) {
        console.error("Failed to initiate mpesa payment");
        res.status(500).json({error: "Failed to initiate mpesa payment"})
    }
}