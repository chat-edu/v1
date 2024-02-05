import {updateUserNotebookSummary} from "@/cosmosPostgres/services/summaries";

import {UserIdParams} from "@/app/api/summaries/notebook/[notebookId]/user/[userId]/UserIdParams";
import {generateUserNotebookSummary} from "@/app/api/summaries/notebook/[notebookId]/user/[userId]/generate";

export const PATCH = async (req: Request, { params }: {params: UserIdParams}) => {
    const summary = await generateUserNotebookSummary(params.notebookId, params.userId)

    if(summary === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(await updateUserNotebookSummary(params.userId, params.notebookId,{
        summary
    }))
}