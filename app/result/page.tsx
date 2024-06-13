'use client'
import Upvote from "@/app/ui/home/Donate"
import { useState, useEffect } from "react"
export default function Result () {
    // soon to be the funniest component
    const [ userResults , setUserResults ] = useState({iq: null, deviation: null, percentile: 0});

    useEffect(() => {
        const fetchUserResults = () => {
            fetch ( "/api/total", {
                method: "GET",
            })
            .then((response) => {
                if ( response.ok ) {
                    return response.json()
                }else {
                    throw new Error("Error fetching results!")
                }
            }).then((data) => {
                console.log(data);
                setUserResults({iq:data.iq, deviation: data.deviation, percentile: data.percentile});
            }).catch((error) => {
                alert(error.message);
                console.error(error)
            })
            }
        fetchUserResults();
    }, [])
    return (
        <>
            <div className="text-center" style={{minHeight: "100vh"}}>
                <h2 className="font-bold text-3xl my-5">User results</h2>
                <h2 className="font-bold text-xl">Your IQ was measured to be {userResults.iq}</h2>
                <p>You IQ was measured to be <b>{userResults.iq}</b> which is equivalent to the <b>{Math.round(userResults.percentile)}</b>th percentile, 
                with a standard deviation of <b>{userResults.deviation}</b></p>
                <p>In a room filled with 1000 people, you'd be position <b>{Math.round(100 - userResults.percentile) * 10}</b></p>
                <p>Great test, yes? Give me money</p>
                <Upvote />
            </div>
        </>
    )
}