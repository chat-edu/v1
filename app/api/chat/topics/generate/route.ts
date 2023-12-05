import openai from "@/openai";

import {generateNoteForTopicPrompt} from "@/prompts/topics";

export const runtime = 'edge';

export async function POST(req: Request) {
    const { text, topic } = await req.json();

    const content = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "user",
                content: generateNoteForTopicPrompt(topic, text),
            }
        ],
    })
        .then((response) => response.choices[0].message.content)
        .catch(() => "An error occurred.")

    return Response.json(content || "");
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
    })
}