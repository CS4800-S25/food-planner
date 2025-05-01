"use client";

import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../AccountContext";
import Image from "next/image";

function Budget() {
    const { formData, updateFormData } = useContext(AccountContext); // access formData and updater from context
    const [budget, setBudget] = useState(formData.budget || "");

    // push updates into shared context on every change
    useEffect(() => {
        updateFormData({ budget });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [budget]);

    return (

        <div className="relative w-full min-h-[200px]">

            <Image
                src="/step-visuals/5-coins.png"
                alt="Coins"
                width={100}
                height={100}
                className="absolute top-[90px] -left-[110px] hidden md:block z-10 pointer-events-non animate-wiggle"
            />
            <Image
                src="/step-visuals/5-money.png"
                alt="Money"
                width={110}
                height={110}
                className="absolute top-[90px] -right-[130px] hidden md:block z-10 pointer-events-none animate-wiggle"
            />

            <div className="space-y-6">
                {/* Step title */}
                <h2 className="text-xl font-semibold text-center text-lime-700">
                    What&apos;s your daily food budget?
                </h2>

                {/* Description text */}
                <p className="text-center text-gray-600">
                    We`ll use this to suggest ingredients and meals that fit your
                    needs.
                </p>

                {/* Input field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Budget per Day (USD)
                    </label>
                    <input
                        type="number"
                        min={1}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                    />
                </div>
            </div>
        </div>
    );
}

export default Budget;
