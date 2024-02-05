import {updateUserAssignmentSummary} from "@/cosmosPostgres/services/summaries";

import {UserIdParams} from "@/app/api/summaries/assignment/[assignmentId]/user/[userId]/UserIdParams";

export const PATCH = async (req: Request, { params }: {params: UserIdParams}) => {
    const body = await req.json()

    if (!body.summary) return new Response("Missing summary", {status: 400});

    return Response.json(await updateUserAssignmentSummary(params.userId, params.assignmentId,{
        summary: body.summary
    }))
}