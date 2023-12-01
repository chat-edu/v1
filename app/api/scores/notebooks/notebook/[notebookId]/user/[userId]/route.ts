import {findScoreByUserIdAndNotebookId} from "@/cosmosPostgres/services/scores";

import {UserIdParams} from "@/app/api/scores/notebooks/notebook/[notebookId]/user/[userId]/UserIdParams";

export const GET = async (request: Request, {params}: {params: UserIdParams}) => {
    return Response.json(await findScoreByUserIdAndNotebookId(params.userId, params.notebookId));
}