"use client"; // client component

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { deleteMeals } from "@/lib/deleteMeals";

export default function GenerateMealLogic({ meals, email }) {
    const router = useRouter(); // Used to navigate to multi-step form

    const queryClient = useQueryClient(); // access cache manually

    const isNewUser = meals.length === 0;
    // Called when the "Generate" button is clicked
    const handleGenerate = () => {
        router.push("/create-account"); // Go to multi-step form
    };

    const handleReset = async () => {
        await deleteMeals(email); // delete from Firestore
        await queryClient.invalidateQueries({ queryKey: ["meals", email] }); // clear local cache
        router.refresh(); // reload page
    };

    return (
        <div className="mt-6 text-center">
            {isNewUser ? (
                <Button
                    className="bg-lime-500 hover:bg-lime-600 text-white text-xl px-10 py-10"
                    onClick={handleGenerate}
                >
                    Generate Meal
                </Button>
            ) : null}

            {/* Dev Reset Button */}
            <p></p>
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    variant="outline"
                    className="text-xs px-3 py-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                    onClick={handleReset}
                >
                    Reset User Status (Dev Only)
                </Button>
            </div>
        </div>
    );
}
