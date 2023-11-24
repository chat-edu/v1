import {findTopNotebooks} from "@/cosmos/services/notebooks";
import {NextRequest} from "next/server";

export const GET = async (req: NextRequest) => {
    let limit = parseInt(req.nextUrl.searchParams.get('limit') || "10");
    return Response.json(await findTopNotebooks(limit));
}