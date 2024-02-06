import {SubmissionRow, SubmissionRowWithQuestion} from "@/cosmosPostgres/types/submission";
import {Submission, SubmissionWithQuestion} from "@/types/Submission";
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

export const transformSubmissionWithQuestion = (submission: SubmissionRowWithQuestion, questionType: QuestionTypes): SubmissionWithQuestion => ({
    ...transformSubmission(submission, questionType),
    question: submission.question,
    questionNumber: submission.question_number,
    assignmentId: submission.assignment_id,
});