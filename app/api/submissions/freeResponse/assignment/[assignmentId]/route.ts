import {findSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";

import {AssignmentIdParams} from "@/app/api/submissions/freeResponse/assignment/[assignmentId]/AssignmentIdParams";
import {QuestionTypes} from "@/types/assignment/Question";

export const GET = async (req: Request, {params}: {params: AssignmentIdParams}) => {
    return Response.json(await findSubmissionsByAssignment(params.assignmentId, QuestionTypes.FreeResponse));
}