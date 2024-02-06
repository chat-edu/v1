import openai from "@/openai";

import {NoteIdParams} from "@/app/api/notes/[noteId]/NoteIdParams";
import {getNote} from "@/cosmosPostgres/services/notes";
import {getTopic} from "@/cosmosPostgres/services/topic";

export const POST = async (req: Request, { params }: { params: NoteIdParams}) => {

    const note = await getNote(params.noteId);

    if(!note) {
        return Response.json({error: "Note not found"}, {status: 404});
    }

    const parentTopic = await getTopic(note.topic_id || 0);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [
            {
                role: "system",
                content: `
                    Your goal is to generate more content for a note about ${note.name} on the topic of ${parentTopic?.name}.

                    The note is ${note.content.length === 0 
                        ? "currently empty. Create a note that will be used to teach students." 
                        : `currently as follows: ${note.content}. Continue by adding more information to the note`
                    }

                    Provide a response in Markdown format.
                    
                    The response should be in the following JSON format:
                        
                    {
                        generatedContent: <string>
                    }
                `,
            }
        ],
        response_format: {
            type: "json_object",
        },
    });

    if(response.choices[0].message.content === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(JSON.parse(response.choices[0].message.content).generatedContent);
}