import {NextRequest} from "next/server";
import {searchForUsers} from "@/search/users/search";

export const GET = async (req: NextRequest) => {
    const q = req.nextUrl.searchParams.get("q");
    if(!q) return Response.json([]);
    return Response.json(await searchForUsers(q));
}