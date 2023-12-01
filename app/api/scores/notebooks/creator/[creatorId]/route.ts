import {findTopNotebooksByCreatorId} from "@/cosmosPostgres/services/scores";

import {NextRequest} from "next/server";

import {CreatorIdParams} from "@/app/api/scores/notebooks/creator/[creatorId]/CreatorIdParams";

export const GET = async (request: NextRequest, { params }: { params: CreatorIdParams}) => {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");
    return Response.json(await findTopNotebooksByCreatorId(params.creatorId, limit));
}