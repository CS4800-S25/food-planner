"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/lib/fetchUserInfo";

function Meals({ email }) {
    const router = useRouter();
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["grabUserMeals"],
        queryFn: () => fetchUserInfo(email),
    });

    useEffect(() => {
        if (!isPending && !isError && !data) {
            router.push("/create-account");
        }
    }, [data, isPending, isError, router]);

    if (isPending) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    if (!data) {
        return null;
    }

    return (
        <div>
            <h2>Meals</h2>
            <p>Budget: {data.preferences.budget}</p>
            <p>Health Goal: {data.preferences.healthGoal}</p>
            <p>Health Details: {data.preferences.healthDetails}</p>
            <p>Ingredient Preferences: {data.preferences.ingredientPreferences}</p>
            <p>Number of Meals: {data.preferences.numberOfMeals}</p>
        </div>
    );
}

export default Meals;
