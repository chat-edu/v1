import { generatePrompt } from "@/prompts/commands/generateMoteNotes";


import openai from "@/openai";

import {NoteIdParams} from "@/app/api/notes/[noteId]/NoteIdParams";
import {getNote} from "@/cosmosPostgres/services/notes";
import {getTopic} from "@/cosmosPostgres/services/topic";
import {getNotebook} from "@/cosmosPostgres/services/notebooks";

export const POST = async (req: Request, { params }: { params: NoteIdParams }) => {
    const note = await getNote(params.noteId);

    if(!note) {
        return Response.json({error: "Note not found"}, {status: 404});
    }

    const parentTopic = await getTopic(note.topic_id || 0);

    const notebook = await getNotebook(note.notebook_id);



    const prompt = generatePrompt(note, parentTopic, notebook);

    const response = await openai.chat.completions.create({
        model: process.env.GPT_MODEL_ID as string,
        messages: [{
            role: "system",
            content: prompt,
        }],
        response_format: {
            type: "json_object",
        },
    });

    if(response.choices[0].message.content === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(JSON.parse(response.choices[0].message.content).generatedContent);
}