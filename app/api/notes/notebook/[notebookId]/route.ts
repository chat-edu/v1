import {NextRequest} from "next/server";

import {findNotesByNotebookId} from "@/cosmosPostgres/services/notes";

import {NotebookIdParams} from "@/app/api/notes/notebook/[notebookId]/NotebookIdParams";

export const GET = async (request: NextRequest, {params}: {params: NotebookIdParams}) => {
    // get the notebookId from the query string
    const {notebookId} = params;

    // if there is no notebookId, return an empty array
    if (!notebookId) {
        return Response.json([]);
    }

    // otherwise, get the notes from the notebook
    return Response.json(await findNotesByNotebookId(notebookId));
}