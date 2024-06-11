'use client'
import React, { useEffect, useState, createContext, useContext, ReactNode, Component } from "react";

// define types
interface TimerContextType {
    currentTime : number,
    setCurrentTime : React.Dispatch<React.SetStateAction<number>>
}

const TimerContext = createContext<TimerContextType>({
    currentTime: 0,
    setCurrentTime: () => {}
})

// define TimerProvider Component
interface TimerProviderProps {
    children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> =  ({ children }) => {
    const [ currentTime, setCurrentTime ] = useState(0);
    // React is honestly just funny and stupid
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime((prevTime) => (prevTime + 1))
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    return (
        <TimerContext.Provider value={{ currentTime, setCurrentTime }}>
            { children }
        </TimerContext.Provider>
    )
}

export const useTimer = () => useContext(TimerContext);