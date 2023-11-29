import {NextRequest} from "next/server";

import {updateScore} from "@/azure/cosmos/services/scores";

export const PATCH = async (request: NextRequest) => {
    const body = await request.json();
    const {notebookId, userId, incrementAmount} = body;
    if (!notebookId || !userId || !incrementAmount) {
        return Response.json(false);
    }
    return Response.json(await updateScore(userId, notebookId, incrementAmount));
}