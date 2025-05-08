"use client";
import Link from "next/link";
import { AccountContext, AccountProvider } from "./AccountContext";
import { useContext } from "react";
import { Progress } from "@/components/ui/progress";
import IngredientPreferences from "./(steps)/IngredientPreferences";
import HealthDetails from "./(steps)/HealthDetails";
import HealthGoal from "./(steps)/HealthGoal";
import TotalMeals from "./(steps)/TotalMeals";
import Budget from "./(steps)/Budget";
import FinalizeAccount from "./FinalizeAccount";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/lib/fetchUserInfo";
import { useSession } from "next-auth/react";
import { addDoc, collection } from "firebase/firestore";
import db from "@/lib/firebase";

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

async function savePreferencesAndRedirect(userEmail, formData) {
    try {
        let checkUserExists = await fetchUserInfo(userEmail);
        if (checkUserExists) {
            const id = checkUserExists.id;

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
                email: userEmail,
                preferences: formData,
                timestamp: new Date(),
                recipes: recipeList.recipes,
            };

            await setDoc(doc(db, "userMealPlans", id), docData);
            console.log("Saved to Firebase!");
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
                email: userEmail,
                preferences: formData,
                timestamp: new Date(),
                recipes: recipeList.recipes,
            };

            await addDoc(collection(db, "userMealPlans"), docData);
            console.log("Saved to Firebase!");
        }
    } catch (error) {
        console.error("Error saving preferences:", error);
    }
}

function CreateAccount() {
    const router = useRouter();
    const { data: session } = useSession();
    const { currentStep, setCurrentStep, formData } =
        useContext(AccountContext); //currentStep and its setter from context
    const STEPS_LIMIT = 6; // number of steps

    // advance to the next step
    const handleNextStep = async () => {
        setCurrentStep((prevStep) => prevStep + 1);
        if (currentStep === STEPS_LIMIT - 1) {
            await savePreferencesAndRedirect(session.user.email, formData);

            setTimeout(() => {
                router.push("/"); // Redirect to homepage
            }, 2000);
        }
    };

    // go back to the previous step
    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    return (
        <div className="max-w-3xl mx-auto pt-32 min-h-[600px] space-y-6 p-6 border rounded shadow bg-white">
            <h1 className="text-2xl font-bold text-center">
                Let&apos;s Personalize Your Meal Plan
            </h1>
            <p className="text-center text-gray-600">
                Step {currentStep} of {STEPS_LIMIT}{" "}
            </p>

            {/* Step content */}
            <div className="mt-6 min-h-[280px] flex flex-col justify-center">
                {currentStep === 1 && <IngredientPreferences />}
                {currentStep === 2 && <HealthDetails />}
                {currentStep === 3 && <HealthGoal />}
                {currentStep === 4 && <TotalMeals />}
                {currentStep === 5 && <Budget />}
                {currentStep === 6 && <FinalizeAccount />}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-4">
                {currentStep > 1 ? (
                    <button
                        onClick={handlePreviousStep}
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                    >
                        ← Previous
                    </button>
                ) : (
                    <div className="w-[100px]" /> // This empty div holds space for alignment
                )}

                {currentStep < STEPS_LIMIT && (
                    <button
                        onClick={handleNextStep}
                        disabled={currentStep === STEPS_LIMIT}
                        className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
                    >
                        {currentStep === STEPS_LIMIT - 1 ? "Finish" : "Next →"}
                    </button>
                )}
            </div>

            {/* Progress bar */}
            <Progress
                value={((currentStep - 1) / (STEPS_LIMIT - 1)) * 100}
                className="w-full"
            />

            {/* Back to homepage */}
            {currentStep !== STEPS_LIMIT && (
                <div className="text-center mt-6">
                    <Link href="/" className="text-blue-600 underline">
                        Return to Home Page
                    </Link>
                </div>
            )}
        </div>
    );
}

export default function Page() {
    return (
        <AccountProvider>
            <CreateAccount />
        </AccountProvider>
    );
}
