"use client";

import Temp from "@/app/components/Temp";
import {TracingProvider} from "@/app/context/tracingContext";


export default function Page() {
    return (
        <>
            <TracingProvider>
                <Temp></Temp>
            </TracingProvider>
        </>
    );
}
