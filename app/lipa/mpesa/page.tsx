import { MdKeyboardArrowUp } from "react-icons/md"

export default function LipaMpesa () {
    return (
        // add axios to facilitate senidng this and STK push
        <>
            <div className="text-center" style={{minHeight: "100vh"}}>
                <h1 className="font-bold text-lg my-5">Thanksss!</h1>
                <form action="/submit_form" method="POST">
                <label className="text-lg"> Phone Number: </label>
                <br />
                <br />
                <input type="tel" name="phoneNumber" placeholder="+254703405899" className="text-slate-900 rounded-sm py-3" required></input>
                <br />
                <br></br>
                <label className="text-lg" > Amount: </label>
                <br />
                <br></br>
                <input type="number" name="amount" placeholder="529" className="text-slate-900 rounded-sm py-3" required></input>
                <br />
                <button type="submit" 
                className="bg-green-900 my-5 rounded-lg text-white px-3 py-3 hover:bg-green-700"><MdKeyboardArrowUp
                 className="inline"/> Send <MdKeyboardArrowUp className="inline"/></button>
                </form>
            </div>
        </>
    )
}