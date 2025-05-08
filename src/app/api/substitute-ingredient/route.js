export const revalidate = 0; // Disable revalidation for this route
import OpenAI from "openai";

export async function POST(request) {
    const res = await request.json();
    if (!res) {
        return new Response("No data provided", { status: 400 });
    }
    const {
        title,
        servings,
        ingredients,
        healthDetails,
        replace,
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
    Given a meal's ingredients, an individual's health details, and an ingredient to substitute, find a suitable replacement ingredient and its quantity.

    # STEPS

    1. Analyze the meal's ingredients.
    2. Consider the individual's health goals.
    3. Identify a replacement ingredient.
    4. Determine based on the original ingredient the quantity for the new one.

    ## INPUT FORMAT
    title: this is the name of a meal
    servings: the number of serving the ingredient quantities will serve
    ingredients: an array of ingredients and their quantity
    healthDetails: requirement for determining ingredient substitution 
    replace: the ingredient you must replace

    ## INPUT FOR SUBSTITUTION
    title: ${title}
    servings: ${servings}
    ingredients: ${JSON.stringify(ingredients)}
    healthDetails: ${healthDetails}
    replace: ${JSON.stringify(replace)}

    ## OUTPUT FORMAT
    {
        "ingredient": "...string name of ingredient",
        "amount": ...integer amount of ingredient
    }`
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
                    required: [
                        "ingredient",
                        "quantity"
                    ],
                    properties: {
                        quantity: {
                            type: "string",
                            description: "The quantity of the ingredient."
                        },
                        ingredient: {
                            type: "string",
                            description: "The name of the ingredient."
                        }
                    },
                    additionalProperties: false
                }
            }
        },
        reasoning: { effort: "low" },
        tools: [],
        store: true
    });

    let ai_substitution = JSON.parse(response.output_text);

    let {
        quantity,
        ingredient
    } = ai_substitution;

    return new Response(
        JSON.stringify({
            quantity: quantity ? quantity : -1,
            ingredient: ingredient ? ingredient : "",
            message: ai_substitution
                ? "Ingredient substitution found"
                : "No ingredient substitution found",
            }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}
