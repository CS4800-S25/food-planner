"use client";

import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../AccountContext";

function HealthGoal() {

    // Pull form data context
    const { formData, updateFormData } = useContext(AccountContext);
    const [goal, setGoalText] = useState(formData.healthGoal || "");
    
    
    // Update global form data when local goal changes
    useEffect(() => {
        updateFormData({ healthGoal: goal });
    }, [goal]);

    return (
        <div className="space-y-6">
            {/* Section heading */}
            <h2 className="text-xl font-semibold text-center text-lime-700">
                What are your health goals? 
            </h2>

            {/*  Optional description */}
            <p className="text-center text-gray-600">
                Share anything you're working on, like losing weight, building muscle, or eating cleaner.
            </p>

            {/* Textarea for custom goals */}
            <div>
                <label className="block text-gray-700 font-medium mb-1">
                    Your Goals
                </label>
                <textarea
                    value={goal}
                    onChange={(e) => setGoalText(e.target.value)}
                    placeholder="e.g. I want to lose some weight and/or eat more vegetables."
                    className="w-full border border-gray-300 rounded px-4 py-2 min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-lime-300"
                />
            </div>

            {/* 🛠️ Later: store goalText in context */}
            </div>
    );
}

export default HealthGoal;