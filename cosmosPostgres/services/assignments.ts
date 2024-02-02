import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { ASSIGNMENTS_TABLE } from "@/cosmosPostgres/constants/tables";

import { AssignmentRow, AssignmentRowInput } from "@/cosmosPostgres/types";

// CREATE

export const addAssignment = async (assignment: AssignmentRowInput) => {
    return add<AssignmentRowInput, AssignmentRow>(ASSIGNMENTS_TABLE, assignment);
};

// READ

export const getAssignment = async (id: number): Promise<AssignmentRow | null> => {
    const query = 'SELECT * FROM Assignments WHERE id = $1;';
    return get(query, [id]);
};

// Find Assignments by Topic ID
export const findAssignmentsByTopicId = async (topicId: number): Promise<AssignmentRow[]> => {
    const queryText = 'SELECT * FROM Assignments WHERE topic_id = $1;';
    return find<AssignmentRow>(queryText, [topicId]);
};

// UPDATE

export const updateAssignment = async (id: number, updatedFields: Partial<AssignmentRowInput>): Promise<boolean> => {
    return update<Partial<AssignmentRowInput>, AssignmentRow>(ASSIGNMENTS_TABLE, [id], updatedFields);
};

// DELETE

export const deleteAssignment = async (id: number) => {
    return del(ASSIGNMENTS_TABLE, [id]);
};