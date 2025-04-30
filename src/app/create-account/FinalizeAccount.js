"use client";

import { useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { AccountContext } from "./AccountContext";
import db from "@/lib/firebase";
import { fetchUserInfo } from "@/lib/fetchUserInfo";
import { useQueryClient } from "@tanstack/react-query";

async function generateRecipes(
    budget,
    healthDetails,
    healthGoal,
    ingredientPreferences,
    numberOfMeals
) {
    let apiFoodRequest = await fetch("/api/generate-recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            budget: budget,
            healthDetails: healthDetails,
            healthGoal: healthGoal,
            ingredientPreferences: ingredientPreferences,
            numberOfMeals: numberOfMeals,
        }),
    });
    let apiFoodResponse = await apiFoodRequest.json();
    return apiFoodResponse;
}

function FinalizeAccount() {
    const { data: session } = useSession(); // user session info from google sign-in
    const { formData } = useContext(AccountContext); // qll preferences entered in the steps
    // const [loading, setLoading] = useState(true);   // controls loading animation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [statusMessage, setStatusMessage] = useState(
        "Generating your personalized meals using AI..."
    );
    const queryClient = useQueryClient();
    const router = useRouter(); // for redirecting the user

    useEffect(() => {
        const savePreferencesAndRedirect = async () => {
            if (!session) {
                console.error("No session found. Cannot save preferences.");
                return;
            }

            try {
                const userEmail = session.user.email;
                console.log("User email:", userEmail);
                console.log("Form data:", formData);


                // compose full document to be saved in firestore
                let checkUserExists = await fetchUserInfo(userEmail);
                if (checkUserExists) {
                    console.log(
                        "User already exists in Firestore. Skipping save."
                    );
                    setStatusMessage("Account already exists! Redirecting...");
                } else {
                    let recipeList = await generateRecipes(
                        formData.budget,
                        formData.healthDetails,
                        formData.healthGoal,
                        formData.ingredientPreferences,
                        formData.numberOfMeals
                    );
                    console.log("Generated recipes!");

                    console.log(recipeList);
                    const docData = {
                        email: session.user.email,
                        name: session.user.name,
                        image: session.user.image,
                        preferences: formData,
                        timestamp: new Date(),
                        recipes: recipeList.recipes,
                    };

                    await addDoc(collection(db, "userMealPlans"), docData);
                    console.log("Saved to Firebase!");

                    setStatusMessage("All done! Redirecting...");
                }

                await queryClient.prefetchQuery({
                    queryKey: ["meals", userEmail],
                    queryFn: () => fetchMeals(userEmail),

                });



                // small delay before redirect
                setTimeout(() => {
                    router.push("/"); // Redirect to homepage
                }, 2000);

            } catch (error) {
                console.error("Error saving preferences:", error);
                setStatusMessage("Failed to save. Please try again.");
            }
        };

        savePreferencesAndRedirect();
    }, [session, formData, router, queryClient]);

    return (
        <div className="text-center text-green-700 font-semibold text-lg animate-pulse">
            <p> Generating your personalized meals using AI...</p>
            <p> All done! Redirecting...</p>
        </div>
    );
}

export default FinalizeAccount;
