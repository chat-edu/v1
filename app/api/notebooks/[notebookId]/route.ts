import {getNotebook} from "@/cosmos/services/notebooks";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export const GET = async (request: Request, {params}: {params: NotebookIdParams}) => {
    console.log(params.notebookId);
    console.log(process.env.COSMOS_ENDPOINT);
    console.log(process.env);
    return Response.json(await getNotebook(params.notebookId));
}
