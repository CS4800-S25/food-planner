"use client"; 

import { useState } from "react";

function TotalMeals() {

    const [meals, setMeals] = useState("");

    return (
        <div className="space-y-6">
            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-lime-700">
                How many meals do you want per day? 
            </h2>

            {/* Description */}
            <p className="text-center text-gray-600">
                We'll use this to build your weekly meal plan.
            </p>

            {/* Input field */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">
                    Number of Meals per Day
                </label>
                <input
                    type="number"
                    min={1}
                    max={6}
                    value={meals}
                    onChange={(e) => setMeals(e.target.value)}
                    placeholder="e.g. 3"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                />
            </div>

            {/* Later store this in context */}
            {/* TODO: Hook 'meals' into shared context */}
        </div>
    );
}


export default TotalMeals;
