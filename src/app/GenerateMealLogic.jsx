"use client"; // client component

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GenerateMealLogic() {
  // Track if the user is new (hasn't completed meal plan setup)
  const [isNewUser, setIsNewUser] = useState(false);

  const router = useRouter(); // Used to navigate to multi-step form

  useEffect(() => {
    // Check if user setup was completed before (mocked using localStorage)
    const setupComplete = localStorage.getItem("setupComplete");

    // If not found, this is a new user
    if (!setupComplete) {
      setIsNewUser(true);
    }
  }, []);

  // Called when the "Generate" button is clicked
  const handleGenerate = () => {
    localStorage.setItem("setupComplete", "true"); // Mark setup as done
    router.push("/create-account"); // Redirect to multi-step form
  };

  return (
    <div className="mt-6 text-center">
      {isNewUser ? (
        // Show the "Generate" button if this is a new user
        <Button
          className="bg-lime-500 hover:bg-lime-600 text-white text-xl px-6 py-4"
          onClick={handleGenerate}
        >
          Generate Meal
        </Button>
      ) : (
        // Otherwise, show placeholder meal plan data (R eplace with real cards later)
        <div className="grid gap-4">
          <p className="text-lg mb-4">Here’s your personalized meal plan:</p>
          <div className="border p-4 rounded shadow bg-white">🍜 KBBQ</div>
          <div className="border p-4 rounded shadow bg-white">🥗 Veggie Bowl</div>
        </div>
      )}
    </div>
  );
}
