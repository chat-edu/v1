import {addUserAssignmentSummary} from "@/cosmosPostgres/services/summaries";

import {generateUserAssignmentSummary} from "@/app/api/summaries/assignment/[assignmentId]/user/[userId]/generate";

import {UserIdParams} from "@/app/api/summaries/assignment/[assignmentId]/user/[userId]/UserIdParams";

export const POST = async (req: Request, {params}: {params: UserIdParams}) => {
    const summary = await generateUserAssignmentSummary(params.userId, params.assignmentId)

    if(summary === null) {
        return Response.json({error: "No response from GPT-4"}, {status: 500});
    }

    return Response.json(await addUserAssignmentSummary({
        user_id: params.userId,
        assignment_id: params.assignmentId,
        summary
    }))
}