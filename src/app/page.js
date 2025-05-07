"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/fetchUserInfo";
import HomepageContent from "@/components/HomepageContent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const email = session?.user?.email;

    const { data, isLoading, error } = useQuery({
        queryKey: ["meals", email],
        queryFn: () => fetchUserInfo(email),
        enabled: !!email, // Only run query when email exists
    });

    // Handle session loading state
    if (status === "loading") {
        return <div className="text-center mt-10">Loading session...</div>;
    }

    // Handle unauthenticated users
    if (status === "unauthenticated") {
        router.push("/login");
        return null;
    }

    // Handle query loading and error states
    if (isLoading) {
        return <div className="text-center mt-10">Loading meals...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                Failed to load meals: {error.message}
            </div>
        );
    }

    // Render content when everything is loaded
    return (
        <HomepageContent 
            meals={data?.recipes || []} 
            email={email} 
            session={session} 
        />
    );
}