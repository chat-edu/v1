import {deleteNotebook} from "@/cosmosPostgres/services/notebooks";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export const DELETE = async (request: Request, {params}: {params: NotebookIdParams}) => {
    return Response.json(await deleteNotebook(params.notebookId));
}