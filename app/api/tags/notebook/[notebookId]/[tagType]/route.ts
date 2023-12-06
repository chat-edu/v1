import {NextRequest} from "next/server";
import {TagTypeParams} from "@/app/api/tags/notebook/[notebookId]/[tagType]/TagTypeParams";
import {getTag} from "@/cosmosPostgres/services/tags";

export const GET = async (req: NextRequest, { params }: { params: TagTypeParams }) => {
    return Response.json(await getTag(params.notebookId, params.tagType));
}