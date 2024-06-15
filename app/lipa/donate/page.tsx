// integrate with Paystack, get their public key
import { MdKeyboardArrowUp } from "react-icons/md"
export default function Paystack () {

    // function for payments
    const payWithPaystack = async (e: any) => {

    }
    return (
        <>
            <div className="text-center">
                <h1 className="font-bold text-lg my-5">Thankssss!</h1>
                <form>
                    <label className="text-lg">Email address</label>
                    <br />
                    <br />
                    <input type="email" className="p-3 rounded-sm" placeholder="barneystinson@gmail.com" id="email-address" required />
                    <br />
                    <br />
                    <label className="text-lg">Amount</label>
                    <br />
                    <br />
                    <input className="p-3 rounded-sm" placeholder="529" id="amount" required />
                    <br />
                    <br />
                    <button type="submit" className="bg-purple-800 rounded-lg text-white p-3 my-5 hover:bg-purple-600"><MdKeyboardArrowUp 
                    className="inline" />Donate <MdKeyboardArrowUp className="inline" /></button>
                </form>
                <p className="my-10">Thank you so much <a href="https://paystack.com" target="_blank" className="text-red-400">Paystack</a></p>
            </div>
        </>
    )
}
{/* <script src="https://js.paystack.co/v1/inline.js"></script> */}