"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/fetchUserInfo";
import HomepageContent from "./HomepageContent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomepageClient() {
    const router = useRouter();
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
    if (!session) {
        router.push("/login");
        return null; // or a loading spinner, etc.
    }
    if (!data || !data.recipes) {
        return <HomepageContent meals={[]} email={email} session={session} />
    }

    return (
        <HomepageContent meals={data.recipes} email={email} session={session} />
    );
}
