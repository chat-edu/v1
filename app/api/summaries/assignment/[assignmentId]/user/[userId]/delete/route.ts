import {deleteUserAssignmentSummary} from "@/cosmosPostgres/services/summaries/userAssignmentSummaries";

import {UserIdParams} from "@/app/api/summaries/assignment/[assignmentId]/user/[userId]/UserIdParams";

export const DELETE = async (req: Request, { params }: {params: UserIdParams}) => {
    return Response.json(await deleteUserAssignmentSummary(params.userId, params.assignmentId));
}