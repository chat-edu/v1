import {SubmissionRow} from "@/cosmosPostgres/types/submission";
import {Submission} from "@/types/Submission";
import {QuestionTypes} from "@/types/assignment/Question";

export const transformSubmission = (submission: SubmissionRow, questionType: QuestionTypes): Submission => ({
    id: submission.id,
    userId: submission.user_id,
    questionId: submission.question_id,
    answer: submission.answer,
    points: submission.points,
    gradeExplanation: submission.grade_explanation,
    questionType,
})