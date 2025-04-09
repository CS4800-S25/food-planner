"use client";
import Link from "next/link";
import { AccountContext, AccountProvider } from "./AccountContext";
import { useContext } from "react";
import { Progress } from "@/components/ui/progress";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

function CreateAccount() {
    const { currentStep, setCurrentStep } = useContext(AccountContext);
    const STEPS_LIMIT = 4;

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
                <Progress value={(currentStep / STEPS_LIMIT) * 100} className="w-1/2" />
                <button
                    onClick={handleNextStep}
                    disabled={currentStep === STEPS_LIMIT}
                >
                    Next Step
                </button>
            </div>
            <br />
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
            <br />

            {currentStep == 4 && (
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
