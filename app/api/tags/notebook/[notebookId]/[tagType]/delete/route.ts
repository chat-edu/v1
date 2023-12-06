import {NextRequest} from "next/server";

import { deleteTag } from "@/cosmosPostgres/services/tags";

import {TagTypeParams} from "@/app/api/tags/notebook/[notebookId]/[tagType]/TagTypeParams";

export const DELETE = async (req: NextRequest, { params }: { params: TagTypeParams }) => {
    return Response.json(await deleteTag(params.notebookId, params.tagType));
}