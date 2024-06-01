import React, { useEffect, useState } from "react";


export default function Timer () {
    // Timer is 20 minutes, counts down from there
    const [remainingTime, setRemainingTime] = useState(60 * 20);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (remainingTime > 0) {
                // reducing time by the second
                setRemainingTime(prevTime => prevTime - 1);
            }
            else {
                clearInterval(intervalId);
            }
        }, 1000) //update each second
        return () => clearInterval(intervalId);
    }, [remainingTime])
    const minutes = Math.floor( remainingTime/ 60 );
    const seconds = remainingTime % 60;
    return (
        <>
            <div>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, "0")}</div>
        </>
    )
}