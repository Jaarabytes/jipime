import { NextApiRequest, NextApiResponse } from "next";
import mailgun from "mailgun-js"
// receives complains and forwards them to my stupid mail

// declare mailgun variables
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: "mydomain.com"
})


export default async function handler (req: NextApiRequest, res:NextApiResponse ) {
    if (req.method == "POST") {
        const { complaint } = req.body;
        try {
            await mg.messages().send({
                from: "Jipime user",
                to: "xh3rking96@gmail.com",
                subject: "Jipime complaint",
                text: complaint,
            });
            res.status(200).json({message: "Email sent successfully"})
        }
        catch ( err ) {
            res.status(500).json({error: "Failed to send mail"});
            console.error("Error when sending mail", err)
        }
    }
    else {
        res.status(405).json({error: "Method NOT ALLOWED"})
    }
}