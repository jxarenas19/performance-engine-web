import type {Metadata} from "next";
import {Inter} from "next/font/google";
//import './globals.css'
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App"
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
