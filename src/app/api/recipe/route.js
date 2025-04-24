export const revalidate = 0; // Disable revalidation for this route
export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const recipeName = searchParams.get("recipeName");

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
    console.log("Response:", apiResponse);
    if (!apiResponse) {
        return new Response("No recipe found", { status: 404 });
    }

    return new Response(JSON.stringify(apiResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
