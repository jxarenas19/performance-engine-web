"use client";

import Temp from "@/app/components/Temp";
import {TracingProvider} from "@/app/context/tracingContext";
import {DashboardProvider} from "@/app/context/DashboardContext";


export default function Page() {
    return (
        <>
            <TracingProvider>
                <DashboardProvider>
                    <Temp></Temp>
                </DashboardProvider>
            </TracingProvider>
        </>
    );
}
