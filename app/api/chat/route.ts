import {OpenAIStream, StreamingTextResponse} from 'ai';
import openai from "../../../llm/openai";

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  let stream = OpenAIStream(await openai.chat.completions.create({
    model: process.env.GPT_MODEL_ID as string,
    response_format: {
      type: 'json_object'
    },
    stream: true,
    messages: messages,
  }));

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
