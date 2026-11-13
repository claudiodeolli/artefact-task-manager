import ApplicationFooter from "@/components/application-footer/ApplicationFooter";
import ApplicationHeader from "@/components/application-header/ApplicationHeader";
import ApplicationTrpcProvider from "@/trpc/client/ApplicationTrpcProvider";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./tokens.css";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-ibm-plex-sans",
    display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["100", "400"],
    variable: "--font-ibm-plex-mono",
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
            className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
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
