import {SubmissionRow, SubmissionRowInput} from "@/cosmosPostgres/types/submission";
import {Submission, SubmissionInput} from "@/types/Submission";
import {QuestionTypes} from "@/types/assignment/Question";

// CREATE
export const addSubmission = async (submission: SubmissionInput, questionType: QuestionTypes) =>
    fetch(`/api/submissions/${questionType === QuestionTypes.FreeResponse ? "freeResponse" : "multipleChoice"}/create`, {
        method: "POST",
        body: JSON.stringify(transformSubmissionInput(submission)),
    })
        .then(async (res) => {
            const frqRow = await res.json() as SubmissionRow;
            if(frqRow) {
                // emitAssignmentChangedEvent(question.assignmentId);
            }
            return frqRow;
        })
        .catch(null);

// UPDATE
export const updateSubmission = async (
    submissionId: Submission["id"],
    submission: Partial<SubmissionInput>,
    questionType: QuestionTypes,
) =>
    fetch(`/api/submissions/${questionType === QuestionTypes.FreeResponse ? "freeResponse" : "multipleChoice"}/${submissionId}/update`, {
        method: "PATCH",
        body: JSON.stringify(transformPartialSubmissionInput(submission)),
    })
        .then(async res => {
            const success = await res.json() as boolean;
            if(success) {
                // emitAssignmentChangedEvent(assignmentId);
            }
            return success;
        })
        .catch(null);

// DELETE
export const deleteFreeResponseQuestion = async (submissionId: Submission["id"], questionType: QuestionTypes) =>
    fetch(`/api/submission/${questionType === QuestionTypes.FreeResponse ? "freeResponse" : "multipleChoice"}/${submissionId}/delete`, {
        method: "DELETE",
    })
        .then(async (res) => (await res.json()) as boolean)
        .catch(() => false);

const transformSubmissionInput = (submission: SubmissionInput): SubmissionRowInput => ({
    user_id: submission.userId,
    question_id: submission.questionId,
    answer: submission.answer,
})

const transformPartialSubmissionInput = (question: Partial<SubmissionInput>): Partial<SubmissionRowInput> => ({
    user_id: question.userId,
    question_id: question.questionId,
    answer: question.answer,
});