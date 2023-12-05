import { OpenAIStream, StreamingTextResponse } from 'ai';
import openai from "@/openai";

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: process.env.GPT_MODEL_ID as string,
    response_format: {
      type: 'json_object'
    },
    stream: true,
    messages: messages,
  });

  // @ts-ignore
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

export async function OPTIONS() {
  return new Response(null, {
      status: 204,
  })
}
