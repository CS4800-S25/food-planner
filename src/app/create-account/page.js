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
import CreateAccountFirebase from "./CreateAccountFirebase";

function CreateAccount() {
    const { currentStep, setCurrentStep } = useContext(AccountContext); //currentStep and its setter from context
    const STEPS_LIMIT = 6; // unumber of steps

    // advance to the next step
    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    // go back to the previous step
    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };
    
    return (
        <div className="max-w-3xl mx-auto pt-32 min-h-[600px] space-y-6 p-6 border rounded shadow bg-white">
          <h1 className="text-2xl font-bold text-center">Let's Personalize Your Meal Plan</h1>
          <p className="text-center text-gray-600">Step {currentStep} of {STEPS_LIMIT} </p>
    
    
          {/* Step content */}
          <div className="mt-6 min-h-[280px] flex flex-col justify-center">
            {currentStep === 1 &&  <IngredientPreferences />}
            {currentStep === 2 && <HealthDetails />}
            {currentStep === 3 && <HealthGoal />}
            {currentStep === 4 && <TotalMeals />}
            {currentStep === 5 && <Budget />}
          </div>
    
          {/* Success message at final step */}
          {currentStep === STEPS_LIMIT && (
            <div className="text-center text-green-600 font-semibold text-xl">
              Account Created Successfully!
            </div>
          )}
    
          {/* Navigation buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              ← Previous
            </button>
    
            {currentStep < STEPS_LIMIT && (
              <button
                onClick={handleNextStep}
                disabled={currentStep === STEPS_LIMIT}
                className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
              >
                Next →
              </button>
            )}
          </div>
          

          {/* Progress bar */}
          <Progress
            value={((currentStep - 1) / (STEPS_LIMIT - 1)) * 100}
            className="w-full"
          />

    
          {/* Show Create Account Firebase button only at final step */}
          <div className="text-center mt-4">
            {currentStep === STEPS_LIMIT && <CreateAccountFirebase />}
          </div>
    
          {/* Back to homepage */}
          <div className="text-center mt-6">
            <Link href="/" className="text-blue-600 underline">
              Return to Home Page
            </Link>
          </div>
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
