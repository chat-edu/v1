import {NextRequest} from "next/server";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

import {findTagsByNotebookId} from "@/azure/cosmos/services/tags";

export const GET = async (req: NextRequest, { params }: { params: NotebookIdParams }) => {
    return Response.json(await findTagsByNotebookId(params.notebookId))
}