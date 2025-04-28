"use client"; // client component

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMeals } from "@/lib/fetchMeals";
import { Button } from "@/components/ui/button";
import { deleteMeals }  from "@/lib/deleteMeals";

export default function GenerateMealLogic({ email}) {
  const router = useRouter(); // Used to navigate to multi-step form


    const queryClient = useQueryClient(); // access cache manually

    const { data: meals, isLoading, error } = useQuery({
      queryKey: ["meals", email],
      queryFn: () => fetchMeals(email),
    });

    if (isLoading) {
      return <div>Loading meals...</div>;
    }

    if (error) {
      return <div>Error loading meals.</div>;
    }

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
            <Button
                variant="outline"
                className="mt-4"
                onClick={handleReset}
            >
                Reset User Status (Dev Only)
            </Button>
        </div>
  );
}
