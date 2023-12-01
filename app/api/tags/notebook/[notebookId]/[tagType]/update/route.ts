import {NextRequest} from "next/server";

import {updateTag} from "@/cosmosPostgres/services/tags";

import {TagTypeParams} from "@/app/api/tags/notebook/[notebookId]/[tagType]/TagTypeParams";

export const PATCH = async (req: NextRequest, { params }: { params: TagTypeParams }) => {
    const body = await req.json();

    if(!body) return Response.json({ error: 'No tag provided' });
    if(!body.tag) return Response.json({ error: 'No tag name provided' });

    return Response.json(await updateTag(params.notebookId, params.tagType, {
        tag: body.tag
    }));
}