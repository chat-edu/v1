import {NextRequest} from "next/server";

import {updateScore} from "@/cosmosPostgres/services/scores";

export const PATCH = async (request: NextRequest) => {
    const body = await request.json();
    const {notebook_id, user_id, increment_amount} = body;
    if (!notebook_id || !user_id || !increment_amount) {
        return Response.json(false);
    }
    return Response.json(await updateScore(user_id, notebook_id, increment_amount));
}