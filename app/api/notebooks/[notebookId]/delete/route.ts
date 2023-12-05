import {deleteNotebook} from "@/cosmosPostgres/services/notebooks";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";
import {deleteNotebookIndexRows} from "@/search/notebooks/delete";

export const DELETE = async (request: Request, {params}: {params: NotebookIdParams}) => {
    const deleteSuccess = await deleteNotebook(params.notebookId);

    if(!deleteSuccess) return Response.json(false);

    await deleteNotebookIndexRows([params.notebookId.toString()])


    return Response.json(await deleteNotebook(params.notebookId));
}