"use client";
import HomepageClient from "@/components/HomepageClient";
import { SessionProvider } from "next-auth/react";

export default function HomePage() {
    return (
        <>
            <SessionProvider>
                <HomepageClient />
            </SessionProvider>
        </>
    );
}
