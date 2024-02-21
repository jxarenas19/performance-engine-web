"use client";

import Temp from "@/app/components/Temp";
import { AppProvider } from "@/app/context/AppContext";

export default function Page() {
  return (
    <>
      <AppProvider>
        <Temp></Temp>
      </AppProvider>
    </>
  );
}
