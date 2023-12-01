import {findCreatorScoreAndRank} from "@/cosmosPostgres/services/scores";

import {CreatorIdParams} from "@/app/api/scores/creators/[creatorId]/CreatorIdParams";

export const GET = async (request: Request, {params}: {params: CreatorIdParams}) => {
    return Response.json(await findCreatorScoreAndRank(params.creatorId));
}