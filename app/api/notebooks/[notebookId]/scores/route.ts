import {findScoresByNotebookId} from "@/azure/cosmos/services/scores";

import {NextRequest} from "next/server";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

export const GET = async (request: NextRequest, {params}: {params: NotebookIdParams}) => {
    const {notebookId} = params;
    if (!notebookId) {
        return Response.json([]);
    }
    return Response.json(await findScoresByNotebookId(notebookId));
}