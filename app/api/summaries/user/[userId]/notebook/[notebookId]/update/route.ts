import {updateUserNotebookSummary} from "@/cosmosPostgres/services/summaries";

import {NotebookIdParams} from "@/app/api/summaries/user/[userId]/notebook/[notebookId]/NotebookIdParams";

export const PATCH = async (req: Request, { params }: {params: NotebookIdParams}) => {
    const body = await req.json()

    if (!body.summary) return new Response("Missing summary", {status: 400});

    return Response.json(await updateUserNotebookSummary(params.userId, params.notebookId,{
        summary: body.summary
    }))
}