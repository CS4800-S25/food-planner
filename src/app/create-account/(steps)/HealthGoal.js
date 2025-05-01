"use client";

import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../AccountContext";
import Image from "next/image";

function HealthGoal() {
    // Pull form data context
    const { formData, updateFormData } = useContext(AccountContext);
    const [goal, setGoalText] = useState(formData.healthGoal || "");

    // Update global form data when local goal changes
    useEffect(() => {
        updateFormData({ healthGoal: goal });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [goal]);

    return (

        <div className="relative w-full min-h-[200px]">

            {/* Left image */}
            <Image
                src="/step-visuals/3-dumpbell.png"
                alt="Dumpbell"
                className="absolute top-[90px] -left-[125px] w-[110px] hidden md:block z-10 pointer-events-none animate-wiggle"
                width={100}
                height={100}
            />
            {/* Right image */}
            <Image
                src="/step-visuals/3-salad.png"
                alt="Salad"
                className="absolute top-[90px] -right-[125px] w-[110px] hidden md:block z-10 pointer-events-none animate-wiggle"
                width={100}
                height={100}
            />

            <div className="space-y-6">
            {/* Section heading */}
                <h2 className="text-xl font-semibold text-center text-lime-700">
                What are your health goals?
                </h2>

            {/*  Optional description */}
                <p className="text-center text-gray-600">
                    Share anything you&apos;re working on, like losing weight,
                    building muscle, or eating cleaner.
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
            </div>
        </div>
    );
}

export default HealthGoal;
