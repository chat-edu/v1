import {NextRequest} from "next/server";

import {updateNotebookTag} from "@/azure/cosmos/services/notebookTags";

import {TagTypeParams} from "@/app/api/notebooks/[notebookId]/tags/[tagType]/TagTypeParams";

export const PATCH = async (req: NextRequest, { params }: { params: TagTypeParams }) => {
    const body = await req.json();

    if(!body) return Response.json({ error: 'No tag provided' });
    if(!body.tag) return Response.json({ error: 'No tag name provided' });

    return Response.json(await updateNotebookTag(params.notebookId, params.tagType, {
        tag: body.tag
    }))
}