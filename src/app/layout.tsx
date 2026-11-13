import ApplicationFooter from "@/components/application-footer/ApplicationFooter";
import ApplicationHeader from "@/components/application-header/ApplicationHeader";
import ApplicationTrpcProvider from "@/trpc/client/ApplicationTrpcProvider";
import type { Metadata } from "next";
import { Geist, Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import "./tokens.css";
import "./globals.css";

const interTight = Inter_Tight({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-inter-tight",
    display: "swap",
});

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
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
            className={`${interTight.variable} ${geist.variable}`}
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
