'use client'
import TrueFalse from "@/app/ui/test/TrueFalse"
import { TimerProvider } from "@/app/ui/Timer"
export default function Test() {
    return (
        <TimerProvider>
                <TrueFalse />
        </TimerProvider>
    )
}