'use client'
import { useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function LipaMpesa() {
    const [response, setResponse] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState(0);

    // Function that sends money
    const weka = async (e: any) => {
        e.preventDefault();
        try {
            const generateTokenResponse = await fetch('/api/generate-token', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!generateTokenResponse.ok) {
                throw new Error("Failed to generate token");
            }

            const tokenData = await generateTokenResponse.json();
            const token = tokenData.token;

            console.log("Successfully generated token");

            const stkPushResponse = await fetch('/api/mpesa-payment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ phoneNumber, amount })
            });

            if (!stkPushResponse.ok) {
                throw new Error("Failed to initiate STK push");
            }

            const data = await stkPushResponse.json();
            setResponse(data);
            alert("Payment initiated successfully");
        } catch (err) {
            console.error("Error when paying", err);
            alert("Payment initiation failed");
        }
    };

    return (
        <div className="text-center" style={{ minHeight: "100vh" }}>
            <h1 className="font-bold text-lg my-5">Thanksss!</h1>
            <form onSubmit={weka}>
                <label className="text-lg">Phone Number:</label>
                <br />
                <br />
                <input
                    type="tel"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    name="phoneNumber"
                    placeholder="+254703405899"
                    className="text-slate-900 rounded-sm py-3"
                    required
                />
                <br />
                <br />
                <label className="text-lg">Amount:</label>
                <br />
                <br />
                <input
                    type="number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    name="amount"
                    value={amount}
                    placeholder="529"
                    className="text-slate-900 rounded-sm py-3"
                    required
                />
                <br />
                <button
                    type="submit"
                    className="bg-green-900 my-5 rounded-lg text-white px-3 py-3 hover:bg-green-700"
                >
                    <MdKeyboardArrowUp className="inline" /> Send <MdKeyboardArrowUp className="inline" />
                </button>
            </form>
            {response && <div>Response: {JSON.stringify(response)}</div>}
        </div>
    );
}
