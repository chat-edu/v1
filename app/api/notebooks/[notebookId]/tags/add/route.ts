import {NextRequest} from "next/server";

import {NotebookIdParams} from "@/app/api/notebooks/[notebookId]/NotebookIdParams";
import {addNotebookTag} from "@/azure/cosmos/services/notebookTags";

export const POST = async (req: NextRequest, { params }: { params: NotebookIdParams }) => {
    const body = await req.json();

    if(!body) return Response.json({ error: 'No tag provided' });
    if(!body.tag) return Response.json({ error: 'No tag name provided' });
    if(!body.tag_type_name) return Response.json({ error: 'No tag type provided' });

    return Response.json(await addNotebookTag({
        notebook_id: params.notebookId,
        tag_type_name: body.tag_type_name,
        tag: body.tag
    }));
}