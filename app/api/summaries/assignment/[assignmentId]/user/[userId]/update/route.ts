import {updateUserAssignmentSummary} from "@/cosmosPostgres/services/summaries";
import {generateUserAssignmentSummary} from "@/app/api/summaries/assignment/[assignmentId]/user/[userId]/generate";

import {UserIdParams} from "@/app/api/summaries/assignment/[assignmentId]/user/[userId]/UserIdParams";

export const PATCH = async (req: Request, { params }: {params: UserIdParams}) => {
    const summary = await generateUserAssignmentSummary(params.userId, params.assignmentId)

    if(summary === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(await updateUserAssignmentSummary(params.userId, params.assignmentId,{
        summary
    }))
}