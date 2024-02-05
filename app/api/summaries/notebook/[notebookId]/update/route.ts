import {updateNotebookSummary} from "@/cosmosPostgres/services/summaries/notebookSummaries";

import {NotebookIdParams} from "@/app/api/summaries/notebook/[notebookId]/NotebookIdParams";

export const PATCH = async (req: Request, { params }: {params: NotebookIdParams}) => {
    const body = await req.json()

    if (!body.summary) return new Response("Missing summary", {status: 400});

    return Response.json(await updateNotebookSummary(params.notebookId,{
        summary: body.summary
    }))
}