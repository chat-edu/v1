import {updateUserNotebookSummary} from "@/cosmosPostgres/services/summaries";

import {UserIdParams} from "@/app/api/summaries/notebook/[notebookId]/user/[userId]/UserIdParams";

export const PATCH = async (req: Request, { params }: {params: UserIdParams}) => {
    const body = await req.json()

    if (!body.summary) return new Response("Missing summary", {status: 400});

    return Response.json(await updateUserNotebookSummary(params.userId, params.notebookId,{
        summary: body.summary
    }))
}