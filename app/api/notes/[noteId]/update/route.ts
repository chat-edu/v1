import {updateNote} from "@/cosmosPostgres/services/notes";

import {NextRequest} from "next/server";

import {NoteIdParams} from "@/app/api/notes/[noteId]/NoteIdParams";
import {NoteInput} from "@/types/Note";

export const POST = async (request: NextRequest, {params}: {params: NoteIdParams}) => {
    // get the notebookId from the query string
    const {noteId} = params;

    // if there is no notebookId, return an empty array
    if (!noteId) {
        return Response.json([]);
    }

    const note = await request.json();

    const updatedFields: Partial<NoteInput> = {};
    if (note.name) updatedFields.name = note.name;
    if (note.content) updatedFields.content = note.content;

    // otherwise, get the notes from the notebook
    return Response.json(await updateNote(noteId, updatedFields));
}