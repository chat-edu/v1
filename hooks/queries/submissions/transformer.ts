import {SubmissionRow} from "@/cosmosPostgres/types/submission";
import {Submission} from "@/types/Submission";

export const transformSubmission = (submission: SubmissionRow): Submission => ({
    id: submission.id,
    userId: submission.user_id,
    questionId: submission.question_id,
    answer: submission.answer,
})