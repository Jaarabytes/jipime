'use client'
import { useState } from "react"

export default function Loser () {
    const [ complaint, setComplaint ] = useState('')
    const handleSubmit = async ( e:any ) => {
        e.preventDefault();

        const response = await fetch('/api/complain' , {
            method: "POST",
            headers: {"Application-type": "json"},
            body: JSON.stringify({complaint})
        });
        if ( response.ok ) {
            alert('Complaint submitted succesfully');
            setComplaint('');
        }
        else {
            alert("Failed to submit complaint")
        }
    }
    return (
        <>
        {/* Make me responsive for mobile phones */}
            <div className="text-center my-5">
                <h1 className="font-bold text-3xl my-5">Thanks for participating!</h1>
                
                <form action="mailto:xavierandole@gmail.com" method="POST">
                    <label className="mt-10 mb-3">Please submit your complaints below</label>
                    <br />
                    <textarea placeholder="Submit them here and be short as possible" 
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    className="border-none w-96 h-72 text-black my-5"></textarea>
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