"use client";
import Link from "next/link";
import { AccountContext, AccountProvider } from "./AccountContext";
import { useContext } from "react";
import { Progress } from "@/components/ui/progress";
import AccountCredentials from "./(steps)/AccountCredentials";
import IngredientPreferences from "./(steps)/IngredientPreferences";
import HealthDetails from "./(steps)/HealthDetails";
import HealthGoal from "./(steps)/HealthGoal";
import TotalMeals from "./(steps)/TotalMeals";
import Budget from "./(steps)/Budget";

function CreateAccount() {
    const { currentStep, setCurrentStep } = useContext(AccountContext);
    const STEPS_LIMIT = 6;

    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };
    return (
        <>
            <h1>Create Account Workflow Page</h1>
            <p>Current Step: {currentStep}</p>
            <div className="flex justify-evenly items-center">
                <button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 0}
                >
                    Previous Step
                </button>
                <Progress
                    value={(currentStep / STEPS_LIMIT) * 100}
                    className="w-1/2"
                />
                <button
                    onClick={handleNextStep}
                    disabled={currentStep === STEPS_LIMIT}
                >
                    Next Step
                </button>
            </div>
            <br />
            {currentStep === 0 && <AccountCredentials />}
            {currentStep === 1 && <IngredientPreferences />}
            {currentStep === 2 && <HealthDetails />}
            {currentStep === 3 && <HealthGoal />}
            {currentStep === 4 && <TotalMeals />}
            {currentStep === 5 && <Budget />}
            <br />

            {currentStep == STEPS_LIMIT && (
                <div className="text-center text-2xl font-bold">
                    Account Created Successfully!
                </div>
            )}

            <Link href="/">Return to Home Page</Link>
        </>
    );
}

export default function Page() {
    return (
        <AccountProvider>
            <CreateAccount />
        </AccountProvider>
    );
}
