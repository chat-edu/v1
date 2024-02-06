import {
    GradeExplanation,
    SubmissionRow,
    SubmissionRowInput,
    SubmissionRowWithQuestion
} from "@/cosmosPostgres/types/submission";
import {add, del, find, get, update} from "@/cosmosPostgres/services/base";
import {
    FREE_RESPONSE_QUESTIONS_TABLE,
    FREE_RESPONSE_SUBMISSIONS_TABLE, MULTIPLE_CHOICE_QUESTIONS_TABLE,
    MULTIPLE_CHOICE_SUBMISSIONS_TABLE
} from "@/cosmosPostgres/constants/tables";
import {QuestionTypes} from "@/types/assignment/Question";
import {NotebookRow, UserRow} from "@/cosmosPostgres/types";

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

export const findUserSubmissionsByNotebook = async (userId: UserRow["id"], notebookId: NotebookRow["id"], questionType: QuestionTypes) => {
    const query = `
        SELECT
            s.*,
            q.question,
            q.question_number,
            a.id as assignment_id
        FROM ${questionType === QuestionTypes.FreeResponse ? FREE_RESPONSE_SUBMISSIONS_TABLE : MULTIPLE_CHOICE_SUBMISSIONS_TABLE} as s
        JOIN ${questionType === QuestionTypes.FreeResponse ? FREE_RESPONSE_QUESTIONS_TABLE : MULTIPLE_CHOICE_QUESTIONS_TABLE} as q ON s.question_id = q.id
        JOIN assignments as a ON q.assignment_id = a.id
        WHERE s.user_id = $1 AND a.topic_id IN (SELECT id FROM topics WHERE notebook_id = $2);`
    return find<SubmissionRowWithQuestion>(query, [userId, notebookId])
}