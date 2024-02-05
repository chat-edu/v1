import openai from "@/openai";

import {
    addUserNotebookSummary,
    findUserAssignmentSummariesByNotebookId,
} from "@/cosmosPostgres/services/summaries";

import {UserIdParams} from "@/app/api/summaries/notebook/[notebookId]/user/[userId]/UserIdParams";
import {generateUserNotebookSummary} from "@/app/api/summaries/notebook/[notebookId]/user/[userId]/generate";

export const POST = async (req: Request, {params}: {params: UserIdParams}) => {
    const summary = await generateUserNotebookSummary(params.notebookId, params.userId)

    if(summary === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(await addUserNotebookSummary({
        user_id: params.userId,
        notebook_id: params.notebookId,
        summary
    }))
}