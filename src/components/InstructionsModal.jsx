"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";


export default function InstructionsModal({isOpen, onClose, meal}) {
    const [instructions, setInstructions] = useState("Loading...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!meal || !meal.title || !meal.ingredients) return;

        const fetchInstructions = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/getInstructions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: meal.title,
                        ingredients: meal.ingredients
                    })
                });

                const data = await res.json();
                setInstructions(data.instructions || "No instructions found.");

            } catch (error) {
                setInstructions("Error loading instructions.");
            } finally {
                setLoading(false);
            }
        };

        fetchInstructions();
    }, [meal])


    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel
                    className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg"
                >
                    
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-2xl font-bold">
                            How to Cook: {meal.title}
                        </Dialog.Title>
                        <button
                            onClick={onClose}
                            className="text-2xl font-bold text-gray-600"
                        >
                            &times;
                        </button>
                    </div>

                    
                    <div className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                        {loading ? "Loading instructions..." : instructions}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );



}