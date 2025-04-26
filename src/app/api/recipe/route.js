export const revalidate = 0; // Disable revalidation for this route
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const recipeName = searchParams.get("recipeName");
    if (!recipeName) {
        return new Response("Recipe name is required", { status: 400 });
    }

    let foodRequest = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&number=1&addRecipeInformation=true`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.SPOONACULAR_API_KEY,
            },
        }
    );
    let apiResponse = await foodRequest.json();
    if (!apiResponse) {
        return new Response("No recipe found", { status: 404 });
    }
    let recipe = apiResponse.results[0];

    return new Response(
        JSON.stringify({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            readyInMinutes: recipe.readyInMinutes,
            servings: recipe.servings,
            pricePerServing: recipe.pricePerServing,
        }),
        {
            status: 200,
            headers: { "Content-Type": "application/json" },
        }
    );
}
