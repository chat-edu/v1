import {getRankedNotebook} from "@/cosmosPostgres/services/scores";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export const GET = async (request: Request, {params}: {params: NotebookIdParams}) => {
    return Response.json(await getRankedNotebook(params.notebookId));
}