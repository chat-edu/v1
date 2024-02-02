import { findFreeResponseQuestionsByAssignmentId } from "@/cosmosPostgres/services/questions";

import { AssignmentIdParams } from "@/app/api/questions/freeResponse/assignment/[assignmentId]/AssignmentIdParams";

export const GET = async (req: Request, { params }: { params: AssignmentIdParams}) => {
    return Response.json(await findFreeResponseQuestionsByAssignmentId(params.assignmentId))
}