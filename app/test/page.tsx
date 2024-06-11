'use client'
import TrueFalse from "@/app/ui/test/TrueFalse"
import Patterns from "@/app/ui/test/Patterns"
import CriticalThink from "@/app/ui/test/CriticalThink"
import { TimerProvider } from "@/app/ui/Timer"
import { AppProps } from "next/app"
import { useState } from "react"

export default function Test({Component, pageProps}: AppProps) {
    // I don't want to make this full-stack since i'm wasting resources so results may just be implemented here
    const [ testOneData, setFormOneData ] = useState(null);
    const [ testTwoData, setFormTwoData ] = useState(null);
    const [ testThreeData, setFormThreeData ] = useState(null);
    const [ currentForm, setCurrentForm ] = useState(1);
    const [ totalScore, setTotalScore ] = useState<number | null>(null);

    const handleNextForm = (data: any) => {
        if ( currentForm === 1 ) setFormOneData(data);
        if ( currentForm === 2 ) setFormTwoData(data);
        if ( currentForm === 3 ) setFormThreeData(data);
        setCurrentForm(currentForm + 1);
    }

    const handleSubmitAllForms = async () => {
        const response = await fetch ( "/api/result", {
            method: "POST",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify({testOne: testOneData, testTwo: testTwoData, testThree: testThreeData})
        })
        const result = await response.json();
        setTotalScore(result.totalScore)
    }

    const renderForm = () => {
        switch ( currentForm ) {
            case 1: 
                return <TrueFalse onNext={handleNextForm}/>
            case 2:
                return <Patterns onNext={handleNextForm} />
            case 3:
                // onNext() is not here since after this test the user is redirected to the results page
                return <CriticalThink onNext={handleNextForm} />
            case 4:
                handleSubmitAllForms();
                return <p>Calculating total score ...</p>
            default:
                return null;
        }
    }
    return (
        <TimerProvider>
            {/* <TrueFalse {...pageProps} /> */}
            <>{renderForm()}</>
        </TimerProvider>
    )
}