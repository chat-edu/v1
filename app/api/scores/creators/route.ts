import {NextRequest} from "next/server";

import {findTopCreators} from "@/azure/cosmos/services/scores";

export const GET = async (req: NextRequest) => {
    let limit = parseInt(req.nextUrl.searchParams.get('limit') || "10");
    return Response.json(await findTopCreators(limit));
}