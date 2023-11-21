import {getNotebook} from "@/cosmos/services/notebooks";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export const GET = async (request: Request, {params}: {params: NotebookIdParams}) => {
    console.log(request);
    console.log(params.notebookId);
    return Response.json(await getNotebook(params.notebookId));
}
