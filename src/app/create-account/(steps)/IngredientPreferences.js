import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../AccountContext";

function IngredientPreferences() {
    
    const [ingredients, setIngredients] = useState(""); //local state to track the input

    const {updateFormData} = useContext(AccountContext) // global context to update form data

    // sync input with global context form data
    useEffect (() => {
        updateFormData({ ingredientPreferences: ingredients});
    }, [ingredients]);
    
    return (
    <div className="text-center">
        <h1 className="text-xl font-semibold text-center text-green-700">
            Hi there! Let’s begin by setting your ingredient preferences.
        </h1>
        <br/>

        <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Enter ingredients you'd like to include:"
        />


    </div>

    );
}

export default IngredientPreferences;
