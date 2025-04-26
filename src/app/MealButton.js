"use client";
import { Button } from "@/components/ui/button";
async function getRecipeInfo(recipeName) {
    let apiFoodRequest = await fetch(`/api/recipe?recipeName=${recipeName}`);

    let response = await apiFoodRequest.json();
    console.log("Response:", response);
}
function MealButton() {
    return (
        <Button varient="outline" onClick={() => getRecipeInfo("Chinese Salad")}>
            Get Meal
        </Button>
    );
}

export default MealButton;
