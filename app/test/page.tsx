'use client'
import TrueFalse from "@/app/ui/test/TrueFalse"
import Patterns from "@/app/ui/test/Patterns"
import CriticalThink from "@/app/ui/test/CriticalThink"
import { TimerProvider } from "@/app/ui/Timer"
import { AppProps } from "next/app"
import { useState } from "react"

export default function Test({Component, pageProps}: AppProps) {
    const [ currentForm, setCurrentForm ] = useState(1);

    const handleNextForm = () => {
        setCurrentForm(currentForm + 1);
    }

    const renderForm = () => {
        switch ( currentForm ) {
            case 1: 
                return <TrueFalse onNext={handleNextForm}/>
            case 2:
                return <Patterns onNext={handleNextForm} />
            case 3:
                // onNext() is not here since after this test the user is redirected to the results page
                return <CriticalThink />
            default:
                return <TrueFalse onNext={handleNextForm} />
        }
    }
    return (
        <TimerProvider>
            {/* <TrueFalse {...pageProps} /> */}
            <>{renderForm()}</>
        </TimerProvider>
    )
}