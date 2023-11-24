import {getNote} from "@/cosmosPostgres/services/notes";

import {NextRequest} from "next/server";

import {NoteIdParams} from "@/app/api/notes/[noteId]/NoteIdParams";

export const GET = async (request: NextRequest, {params}: {params: NoteIdParams}) => {
    // get the notebookId from the query string
    const {noteId} = params;

    // if there is no notebookId, return an empty array
    if (!noteId) {
        return Response.json([]);
    }

    // otherwise, get the notes from the notebook
    return Response.json(await getNote(noteId));
}