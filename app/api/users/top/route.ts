import {findAllUsersByScore} from "@/azure/cosmos/services/user";

import {NextRequest} from "next/server";

export const GET = async (req: NextRequest) => {
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');
    return Response.json(await findAllUsersByScore(limit));
}