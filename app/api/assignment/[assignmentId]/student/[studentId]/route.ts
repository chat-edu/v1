import {StudentIdParams} from "@/app/api/assignment/[assignmentId]/student/[studentId]/StudentIdParams";
import {deleteSubmission, findUserSubmissionsByAssignment} from "@/cosmosPostgres/services/submissions";
import {QuestionTypes} from "@/types/assignment/Question";
import {deleteSummary, getSummary} from "@/cosmosPostgres/services/summaries";

export const DELETE = async (req: Request, { params }: { params: StudentIdParams }) => {
    const [
        mcqSubmissions,
        frqSubmissions,
        summary
    ] = await Promise.all([
        findUserSubmissionsByAssignment(params.studentId, params.assignmentId, QuestionTypes.MultipleChoice),
        findUserSubmissionsByAssignment(params.studentId, params.assignmentId, QuestionTypes.FreeResponse),
        getSummary(params.studentId, params.assignmentId)
    ]);

    await Promise.all([
        ...mcqSubmissions.map(submission => submission.id).map(id => deleteSubmission(id, QuestionTypes.MultipleChoice)),
        ...frqSubmissions.map(submission => submission.id).map(id => deleteSubmission(id, QuestionTypes.FreeResponse)),
        summary ? deleteSummary(summary.user_id, summary.assignment_id) : Promise.resolve(null)
    ]);

    return Response.json({success: true});
}