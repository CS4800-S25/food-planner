"use client";
import { Button } from "@/components/ui/button";
async function getRecipeInfo(recipeName) {
    let apiFoodRequest = await fetch(`/api/recipe?recipeName=${recipeName}`);

    let response = await apiFoodRequest.json();
    console.log("Response:", response);
}

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

        let response = await apiFoodRequest.json();

        let { recipe_list } = JSON.parse(response);
        console.log("Response:", recipe_list);
    }


    return (
        <>
            <Button
                varient="outline"
                onClick={() => getRecipeInfo("Chinese Salad")}
            >
                Get Meal
            </Button>
            <Button varient="outline" onClick={() => generateRecipes()}>
                Get Recipes
            </Button>
        </>
    );
}

export default MealButton;
