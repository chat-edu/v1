import {findUserScoreAndRank} from "@/cosmosPostgres/services/scores";

import {UserIdParams} from "@/app/api/scores/users/user/[userId]/UserIdParams";

export const GET = async (request: Request, {params}: {params: UserIdParams}) => {
    return Response.json(await findUserScoreAndRank(params.userId));
}