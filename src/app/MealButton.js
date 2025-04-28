"use client";
import { Button } from "@/components/ui/button";

function MealButton() {
    async function generateRecipes() {
        let apiFoodRequest = await fetch("/api/generate-recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                budget: 100,
                healthDetails: "vegetarian",
                healthGoal: "weight loss",
                ingredientPreferences: "chicken, broccoli",
                numberOfMeals: 5,
            }),
        });
        let apiFoodResponse = await apiFoodRequest.json();
        console.log(apiFoodResponse);
    }

    return (
        <>
            <Button varient="outline" onClick={() => generateRecipes()}>
                Get Recipes
            </Button>
        </>
    );
}

export default MealButton;
