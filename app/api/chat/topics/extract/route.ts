import openai from "@/openai";

import {extractTopicsPrompt} from "@/prompts/topics";

export const runtime = 'edge';

export async function POST(req: Request) {
    const { text } = await req.json();

    const content = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "user",
                content: extractTopicsPrompt(text),
            }
        ],
        response_format: {
            type: "json_object",
        }
    })
        .then((response) => response.choices[0].message.content)
        .catch(() => "An error occurred.")

    return Response.json(content ? JSON.parse(content).topics : [], {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
    })
}