import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import {FREE_RESPONSE_QUESTIONS_TABLE} from "@/cosmosPostgres/constants/tables";

import { FreeResponseQuestionRow, QuestionRowInput } from "@/cosmosPostgres/types";

// CREATE

export const addFreeResponseQuestion = async (question: QuestionRowInput) => {
    return add<QuestionRowInput, FreeResponseQuestionRow>(FREE_RESPONSE_QUESTIONS_TABLE, question);
};

// READ

export const getFreeResponseQuestion = async (id: number): Promise<FreeResponseQuestionRow | null> => {
    const query = 'SELECT * FROM FreeResponseQuestions WHERE id = $1;';
    return get(query, [id]);
};

// Find FreeResponseQuestions by Assignment ID
export const findFreeResponseQuestionsByAssignmentId = async (assignmentId: number): Promise<FreeResponseQuestionRow[]> => {
    const queryText = 'SELECT * FROM FreeResponseQuestions WHERE assignment_id = $1;';
    return find<FreeResponseQuestionRow>(queryText, [assignmentId]);
};

// UPDATE

export const updateFreeResponseQuestion = async (id: number, updatedFields: Partial<QuestionRowInput>): Promise<boolean> => {
    return update<Partial<QuestionRowInput>, FreeResponseQuestionRow>(FREE_RESPONSE_QUESTIONS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteFreeResponseQuestion = async (id: number) => {
    return del(FREE_RESPONSE_QUESTIONS_TABLE, [id]);
};