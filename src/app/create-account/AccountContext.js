import { createContext, useState } from "react";

export const AccountContext = createContext({
    currentStep: 1,
    setCurrentStep: () => {},
});

export function AccountProvider({ children }) {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <AccountContext.Provider value={{ currentStep, setCurrentStep }}>
            {children}
        </AccountContext.Provider>
    );
}
