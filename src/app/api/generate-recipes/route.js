export const revalidate = 0; // Disable revalidation for this route
import OpenAI from "openai";
async function getRecipeFromAPI(
    query, 
    cuisine,
    excludeCuisine, 
    diet, 
    intolerances, 
    includeIngredients, 
    excludeIngredients, 
    number = 1
) {
    // create a URLSearchParams object
    const params = new URLSearchParams({
        query: query || "",
        number: number.toString(),
        addRecipeInformation: true,
        addRecipeNutrition: true,
        addRecipeInstructions: true,
        instructionsRequired: true,
        minServingSize: "1"
    });
    if (cuisine) params.append("cuisine", cuisine);
    if (excludeCuisine) params.append("excludeCuisine", excludeCuisine);
    if (diet) params.append("diet", diet);
    if (intolerances) params.append("intolerances", intolerances);
    if (includeIngredients) params.append("includeIngredients", includeIngredients);
    if (excludeIngredients) params.append("excludeIngredients", excludeIngredients);

    // Make the API request
    const url = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`;
    console.log("FOOD API URL", url);
    const foodRequest = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.SPOONACULAR_API_KEY,
        },
    });
    let apiResponse = await foodRequest.json();
    if (!apiResponse || !apiResponse.results || apiResponse.results.length === 0) {
        return {
            recipeFound: false,
            recipes: [],
        };
    }

    let recipes = apiResponse.results.map(({ id, title, image, readyInMinutes, servings, pricePerServing }) => ({
        id,
        title,
        image,
        readyInMinutes,
        servings,
        pricePerServing,
    }));

    return {
        recipeFound: true,
        recipes,
    };
}

export async function POST(request) {
    const res = await request.json();
    if (!res) {
        return new Response("No data provided", { status: 400 });
    }
    const {
        budget,
        healthDetails,
        healthGoal,
        ingredientPreferences,
        numberOfMeals,
    } = res;
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.responses.create({
        model: "o4-mini",
        input: [
            {
                role: "developer",
                content: [
                    {
                        type: "input_text",
                        text: `# GOAL
    Generate a list of recipes that align with the given factors: budget, health details, health goal, ingredient preference, and number of meals. Ensure that the number of recipes generated matches the number of meals specified. The main task is to formulate a search query focusing on actual possible foods rather than abstract constraints, using the parameters to shape the search query effectively.

    # STEPS
    1. Query Construction: 
    - Focus on constructing a query based on actual possible foods. 
    - The query should be short, general, and centered on specific dish titles like "chicken and spinach" or "pasta salad"
    - Do not make sentences or phrases like "low carb chicken and spinach" or "healthy pasta salad"
    - It is better to be more abstract and general, e.g., "chicken and spinach" or "pasta salad" rather than specific constraints.
    - Avoid abstract constraints like "low carb."

    2. Budget Consideration: 
    - Identify ingredients and recipes that fit within the provided budget.

    3. Health Details and Goal: 
    - Consider the health details and goals, e.g., low carb, high protein, vegetarian, etc., to tailor recipes to dietary needs.
    - Convert the details to diet and intolerance choices (ref ## DIET CHOICES & ## INTOLERANCE CHOICES).

    4. Ingredient Preference: Take into account any preferred or necessary ingredients to include in the recipes.
    - Pass as a single string separated by commas.
    - If there are no preferences, do not make any assumptions about the ingredients.

    5. Match Number of Meals: 
    - Generate a corresponding number of recipes to the specified number of meals.

    # INPUT VARIABLES FOR GENERATION
    - Budget: ${budget || "N/A"}
    - Health Details: ${healthDetails || "N/A"}
    - Health Goal: ${healthGoal || "N/A"}
    - Ingredient Preference: ${ingredientPreferences || "N/A"}
    - Number of Meals: ${numberOfMeals || "N/A"}

    # OUTPUT DEFINITION
    {
    "query": "The (natural language) recipe search query focusing on possible foods.",
    "cuisine": "The cuisine(s) of the recipes. One or more, comma separated (will be interpreted as 'OR').",
    "excludeCuisine": "The cuisine(s) the recipes must not match. One or more, comma separated (interpreted as 'AND').",
    "diet": "The diet(s) for which the recipes must be suitable. Comma means AND, pipe | means OR.",
    "intolerances": "A comma-separated list of intolerances. Recipes must not contain unsuitable ingredients.",
    "includeIngredients": "A comma-separated list of ingredients that should be used in the recipes.",
    "excludeIngredients": "A comma-separated list of ingredients the recipes must not contain.",
    "number": "The number of expected results (1-100)."
    }

    # CUISINE CHOICES
    African, Asian, American, British, Cajun, Caribbean, Chinese, Eastern European, European, French, German, Greek, Indian, Irish, Italian, Japanese, Jewish, Korean, Latin American, Mediterranean, Mexican, Middle Eastern, Nordic, Southern, Spanish, Thai, Vietnamese

    # DIET CHOICES
    Vegetarian, Lacto-Vegetarian, Ovo-Vegetarian, Vegan, Pescetarian, Paleo, Primal, Low FODMAP, Whole30

    # INTOLERANCE CHOICES
    Dairy, Egg, Gluten, Grain, Peanut, Seafood, Sesame, Shellfish, Soy, Sulfite, Tree Nut, Wheat`
                    }
                ]
            }
        ],
        text: {
            format: {
                type: "json_schema",
                name: "spoonacular_api",
                strict: false,
                schema: {
                    type: "object",
                    required: ["query"],
                    properties: {
                        query: {
                            type: "string",
                            description: "The (natural language) recipe search query."
                        },
                        cuisine: {
                            type: "string",
                            description: "The cuisine(s) of the recipes. One or more, comma separated (will be interpreted as 'OR')."
                        },
                        excludeCuisine: {
                            type: "string",
                            description: "The cuisine(s) the recipes must not match. One or more, comma separated (interpreted as 'AND')."
                        },
                        diet: {
                            type: "string",
                            description: "The diet(s) for which the recipes must be suitable. Comma means AND, pipe | means OR."
                        },
                        intolerances: {
                            type: "string",
                            description: "A comma-separated list of intolerances. Recipes must not contain unsuitable ingredients."
                        },
                        includeIngredients: {
                            type: "string",
                            description: "A comma-separated list of ingredients that should be used in the recipes."
                        },
                        excludeIngredients: {
                            type: "string",
                            description: "A comma-separated list of ingredients the recipes must not contain."
                        },
                        number: {
                            type: "integer",
                            minimum: 1,
                            maximum: 100,
                            description: "The number of expected results (1-100)."
                        },
                        addRecipeNutrition: {
                            type: "boolean",
                            description: "True or false boolean -  If true, adds nutritional information about each recipe."
                        }
                    },
                    additionalProperties: false
                }
            }
        },
        reasoning: { effort: "medium" },
        tools: [],
        store: true
    });

    let ai_recipe = JSON.parse(response.output_text);
    console.log("AI RECIPE", ai_recipe);

    let {
        query,
        cuisine,
        excludeCuisine,
        diet,
        intolerances,
        includeIngredients,
        excludeIngredients,
        number
    } = ai_recipe;

    // Get the recipe details from the API
    let recipeDetails = await getRecipeFromAPI(
        query,
        cuisine,
        excludeCuisine,
        diet,
        intolerances,
        includeIngredients,
        excludeIngredients,
        number
    );

    let result;

    if (!recipeDetails.recipeFound) {
        result = {
            recipes: [],
            error: "No recipes found",
        };
    } else {
        result = {
            recipes: recipeDetails.recipes,
        };
    }

    return new Response(
        JSON.stringify({
            result,
            message: "Recipes generated successfully",
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
