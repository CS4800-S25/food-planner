"use client"; 

import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../AccountContext";

function TotalMeals() {

    const { formData, updateFormData } = useContext(AccountContext);
    const [mealsPerDay, setMeals] = useState(formData.numberOfMeals || "");

    // push updates to shared context whenever value changes
    useEffect(() => {
        updateFormData({ numberOfMeals: mealsPerDay });
    }, [mealsPerDay]);

    return (
        <div className="space-y-6">
            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-lime-700">
                How many meals do you want per day? 
            </h2>

            {/* Description */}
            <p className="text-center text-gray-600">
                We'll use this to build your meal plan.
            </p>

            {/* Input field */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">
                    Number of Meals 
                </label>
                <input
                    type="number"
                    min={1}
                    max={6}
                    value={mealsPerDay}
                    onChange={(e) => setMeals(e.target.value)}
                    placeholder="e.g. 3"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                />
            </div>

        </div>
    );
}


export default TotalMeals;
