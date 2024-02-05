import {getUserAssignmentSummary} from "@/cosmosPostgres/services/summaries/userAssignmentSummaries";

import {UserIdParams} from "@/app/api/summaries/assignment/[assignmentId]/user/[userId]/UserIdParams";

export const GET = async (req: Request, { params }: {params: UserIdParams}) => {
    return Response.json(await getUserAssignmentSummary(params.userId, params.assignmentId));
}