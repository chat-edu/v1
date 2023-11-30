import {NextRequest} from "next/server";

import {findTopUsers} from "@/azure/cosmos/services/scores";

export const GET = async (req: NextRequest) => {
    let limit = parseInt(req.nextUrl.searchParams.get('limit') || "10");
    return Response.json(await findTopUsers(limit));
}