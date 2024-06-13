import React from "react";
import { TimerProvider } from "@/app/ui/Timer";

export default function TestLayout ({children}: {children: React.ReactNode}) {
    return <TimerProvider>{children}</TimerProvider>
}