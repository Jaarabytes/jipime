import React, { useEffect, useState } from "react";

export default function Timer() {
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });
    const [limitReached, setLimitReached] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime((prevTime) => {
                const { minutes, seconds } = prevTime;
                if (seconds === 59) {
                    if (minutes === 29) {
                        setLimitReached(true);
                        clearInterval(intervalId);
                        return prevTime;
                    }
                    return { minutes: minutes + 1, seconds: 0 };
                } else {
                    return { ...prevTime, seconds: seconds + 1 };
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleCloseAlert = () => setLimitReached(false);

    return (
        <>
            <div className="text-3xl m-5 text-center">
                {time.minutes.toString().padStart(2, '0')}:{time.seconds.toString().padStart(2, "0")}
            </div>
            {limitReached && (
                <div className="alert">
                    Time limit reached!
                    <button onClick={handleCloseAlert}>Close</button>
                </div>
            )}
        </>
    );
}
