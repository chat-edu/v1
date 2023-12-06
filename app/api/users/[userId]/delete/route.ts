import {deleteUser} from "@/cosmosPostgres/services/user";

import {UserIdParams} from "@/app/api/users/[userId]/UserIdParams";

export const DELETE = async (request: Request, {params}: {params: UserIdParams}) => {
    return Response.json(await deleteUser(params.userId));
}