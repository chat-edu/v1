import {deleteSubmission, findUserSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";
import {deleteUserAssignmentSummary, getUserAssignmentSummary} from "@/cosmosPostgres/services/summaries";

import {StudentIdParams} from "@/app/api/assignment/[assignmentId]/student/[studentId]/StudentIdParams";
import {QuestionTypes} from "@/types/assignment/Question";

export const DELETE = async (req: Request, { params }: { params: StudentIdParams }) => {
    const [
        mcqSubmissions,
        frqSubmissions,
        summary
    ] = await Promise.all([
        findUserSubmissionsByAssignment(params.studentId, params.assignmentId, QuestionTypes.MultipleChoice),
        findUserSubmissionsByAssignment(params.studentId, params.assignmentId, QuestionTypes.FreeResponse),
        getUserAssignmentSummary(params.studentId, params.assignmentId)
    ]);

    await Promise.all([
        ...mcqSubmissions.map(submission => submission.id).map(id => deleteSubmission(id, QuestionTypes.MultipleChoice)),
        ...frqSubmissions.map(submission => submission.id).map(id => deleteSubmission(id, QuestionTypes.FreeResponse)),
        summary ? deleteUserAssignmentSummary(summary.user_id, summary.assignment_id) : Promise.resolve(null)
    ]);

    return Response.json({success: true});
}