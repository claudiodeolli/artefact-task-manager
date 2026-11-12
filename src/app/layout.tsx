import ApplicationHeader from "@/components/application-header/ApplicationHeader";
import ApplicationTrpcProvider from "@/trpc/client/ApplicationTrpcProvider";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Task Manager | Artefact Software Engineer Case",
    description: "A simple task management application built with Next.js 15, tRPC, and React.",
};

type RootLayoutProperties = {
    readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProperties) {
    return (
        <html lang="en">
            <body>
                <ApplicationTrpcProvider>
                    <ApplicationHeader />
                    <main className="applicationMain">{children}</main>
                </ApplicationTrpcProvider>
            </body>
        </html>
    );
}
