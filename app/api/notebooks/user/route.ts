import {findNotebooksByUserId} from "@/cosmos/services/notebooks";
import {NextRequest} from "next/server";

export const GET = async (request: NextRequest) => {
    const userId = request.nextUrl.searchParams.get("userId");
    if(!userId) return Response.json([]);
    return Response.json(await findNotebooksByUserId(userId));
}