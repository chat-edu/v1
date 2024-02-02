import {getAssignment} from "@/cosmosPostgres/services/assignments";

import {AssignmentIdParams} from "@/app/api/assignment/[assignmentId]/AssignmentIdParams";
import {
    findFreeResponseQuestionsByAssignmentId,
    findMultipleChoiceQuestionsByAssignmentId
} from "@/cosmosPostgres/services/questions";

export const GET = async (req: Request, {params}: {params: AssignmentIdParams}) => {
    const assignment = await getAssignment(params.assignmentId);
    const [multiple_choice_questions, free_response_questions] = await Promise.all([
        findMultipleChoiceQuestionsByAssignmentId(params.assignmentId),
        findFreeResponseQuestionsByAssignmentId(params.assignmentId),
    ]);

    return Response.json({
        ...assignment,
        multiple_choice_questions,
        free_response_questions,
    })
}