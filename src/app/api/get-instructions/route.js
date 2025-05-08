import OpenAI from "openai";

export async function POST(req) {
  const { title, ingredients } = await req.json();

  if (!title || !ingredients || ingredients.length === 0) {
    return new Response(JSON.stringify({ instructions: "Missing title or ingredients." }), {
      status: 400,
    });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `
You're a helpful recipe assistant. Write clear, step-by-step cooking instructions for the recipe:

Title: ${title}
Ingredients:
${ingredients.map((ing) => `- ${ing.name}: ${ing.amount}`).join("\n")}

Instructions:
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const instructions = response.choices?.[0]?.message?.content || "No instructions generated.";
    return new Response(JSON.stringify({ instructions }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    return new Response(
      JSON.stringify({ instructions: "Error generating instructions." }),
      { status: 500 }
    );
  }
}
