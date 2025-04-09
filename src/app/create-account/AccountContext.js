import { createContext, useState } from "react";

export const AccountContext = createContext({
    currentStep: 0,
    setCurrentStep: () => {},
});

export function AccountProvider({ children }) {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <AccountContext.Provider value={{ currentStep, setCurrentStep }}>
            {children}
        </AccountContext.Provider>
    );
}
