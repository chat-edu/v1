import {getSubmission, updateSubmissionGrade} from "@/cosmosPostgres/services/submissions";
import {getFreeResponseQuestion} from "@/cosmosPostgres/services/questions";
import {gradeFreeResponseQuestion} from "@/openai/grading/gradeSubmission";

import {SubmissionIdParams} from "@/app/api/submissions/freeResponse/[submissionId]/SubmissionIdParams";
import {QuestionTypes} from "@/types/assignment/Question";
import {MultipleChoiceKey} from "@/types/commands/MultipleChoiceQuestion";

export const POST = async (req: Request, {params}: {params: SubmissionIdParams}) => {
    const submissionId = params.submissionId;
    const submission = await getSubmission(submissionId, QuestionTypes.FreeResponse);
    if(!submission) {
        return new Response("No submission found", {
            status: 404
        })
    }
    const freeResponseQuestion = await getFreeResponseQuestion(submission.question_id);
    if(!freeResponseQuestion) {
        return new Response("No question found", {
            status: 404
        })
    }
    const gradeExplanation = await gradeFreeResponseQuestion(freeResponseQuestion,
        submission.answer as MultipleChoiceKey);

    if (!gradeExplanation) {
        return new Response("Failed to grade submission", {
            status: 500
        })
    }

    return Response.json(await updateSubmissionGrade(submissionId, gradeExplanation, QuestionTypes.FreeResponse));
}