import {findTopNotebooksByUserId} from "@/cosmosPostgres/services/scores";

import {NextRequest} from "next/server";

import {UserIdParams} from "@/app/api/scores/notebooks/user/[userId]/UserIdParams";

export const GET = async (request: NextRequest, { params }: { params: UserIdParams}) => {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");
    return Response.json(await findTopNotebooksByUserId(params.userId, limit));
}