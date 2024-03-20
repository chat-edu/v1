import {generatePrompt} from "@/prompts/commands/generateMoteNotes";

import {NoteIdParams} from "@/app/api/notes/[noteId]/NoteIdParams";
import {getNote} from "@/cosmosPostgres/services/notes";
import {getTopic} from "@/cosmosPostgres/services/topic";
import {getNotebook} from "@/cosmosPostgres/services/notebooks";
import {generateWithSystemPrompt} from "@/llm";
import {Model} from "@/types/Model";

export const POST = async (req: Request, { params }: { params: NoteIdParams }) => {

    const body = await req.json();

    const note = await getNote(params.noteId);

    if(!note) {
        return Response.json({error: "Note not found"}, {status: 404});
    }

    const parentTopic = await getTopic(note.topic_id || 0);

    const notebook = await getNotebook(note.notebook_id);

    const prompt = generatePrompt(note, parentTopic, notebook);

    const content = await generateWithSystemPrompt(prompt, body.model || Model.OPENAI);

    if(content === "") {
        return Response.json({error: "No response"}, {status: 500});
    }

    return Response.json(JSON.parse(content).generatedContent);
}