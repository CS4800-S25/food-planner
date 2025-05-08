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
                const res = await fetch("/api/get-instructions", {
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

        console.log("meal passed to InstructionsModal:", meal);
        console.log("ingredients:", meal?.ingredients);

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
                        {loading ? (
                        <div className="flex flex-col items-center gap-2 py-4">
                            <svg
                                className="animate-spin h-6 w-6 text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8z"
                            ></path>
                            </svg>
                            <span className="text-gray-500 text-sm">Generating instructions...</span>
                        </div>
                            ) :  instructions}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );



}