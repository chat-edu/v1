import {getUser} from "@/cosmosPostgres/services/user";

import {UserIdParams} from "@/app/api/users/[userId]/UserIdParams";

export const GET = async (request: Request, {params}: {params: UserIdParams}) => {
    return Response.json(await getUser(params.userId));
}