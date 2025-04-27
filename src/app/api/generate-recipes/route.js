export const revalidate = 0; // Disable revalidation for this route
import OpenAI from "openai";
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
        model: "gpt-4.1-mini",
        input: [
            {
                role: "system",
                content: [
                    {
                        type: "input_text",
                        text: "Generate a list of recipes that align with the given factors: budget, health details, health goal, ingredient preference, and number of meals. Ensure that the number of recipes generated matches the number of meals specified.\n\n# Steps\n\n1. **Budget Consideration**: Identify ingredients and recipes that fit within the provided budget.\n2. **Health Details and Goal**: Consider the health details and goals, eg. low carb, high protein, vegetarian, etc., to align recipes with dietary needs.\n3. **Ingredient Preference**: Take into account any preferred or necessary ingredients to include in the recipes.\n4. **Match Number of Meals**: Generate a corresponding number of recipes to the specified number of meals.\n\n# Examples\n\n**Input**\n- Budget: $50\n- Health Details: Low carb\n- Health Goal: Weight loss\n- Ingredient Preference: Chicken, spinach\n- Number of Meals: 3\n\n# Notes\n\n- Ensure the total estimated cost of all meals does not exceed the budget provided.\n- Consider rotating recipes for variety if the same ingredient preference is present.",
                    },
                ],
            },
            {
                role: "user",
                content: [
                    {
                        type: "input_text",
                        text: `- Budget: ${budget}\n- Health Details: ${healthDetails}\n- Health Goal: ${healthGoal}\n- Ingredient Preference: ${ingredientPreferences}\n- Number of Meals: ${numberOfMeals}`,
                    },
                ],
            },
        ],
        text: {
            format: {
                type: "json_schema",
                name: "recipe_collection",
                schema: {
                    type: "object",
                    required: ["recipe_list"],
                    properties: {
                        final_answer: {
                            type: "array",
                            items: {
                                type: "object",
                                required: [
                                    "recipe_title",
                                    "instructions",
                                    "ingredients",
                                ],
                                properties: {
                                    ingredients: {
                                        type: "array",
                                        items: {
                                            type: "string",
                                            description:
                                                "An ingredient required for the recipe.",
                                        },
                                        description:
                                            "List of ingredients needed for the recipe.",
                                    },
                                    instructions: {
                                        type: "string",
                                        description:
                                            "Step-by-step instructions for making the recipe.",
                                    },
                                    recipe_title: {
                                        type: "string",
                                        description: "The title of the recipe.",
                                    },
                                },
                                additionalProperties: false,
                            },
                            description: "An array of recipe items.",
                        },
                    },
                    additionalProperties: false,
                },
                strict: true,
            },
        },
        reasoning: {},
        tools: [],
        temperature: 1,
        max_output_tokens: 2048,
        top_p: 1,
        store: false,
    });

    // const { recipe_list } = response.data;
}
