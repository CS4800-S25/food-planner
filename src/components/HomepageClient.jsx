"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/fetchUserInfo";
import HomepageContent from "./HomepageContent";

export default function HomepageClient({ email, session }) {
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
