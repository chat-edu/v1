import {updateNote} from "@/cosmos/services/notes";

import {NextRequest} from "next/server";

import {NoteIdParams} from "@/app/api/notes/[notebookId]/[noteId]/NoteIdParams";
import {NoteInput} from "@/types/Note";

export const POST = async (request: NextRequest, {params}: {params: NoteIdParams}) => {
    // get the notebookId from the query string
    const {notebookId, noteId} = params;

    // if there is no notebookId, return an empty array
    if (!notebookId || !noteId) {
        return Response.json([]);
    }

    const note = await request.json();

    const updatedFields: Partial<NoteInput> = {};
    if (note.title) updatedFields.title = note.title;
    if (note.content) updatedFields.content = note.content;

    // otherwise, get the notes from the notebook
    return Response.json(await updateNote(noteId, notebookId, updatedFields));
}