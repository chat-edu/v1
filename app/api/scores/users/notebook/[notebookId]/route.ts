import {findScoresByNotebookId} from "@/cosmosPostgres/services/scores";

import {NotebookIdParams} from "@/app/api/scores/users/notebook/[notebookId]/NotebookIdParams";

export const GET = async (request: Request, {params}: {params: NotebookIdParams}) => {
    return Response.json(await findScoresByNotebookId(params.notebookId));
}