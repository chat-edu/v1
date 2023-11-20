import {getNote} from "@/cosmos/services/notes";

import {NextRequest} from "next/server";

import {NoteIdParams} from "@/app/api/notes/[notebookId]/[noteId]/NoteIdParams";

export const GET = async (request: NextRequest, {params}: {params: NoteIdParams}) => {
    // get the notebookId from the query string
    const {notebookId, noteId} = params;

    // if there is no notebookId, return an empty array
    if (!notebookId || !noteId) {
        return Response.json([]);
    }

    // otherwise, get the notes from the notebook
    return Response.json(await getNote(noteId, notebookId));
}