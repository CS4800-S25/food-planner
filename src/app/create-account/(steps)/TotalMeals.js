"use client";

import { useState, useEffect, useContext } from "react";
import { AccountContext } from "../AccountContext";
import Image from "next/image";

function TotalMeals() {
    const { formData, updateFormData } = useContext(AccountContext);
    const [mealsPerDay, setMeals] = useState(formData.numberOfMeals || "");

    // push updates to shared context whenever value changes
    useEffect(() => {
        updateFormData({ numberOfMeals: mealsPerDay });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mealsPerDay]);

    return (

        <div className="relative w-full min-h-[200px]">

            {/* Left image */}
            <Image
                src="/step-visuals/4-noodles.png"
                alt="Noodles"
                className="absolute top-[70px] -left-[125px] w-[110px] hidden md:block z-10 pointer-events-none animate-wiggle"
                width={100}
                height={100}
            />
            {/* Right image */}
            <Image
                src="/step-visuals/4-cart.png"
                alt="Cart"
                className="absolute top-[70px] -right-[125px] w-[110px] hidden md:block z-10 pointer-events-none animate-wiggle"
                width={100}
                height={100}
            />

            <div className="space-y-6">
                {/* Title */}
                <h2 className="text-xl font-semibold text-center text-lime-700">
                    How many meals do you want per day?
                </h2>

                {/* Description */}
                <p className="text-center text-gray-600">
                    We&apos;ll use this to build your meal plan.
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
        </div>
    );
}

export default TotalMeals;
