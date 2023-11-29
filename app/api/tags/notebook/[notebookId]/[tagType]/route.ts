import {NextRequest} from "next/server";
import {TagTypeParams} from "@/app/api/tags/notebook/[notebookId]/[tagType]/TagTypeParams";
import {getTag} from "@/azure/cosmos/services/tags";

export const GET = async (req: NextRequest, { params }: { params: TagTypeParams }) => {
    return Response.json(await getTag(params.notebookId, params.tagType));
}