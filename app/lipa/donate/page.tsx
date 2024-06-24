'use client'
// integrate with Paystack, get their public key
import { MdKeyboardArrowUp } from "react-icons/md"
import { useState } from "react"
import { PaystackButton } from "react-paystack";
export default function Paystack () {
    const publicKey = process.env.PAYSTACK_LIVE_PUBLIC_KEY as string;
    const [ email, setEmail ] = useState("");
    const [ amount, setAmount ] = useState(0);
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ name, setName ] = useState('');
    const componentProps = {email, amount, metadata: {name, phoneNumber, custom_fields: []}, publicKey, text: "Donate",
        onSuccess: () => alert("Thanks for the donation!"),
        onClose: () => alert("Come on, PLEASE uWu")
    }
    return (
        <>
            <div className="text-center">
                <h1 className="font-bold text-lg my-5">Thankssss!</h1>
                    <label className="text-lg">Email address</label>
                    <br />
                    <br />
                    <input value={name} onChange={(e) => setName(e.target.value)}  type="email" className="p-3 rounded-sm text-black" placeholder="barneystinson@gmail.com" id="name" required />
                    <br />
                    <br />
                    <label className="text-lg">Name</label>
                    <br />
                    <br />
                    <input value={email} onChange={(e) => setEmail(e.target.value)}  type="name" className="p-3 rounded-sm text-black" placeholder="Barney Stinson" id="email-address" required />
                    <br />
                    <br />
                    <label className="text-lg">Phone Number</label>
                    <br />
                    <br />
                    <input onChange={(e) => setPhoneNumber(e.target.value)}  value={phoneNumber} type="tel" className="p-3 rounded-sm text-black" placeholder="+254703586983" id="phone-number" required />
                    <br />
                    <br />
                    <label className="text-lg">Amount</label>
                    <br />
                    <br />
                    <input value={amount} onChange={(e) => setAmount(Number(e.target.value))} type="number" className="p-3 rounded-sm text-black" placeholder="529" id="amount" required />
                    <br />
                    <br />
                    <PaystackButton {...componentProps} className="bg-purple-800 rounded-lg text-white p-3 my-5 hover:bg-purple-600" />
                <p className="my-10">Thank you so much <a href="https://paystack.com" target="_blank" className="text-red-400">Paystack</a></p>
            </div>
        </>
    )
}
{/* <script src="https://js.paystack.co/v1/inline.js"></script> */}