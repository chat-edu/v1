import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { MULTIPLE_CHOICE_QUESTIONS_TABLE } from "@/cosmosPostgres/constants/tables";

import { MultipleChoiceQuestionRow, MultipleChoiceQuestionRowInput } from "@/cosmosPostgres/types";

// CREATE

export const addMultipleChoiceQuestion = async (question: MultipleChoiceQuestionRowInput) => {
    return add<MultipleChoiceQuestionRowInput, MultipleChoiceQuestionRow>(MULTIPLE_CHOICE_QUESTIONS_TABLE, question);
};

// READ

export const getMultipleChoiceQuestion = async (id: number): Promise<MultipleChoiceQuestionRow | null> => {
    const query = 'SELECT * FROM MultipleChoiceQuestions WHERE id = $1;';
    return get(query, [id]);
};

// Find MultipleChoiceQuestions by Assignment ID
export const findMultipleChoiceQuestionsByAssignmentId = async (assignmentId: number): Promise<MultipleChoiceQuestionRow[]> => {
    const queryText = 'SELECT * FROM MultipleChoiceQuestions WHERE assignment_id = $1;';
    return find<MultipleChoiceQuestionRow>(queryText, [assignmentId]);
};

// UPDATE

export const updateMultipleChoiceQuestion = async (id: number, updatedFields: Partial<MultipleChoiceQuestionRowInput>): Promise<boolean> => {
    return update<Partial<MultipleChoiceQuestionRowInput>, MultipleChoiceQuestionRow>(MULTIPLE_CHOICE_QUESTIONS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteMultipleChoiceQuestion = async (id: number) => {
    return del(MULTIPLE_CHOICE_QUESTIONS_TABLE, [id]);
};