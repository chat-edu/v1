import {NextRequest} from "next/server";

import {deleteNotebookTag} from "@/azure/cosmos/services/notebookTags";

import {TagTypeParams} from "@/app/api/notebooks/[notebookId]/tags/[tagType]/TagTypeParams";

export const DELETE = async (req: NextRequest, { params }: { params: TagTypeParams }) => {
    return Response.json(await deleteNotebookTag(params.notebookId, params.tagType))
}