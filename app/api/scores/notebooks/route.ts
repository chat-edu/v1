import {NextRequest} from "next/server";

import {findTopNotebooks} from "@/cosmosPostgres/services/scores";
export const GET = async (req: NextRequest) => {
    let limit = parseInt(req.nextUrl.searchParams.get('limit') || "10");
    return Response.json(await findTopNotebooks(limit));
}