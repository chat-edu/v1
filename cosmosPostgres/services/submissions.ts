import {GradeExplanation, SubmissionRow, SubmissionRowInput} from "@/cosmosPostgres/types/submission";
import {add, del, find, get, update} from "@/cosmosPostgres/services/base";
import {
    FREE_RESPONSE_QUESTIONS_TABLE,
    FREE_RESPONSE_SUBMISSIONS_TABLE, MULTIPLE_CHOICE_QUESTIONS_TABLE,
    MULTIPLE_CHOICE_SUBMISSIONS_TABLE
} from "@/cosmosPostgres/constants/tables";
import {QuestionTypes} from "@/types/assignment/Question";

export const addSubmission = async (submission: SubmissionRowInput, questionType: QuestionTypes) =>
    add<SubmissionRowInput, SubmissionRow>(
        questionType === QuestionTypes.FreeResponse
                ? FREE_RESPONSE_SUBMISSIONS_TABLE
                : MULTIPLE_CHOICE_SUBMISSIONS_TABLE, submission)

export const updateSubmission = async (id: number, updatedFields: Partial<SubmissionRowInput>, questionType: QuestionTypes) =>
    update(questionType === QuestionTypes.FreeResponse
        ? FREE_RESPONSE_SUBMISSIONS_TABLE
        : MULTIPLE_CHOICE_SUBMISSIONS_TABLE, [id], updatedFields)

export const updateSubmissionGrade = async (id: number, gradeExplanation: GradeExplanation, questionType: QuestionTypes) =>
    update(questionType === QuestionTypes.FreeResponse
        ? FREE_RESPONSE_SUBMISSIONS_TABLE
        : MULTIPLE_CHOICE_SUBMISSIONS_TABLE, [id], {
        points: gradeExplanation.points,
        grade_explanation: gradeExplanation.grade_explanation
    })

export const deleteSubmission = async (id: number, questionType: QuestionTypes) =>
    del(questionType === QuestionTypes.FreeResponse
        ? FREE_RESPONSE_SUBMISSIONS_TABLE
        : MULTIPLE_CHOICE_SUBMISSIONS_TABLE, [id])

export const getSubmission = async (id: number, questionType: QuestionTypes) => {
    const query = `SELECT * FROM ${questionType === QuestionTypes.FreeResponse ? FREE_RESPONSE_SUBMISSIONS_TABLE : MULTIPLE_CHOICE_SUBMISSIONS_TABLE} WHERE id = $1;`
    return get<SubmissionRow>(query, [id])
}

export const findSubmissionsByAssignment = async (assignmentId: number, questionType: QuestionTypes) => {
    const query = `
        SELECT *
        FROM ${questionType === QuestionTypes.FreeResponse ? FREE_RESPONSE_SUBMISSIONS_TABLE : MULTIPLE_CHOICE_SUBMISSIONS_TABLE} 
        WHERE question_id IN 
              (SELECT id 
               FROM ${questionType === QuestionTypes.FreeResponse ? FREE_RESPONSE_QUESTIONS_TABLE : MULTIPLE_CHOICE_QUESTIONS_TABLE} 
               WHERE assignment_id = $1);`
    return find(query, [assignmentId])
}

export const findUserSubmissionsByAssignment = async (userId: string, assignmentId: number, questionType: QuestionTypes) => {
    const query = `
        SELECT *
        FROM ${questionType === QuestionTypes.FreeResponse ? FREE_RESPONSE_SUBMISSIONS_TABLE : MULTIPLE_CHOICE_SUBMISSIONS_TABLE} 
        WHERE question_id IN 
              (SELECT id 
               FROM ${questionType === QuestionTypes.FreeResponse ? FREE_RESPONSE_QUESTIONS_TABLE : MULTIPLE_CHOICE_QUESTIONS_TABLE} 
               WHERE assignment_id = $1)
        AND user_id = $2;`
    return find<SubmissionRow>(query, [assignmentId, userId])
}