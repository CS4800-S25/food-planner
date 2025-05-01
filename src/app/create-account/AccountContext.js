"use client";

import { createContext, useState } from "react";


// the shape of the context and initial values
export const AccountContext = createContext({
    currentStep: 1,
    setCurrentStep: () => {},
    formData: {},               // holds all user inputs
    updateFormData: () => {},   // method to update inputs
});

// wraps the multi-step form and shares state across steps
export function AccountProvider({ children }) {
    const [currentStep, setCurrentStep] = useState(1); //start at step 1
    const [formData, setFormData] = useState({}); // stores all preferences

    
    // this merges new form values into formData
    // formData is a global object that stores everything the user enters. Each step updates this
    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData}));
    }

    return (
        <AccountContext.Provider value={{ currentStep, setCurrentStep, formData, updateFormData }}>
            {children}
        </AccountContext.Provider>
    );
}
