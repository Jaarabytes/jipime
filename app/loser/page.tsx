'use client'
import { useState } from "react"

export default function Loser () {
    const [ complaint, setComplaint ] = useState('')
    return (
        <>
        {/* Make me responsive for mobile phones */}
            <div className="text-center my-5" style={{minHeight: "100vh"}}>
                <h1 className="font-bold text-3xl my-5">Thanks for participating!</h1>
                
                <form action="mailto:xavierandole@gmail.com" method="POST">
                    <label className="mt-10 mb-3">Please submit your complaints below</label>
                    <br />
                    <textarea placeholder="Submit them here and be short as possible" 
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    className="border-none sm:w-96 w-80 h-72 sm:h-72 p-3 text-black my-5"></textarea>
                    <br />
                    <button className="text-white w-36 my-5 rounded-lg p-3 bg-red-700 hover:bg-red-900" type="submit" value="Submit">Submit</button>
                </form>

                <p>If you are a dev, even better (fix it yourself)</p>
                <a href="https://github.com/Jaarabytes/jipime"
                className="text-red-400 underline" target="_self">https://github.com/Jaarabytes/jipime</a>
            </div>
        </>
    )
}