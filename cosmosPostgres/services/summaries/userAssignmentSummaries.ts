import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { USER_ASSIGNMENT_SUMMARIES_TABLE } from "@/cosmosPostgres/constants/tables";

import {AssignmentRow, NotebookRow, UserAssignmentSummaryRow, UserRow} from "@/cosmosPostgres/types";

// CREATE

export const addUserAssignmentSummary = async (summary: UserAssignmentSummaryRow) => {
    return add<UserAssignmentSummaryRow, UserAssignmentSummaryRow>(USER_ASSIGNMENT_SUMMARIES_TABLE, summary);
};

// READ

export const getUserAssignmentSummary = async (user_id: UserRow["id"], assignment_id: AssignmentRow["id"]): Promise<UserAssignmentSummaryRow | null> => {
    const query = `SELECT * FROM ${USER_ASSIGNMENT_SUMMARIES_TABLE} WHERE user_id = $1 AND assignment_id = $2;`;
    return get(query, [user_id, assignment_id]);
};

// Find summaries by assignment ID
export const findUserAssignmentSummariesByAssignmentId = async (assignment_id: AssignmentRow["id"]): Promise<UserAssignmentSummaryRow[]> => {
    const queryText = `SELECT * FROM ${USER_ASSIGNMENT_SUMMARIES_TABLE} WHERE assignment_id = $1;`;
    return find<UserAssignmentSummaryRow>(queryText, [assignment_id]);
};

// find summaries by user ID
export const findUserAssignmentSummariesByUserId = async (user_id: UserRow["id"]): Promise<UserAssignmentSummaryRow[]> => {
    const queryText = `SELECT * FROM ${USER_ASSIGNMENT_SUMMARIES_TABLE} WHERE user_id = $1;`;
    return find<UserAssignmentSummaryRow>(queryText, [user_id]);
};

// find summaries by notebook ID
export const findUserAssignmentSummariesByNotebookId = async (notebook_id: NotebookRow["id"]): Promise<UserAssignmentSummaryRow[]> => {
    const queryText = `
        SELECT *
        FROM ${USER_ASSIGNMENT_SUMMARIES_TABLE}
        WHERE assignment_id IN (
            SELECT id
            FROM assignments
            WHERE notebook_id = $1
        );
    `;
    return find<UserAssignmentSummaryRow>(queryText, [notebook_id]);
};

// UPDATE

export const updateUserAssignmentSummary = async (user_id: UserRow["id"], assignment_id: AssignmentRow["id"], updatedFields: Partial<UserAssignmentSummaryRow>): Promise<boolean> => {
    return update<Partial<UserAssignmentSummaryRow>, UserAssignmentSummaryRow>(USER_ASSIGNMENT_SUMMARIES_TABLE, [user_id, assignment_id], updatedFields, ["user_id", "assignment_id"]);
};

// DELETE

export const deleteUserAssignmentSummary = async (user_id: UserRow["id"], assignment_id: AssignmentRow["id"]) => {
    return del(USER_ASSIGNMENT_SUMMARIES_TABLE, [user_id, assignment_id], ["user_id", "assignment_id"]);
};
