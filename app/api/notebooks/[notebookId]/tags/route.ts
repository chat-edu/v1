import {NextRequest} from "next/server";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";

import {findNotebookTagsByNotebookId} from "@/azure/cosmos/services/notebookTags";

export const GET = async (req: NextRequest, { params }: { params: NotebookIdParams }) => {
    return Response.json(await findNotebookTagsByNotebookId(params.notebookId))
}