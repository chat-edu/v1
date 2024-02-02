import {findMultipleChoiceQuestionsByAssignmentId} from "@/cosmosPostgres/services/questions";

import {AssignmentIdParams} from "@/app/api/questions/multipleChoice/assignment/[assignmentId]/AssignmentIdParams";

export const GET = async (req: Request, { params }: { params: AssignmentIdParams}) => {
    return Response.json(await findMultipleChoiceQuestionsByAssignmentId(params.assignmentId))
}