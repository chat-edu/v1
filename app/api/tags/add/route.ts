import {NextRequest} from "next/server";

import {addTag} from "@/cosmosPostgres/services/tags";
import {TagRow} from "@/cosmosPostgres/types";

export const POST = async (req: NextRequest) => {
    const body = await req.json() as TagRow;

    if(!body) return Response.json({ error: 'No tag provided' });
    if(!body.tag) return Response.json({ error: 'No tag name provided' });
    if(!body.tag_type_name) return Response.json({ error: 'No tag type provided' });
    if(!body.notebook_id) return Response.json({ error: 'No notebook id provided' });

    return Response.json(await addTag(body));
}