'use client'
import Timer from "@/app/ui/Timer"
import TrueFalse from "@/app/ui/test/TrueFalse"
import CriticalThink from "@/app/ui/test/CriticalThink"
import Patterns from "@/app/ui/test/Patterns"
import { useRouter } from "next/navigation"

export default function Test() {
    return (
        // Add 20 minutes timer
        <>
        <div>
            <Timer />
            <TrueFalse />
            {/* <CriticalThink /> */}
            {/* <Patterns />  */}
            <div>

            </div>
        </div>
        </>
    )
}