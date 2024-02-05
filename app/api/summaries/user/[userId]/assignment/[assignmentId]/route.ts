import {getUserAssignmentSummary} from "@/cosmosPostgres/services/summaries/userAssignmentSummaries";

import {AssignmentIdParams} from "@/app/api/summaries/user/[userId]/assignment/[assignmentId]/AssignmentIdParams";

export const GET = async (req: Request, { params }: {params: AssignmentIdParams}) => {
    return Response.json(await getUserAssignmentSummary(params.userId, params.assignmentId));
}