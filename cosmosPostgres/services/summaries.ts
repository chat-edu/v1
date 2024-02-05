import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { ASSIGNMENT_SUMMARIES_TABLE } from "@/cosmosPostgres/constants/tables";

import {AssignmentRow, AssignmentSummaryRow, UserRow} from "@/cosmosPostgres/types";

// CREATE

export const addSummary = async (summary: AssignmentSummaryRow) => {
    return add<AssignmentSummaryRow, AssignmentSummaryRow>(ASSIGNMENT_SUMMARIES_TABLE, summary);
};

// READ

export const getSummary = async (user_id: UserRow["id"], assignment_id: AssignmentRow["id"]): Promise<AssignmentSummaryRow | null> => {
    const query = 'SELECT * FROM AssignmentSummaries WHERE user_id = $1 AND assignment_id = $2;';
    return get(query, [user_id, assignment_id]);
};

// Find summaries by assignment ID
export const findSummariesByAssignmentId = async (assignment_id: AssignmentRow["id"]): Promise<AssignmentSummaryRow[]> => {
    const queryText = 'SELECT * FROM AssignmentSummaries WHERE assignment_id = $1;';
    return find<AssignmentSummaryRow>(queryText, [assignment_id]);
};

// find summaries by user ID
export const findSummariesByUserId = async (user_id: UserRow["id"]): Promise<AssignmentSummaryRow[]> => {
    const queryText = 'SELECT * FROM AssignmentSummaries WHERE user_id = $1;';
    return find<AssignmentSummaryRow>(queryText, [user_id]);
};

// UPDATE

export const updateSummary = async (user_id: UserRow["id"], assignment_id: AssignmentRow["id"], updatedFields: Partial<AssignmentSummaryRow>): Promise<boolean> => {
    return update<Partial<AssignmentSummaryRow>, AssignmentSummaryRow>(ASSIGNMENT_SUMMARIES_TABLE, [user_id, assignment_id], updatedFields, ["user_id", "assignment_id"]);
};

// DELETE

export const deleteSummary = async (user_id: UserRow["id"], assignment_id: AssignmentRow["id"]) => {
    return del(ASSIGNMENT_SUMMARIES_TABLE, [user_id, assignment_id], ["user_id", "assignment_id"]);
};
