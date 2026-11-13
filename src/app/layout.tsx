import ApplicationFooter from "@/components/application-footer/ApplicationFooter";
import ApplicationHeader from "@/components/application-header/ApplicationHeader";
import ApplicationTrpcProvider from "@/trpc/client/ApplicationTrpcProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import type { ReactNode } from "react";
import "./tokens.css";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-instrument-serif",
    display: "swap",
});

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
    display: "swap",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Task Manager | Artefact Software Engineer Case",
    description: "An in-memory task ledger built with Next.js 15, tRPC, React, and TypeScript.",
};

type RootLayoutProperties = {
    readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProperties) {
    return (
        <html
            lang="en"
            className={`${instrumentSerif.variable} ${geist.variable} ${geistMono.variable}`}
        >
            <body>
                <a href="#main-content" className="skipLink">
                    Skip to content
                </a>
                <ApplicationTrpcProvider>
                    <div className="applicationLayout">
                        <ApplicationHeader />
                        <main id="main-content" className="applicationMain" tabIndex={-1}>
                            {children}
                        </main>
                        <ApplicationFooter />
                    </div>
                </ApplicationTrpcProvider>
            </body>
        </html>
    );
}
