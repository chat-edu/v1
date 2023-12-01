import openai from "@/openai";
import {topicsPrompt} from "@/prompts/topics";

export const runtime = 'edge';

export async function POST(req: Request) {
    const { text } = await req.json();

    const content = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "user",
                content: topicsPrompt(text),
            }
        ],
    })
        .then((response) => response.choices[0].message.content)
        .catch(() => "An error occurred.")

    return Response.json(content ? JSON.parse(content).topics : []);
}
