import {summarizePrompt} from "@/prompts/summarize";
import openai from "@/openai";
import {OpenAIStream, StreamingTextResponse} from "ai";

export const runtime = 'edge';

export async function POST(req: Request) {
    const { text } = await req.json();

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "user",
                content: summarizePrompt(text),
            }
        ],
        stream: true,
    })

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(
        stream, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        }
    );
}
