import {NextRequest} from "next/server";

import {searchForNotebooks} from "@/search/notebooks/search";

export const GET = async (req: NextRequest) => {
    const q = req.nextUrl.searchParams.get("q");
    if(!q) return Response.json([]);
    return Response.json(await searchForNotebooks(q));
}