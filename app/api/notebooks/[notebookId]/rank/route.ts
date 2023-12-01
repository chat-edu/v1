import {getRankedNotebook} from "@/cosmosPostgres/services/scores";

import {NextRequest} from "next/server";
import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export const GET = async (request: NextRequest, {params}: {params: NotebookIdParams}) => {
    const {notebookId} = params;
    if(!notebookId) {
        return Response.json(null);
    }
    return Response.json(await getRankedNotebook(notebookId));
}