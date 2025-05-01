"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { AccountContext } from "../AccountContext";

function HealthDetails() {
    // access the form context
    const { formData, updateFormData } = useContext(AccountContext);

    const [notes, setNotes] = useState(formData.healthDetails || "");

    // when notes change, sync to global formData
    useEffect(() => {
        updateFormData({ healthDetails: notes });
    }, [notes]);

    return (
        <div className="relative w-full min-h-[200px]">
            <Image
                src="/step-visuals/2-smoothie.png"
                alt="Smothie"
                width={100}
                height={100}
                className="absolute top-[75px] -left-[110px] hidden md:block z-10 pointer-events-non animate-wiggle"
            />
            <Image
                src="/step-visuals/2-allergy.png"
                alt="Allergy"
                width={110}
                height={110}
                className="absolute top-[100px] -right-[118px] hidden md:block z-10 pointer-events-none animate-wiggle"
            />
            <div className="space-y-6">
                {/* Section Title */}
                <h2 className="text-xl font-semibold text-center text-lime-700">
                    Health Considerations
                </h2>

                {/*  Instructions */}
                <p className="text-center text-gray-600">
                    Let us know about any health conditions or dietary
                    restrictions.
                </p>

                {/* Textarea for notes */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Health Notes
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. I’m diabetic and allergic to shellfish."
                        className="w-full border border-gray-300 rounded px-4 py-2 min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-lime-300"
                    />
                </div>
            </div>
        </div>
    );
}

export default HealthDetails;
