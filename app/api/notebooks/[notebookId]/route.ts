import {getNotebook} from "@/azure/cosmos/services/notebooks";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export const GET = async (request: Request, {params}: {params: NotebookIdParams}) => {
    return Response.json(await getNotebook(params.notebookId));
}
