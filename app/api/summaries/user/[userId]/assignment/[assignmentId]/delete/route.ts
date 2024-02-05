import {deleteUserAssignmentSummary} from "@/cosmosPostgres/services/summaries/userAssignmentSummaries";

import {AssignmentIdParams} from "@/app/api/summaries/user/[userId]/assignment/[assignmentId]/AssignmentIdParams";

export const DELETE = async (req: Request, { params }: {params: AssignmentIdParams}) => {
    return Response.json(await deleteUserAssignmentSummary(params.userId, params.assignmentId));
}