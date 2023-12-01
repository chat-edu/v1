import {updateNote} from "@/cosmosPostgres/services/notes";

import {NextRequest} from "next/server";

import {NoteIdParams} from "@/app/api/notes/[noteId]/NoteIdParams";
import {NoteInput} from "@/types/Note";

export const PATCH = async (request: NextRequest, {params}: {params: NoteIdParams}) => {
    const {noteId} = params;

    if (!noteId) {
        return Response.json([]);
    }

    const note = await request.json();

    const updatedFields: Partial<NoteInput> = {};
    if (note.name) updatedFields.name = note.name;
    if (note.content) updatedFields.content = note.content;

    return Response.json(await updateNote(noteId, updatedFields));
}