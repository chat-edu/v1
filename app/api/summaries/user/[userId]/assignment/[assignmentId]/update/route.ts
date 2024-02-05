import {updateUserAssignmentSummary} from "@/cosmosPostgres/services/summaries";

import {AssignmentIdParams} from "@/app/api/summaries/user/[userId]/assignment/[assignmentId]/AssignmentIdParams";

export const PATCH = async (req: Request, { params }: {params: AssignmentIdParams}) => {
    const body = await req.json()

    if (!body.summary) return new Response("Missing summary", {status: 400});

    return Response.json(await updateUserAssignmentSummary(params.userId, params.assignmentId,{
        summary: body.summary
    }))
}