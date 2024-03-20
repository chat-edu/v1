import {SubmissionIdParams} from "@/app/api/submissions/freeResponse/[submissionId]/SubmissionIdParams";
import {getSubmission, updateSubmissionGrade} from "@/cosmosPostgres/services/submissions";
import {QuestionTypes} from "@/types/assignment/Question";
import {getMultipleChoiceQuestion} from "@/cosmosPostgres/services/questions";
import {gradeMultipleChoiceQuestion} from "@/llm/openai/grading/gradeSubmission";
import {MultipleChoiceKey} from "@/types/commands/MultipleChoiceQuestion";

export const POST = async (req: Request, {params}: {params: SubmissionIdParams}) => {
    const submissionId = params.submissionId;
    const submission = await getSubmission(submissionId, QuestionTypes.MultipleChoice);
    if(!submission) {
        return new Response("No submission found", {
            status: 404
        })
    }
    const multipleChoiceQuestion = await getMultipleChoiceQuestion(submission.question_id);
    if(!multipleChoiceQuestion) {
        return new Response("No question found", {
            status: 404
        })
    }
    const gradeExplanation = await gradeMultipleChoiceQuestion(multipleChoiceQuestion,
        submission.answer as MultipleChoiceKey);

    if (!gradeExplanation) {
        return new Response("Failed to grade submission", {
            status: 500
        })
    }

    return Response.json(await updateSubmissionGrade(submissionId, gradeExplanation, QuestionTypes.MultipleChoice));
}