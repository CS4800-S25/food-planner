"use client"

import {useState } from "react";


function HealthDetails() {

    const [notes, setNotes] = useState("");

    return (
        <div className="space-y-6">
            {/* Section Title */}
            <h2 className="text-xl font-semibold text-center text-lime-700">
                Health Considerations 
            </h2>

            {/*  Instructions */}
            <p className="text-center text-gray-600">
                Let us know about any health conditions or dietary restrictions.
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
            {/*  Reminder for future state connection */}
            {/* TODO: Store this data in AccountContext later */}
        </div>
    );
}

export default HealthDetails;
