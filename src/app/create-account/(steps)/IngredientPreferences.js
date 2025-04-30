import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../AccountContext";
import Image from "next/image";

function IngredientPreferences() {
    
    const { formData, updateFormData } = useContext(AccountContext);
    const [ingredients, setIngredients] = useState("");
    //const { updateFormData } = useContext(AccountContext); // global context to update form data

    useEffect(() => {
        if (formData?.ingredientPreferences) {
            setIngredients(formData.ingredientPreferences);
        }
    }, [formData]);

    // sync input with global context form data
    useEffect(() => {
        updateFormData({ ingredientPreferences: ingredients });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredients]);

    return (
        <div className="relative w-full min-h-[200px]">
            <Image
                src="/step-visuals/1-avocado.png"
                alt="Avocado"
                className="absolute top-[40px] -left-[110px] w-[100px] hidden md:block z-10 pointer-events-non animate-wiggle"
                width={100}
                height={100}
            />
            <Image
                src="/step-visuals/1-pepper.png"
                alt="Red Pepper"
                className="absolute top-[40px] -right-[110px] w-[100px] hidden md:block z-10 pointer-events-none animate-wiggle"
                width={100}
                height={100}
            />
            <div className="text-center">
                <h1 className="text-xl font-semibold text-center text-green-700">
                    Hi there! Let’s begin by setting your ingredient
                    preferences.
                </h1>
                <br />

                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 w-full"
                    placeholder="Enter ingredients you'd like to include:"
                />
            </div>
        </div>
    );
}

export default IngredientPreferences;
