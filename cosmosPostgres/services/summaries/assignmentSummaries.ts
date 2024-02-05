import { add, del, get, update } from "@/cosmosPostgres/services/base";

import { ASSIGNMENT_SUMMARIES_TABLE } from "@/cosmosPostgres/constants/tables";

import {AssignmentRow, AssignmentSummaryRow, UserAssignmentSummaryRow, UserRow} from "@/cosmosPostgres/types";

// CREATE

export const addAssignmentSummary = async (summary: AssignmentSummaryRow) => {
    return add<AssignmentSummaryRow, AssignmentSummaryRow>(ASSIGNMENT_SUMMARIES_TABLE, summary);
};

// READ

export const getAssignmentSummary = async (assignment_id: AssignmentRow["id"]): Promise<UserAssignmentSummaryRow | null> => {
    const query = `SELECT * FROM ${ASSIGNMENT_SUMMARIES_TABLE} WHERE assignment_id = $1;`;
    return get(query, [assignment_id]);
};

// UPDATE

export const updateAssignmentSummary = async (assignment_id: AssignmentRow["id"], updatedFields: Partial<UserAssignmentSummaryRow>): Promise<boolean> => {
    return update<Partial<UserAssignmentSummaryRow>, UserAssignmentSummaryRow>(ASSIGNMENT_SUMMARIES_TABLE, [assignment_id], updatedFields, ["assignment_id"]);
};

// DELETE

export const deleteAssignmentSummary = async (assignment_id: AssignmentRow["id"]) => {
    return del(ASSIGNMENT_SUMMARIES_TABLE, [assignment_id], ["assignment_id"]);
};
