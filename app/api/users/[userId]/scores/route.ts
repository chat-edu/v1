import {findScoresByUserId} from "@/azure/cosmos/services/user";

import {NextRequest} from "next/server";
import {UserIdParams} from "@/app/api/users/[userId]/UserIdParams";

export const GET = async (request: NextRequest, {params}: {params: UserIdParams}) => {
    const {userId} = params;
    if (!userId) {
        return Response.json([]);
    }
    return Response.json(await findScoresByUserId(userId));
}