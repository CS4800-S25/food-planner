"use client";

import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";

export default function MealModal({ isOpen, closeModal, meal }) {
    const [localMeal, setLocalMeal] = useState(meal);

    const handleDeleteIngredient = (index) => {
        const updatedIngredients = [...localMeal.ingredients];
        updatedIngredients.splice(index, 1); // remove 1 element at index
        setLocalMeal({ ...localMeal, ingredients: updatedIngredients });
    };

    const handleSubstituteIngredient = async (index) => {
        const updatedIngredients = [...localMeal.ingredients];
        
        const response = await fetch("/api/substitute-ingredient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: localMeal.title,
                servings: localMeal.servingSize,
                ingredients: localMeal.ingredients,
                healthDetails: localMeal.healthDetails,
                replace: localMeal.ingredients[index].name,
            }),
        });
        const apiSubstituteResponse = await response.json();

        if (apiSubstituteResponse) {
            const { quantity, ingredient, message } = apiSubstituteResponse;
            updatedIngredients[index] = {
                name: ingredient,
                amount: quantity,
            };
        }

        setLocalMeal({ ...localMeal, ingredients: updatedIngredients });
    };

    useEffect(() => {
        // whenever meal changes, update localMeal
        setLocalMeal(meal);
    }, [meal]);

    if (!meal) return null;

    console.log("Selected meal object:", meal);

    return (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-lg bg-white p-8 shadow-lg">
                    {/* Header with Title and Close Button */}
                    <div className="flex justify-between items-center mb-6">
                        <Dialog.Title className="text-3xl font-bold">
                            {meal.title}
                        </Dialog.Title>
                        <button
                            onClick={closeModal}
                            className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                            aria-label="Close"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Meal Details */}
                    <div className="space-y-4 text-gray-700">
                        <div className="flex justify-between">
                            <span className="font-semibold">Total Cost:</span>
                            <span>${((meal.price / 100) * meal.servingSize).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Serving Size:</span>
                            <span>{meal.servingSize}</span>
                        </div>
                    </div>

                    {/* INGREDIENTS SECTION */}
                    {localMeal && localMeal.ingredients && (
                        <div className="mt-6 space-y-2">
                            <h3 className="text-xl font-bold mb-2">
                                Ingredients:
                            </h3>
                            {localMeal.ingredients.map((ingredient, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center bg-gray-100 p-2 rounded"
                                >
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                handleSubstituteIngredient(idx)
                                            }
                                            className="text-blue-500 hover:text-blue-700"
                                            title="Substitute Ingredient"
                                        >
                                            🔄
                                        </button>
                                        <span>{ingredient.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span>{ingredient.amount}</span>
                                        <button
                                            onClick={() =>
                                                handleDeleteIngredient(idx)
                                            }
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete Ingredient"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => alert("Refresh Meal (coming soon)")}
                        >
                            Refresh Meal
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
