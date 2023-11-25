import {NextRequest} from "next/server";

import {UserIdParams} from "@/app/api/notebooks/[notebookId]/scores/[userId]/UserIdParams";
import {getScore} from "@/cosmos/services/scores";

export const GET = async (request: NextRequest, {params}: {params: UserIdParams}) => {
    const {notebookId, userId} = params;
    if (!notebookId || !userId) {
        return Response.json([]);
    }
    return Response.json(await getScore(userId, notebookId));
}