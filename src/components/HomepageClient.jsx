"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "@/lib/fetchMeals";
import HomepageContent from "./HomepageContent";

export default function HomepageClient({ email, session }) {
    const { data: meals, isLoading, error } = useQuery({
        queryKey: ["meals", email],
        queryFn: () => fetchMeals(email),
    });

    if (isLoading) return <div className="text-center mt-10">Loading meals...</div>;
    if (error) return <div className="text-center text-red-500">Failed to load meals.</div>;

    return <HomepageContent meals={meals} email={email} session={session} />;
}
