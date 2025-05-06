"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/fetchUserInfo";
import HomepageContent from "./HomepageContent";
import { useSession } from "next-auth/react";

export default function HomepageClient() {
    const { data: session } = useSession();
    const email = session?.user?.email || null;

    const { data, isLoading, error } = useQuery({
        queryKey: ["meals", email],
        queryFn: () => fetchUserInfo(email),
    });

    if (isLoading)
        return <div className="text-center mt-10">Loading meals...</div>;
    if (error)
        return (
            <div className="text-center text-red-500">
                Failed to load meals.
            </div>
        );

    return (
        <HomepageContent meals={data.recipes} email={email} session={session} />
    );
}
