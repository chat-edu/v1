// ./app/api/chat/route.ts
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

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
  return new StreamingTextResponse(stream);
}