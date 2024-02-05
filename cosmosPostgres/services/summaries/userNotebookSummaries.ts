import {add, del, find, get, update} from "@/cosmosPostgres/services/base";

import { USER_NOTEBOOK_SUMMARIES_TABLE } from "@/cosmosPostgres/constants/tables";

import {NotebookRow, UserRow, UserNotebookSummaryRow} from "@/cosmosPostgres/types";

// CREATE

export const addUserNotebookSummary = async (summary: UserNotebookSummaryRow) => {
    return add<UserNotebookSummaryRow, UserNotebookSummaryRow>(USER_NOTEBOOK_SUMMARIES_TABLE, summary);
};

// READ

export const getUserNotebookSummary = async (user_id: UserRow["id"], notebook_id: NotebookRow["id"]): Promise<UserNotebookSummaryRow | null> => {
    const query = `SELECT * FROM ${USER_NOTEBOOK_SUMMARIES_TABLE} WHERE user_id = $1 AND notebook_id = $2;`;
    return get(query, [user_id, notebook_id]);
};

export const findUserNotebookSummariesByNotebook = async (notebook_id: NotebookRow["id"]): Promise<UserNotebookSummaryRow[]> => {
    const query = `SELECT * FROM ${USER_NOTEBOOK_SUMMARIES_TABLE} WHERE notebook_id = $1;`;
    return find(query, [notebook_id]);
}

// UPDATE

export const updateUserNotebookSummary = async (user_id: UserRow["id"], notebook_id: NotebookRow["id"], updatedFields: Partial<UserNotebookSummaryRow>): Promise<boolean> => {
    return update<Partial<UserNotebookSummaryRow>, UserNotebookSummaryRow>(USER_NOTEBOOK_SUMMARIES_TABLE, [user_id, notebook_id], updatedFields, ["user_id", "notebook_id"]);
};

// DELETE

export const deleteUserNotebookSummary = async (user_id: UserRow["id"], notebook_id: NotebookRow["id"]) => {
    return del(USER_NOTEBOOK_SUMMARIES_TABLE, [user_id, notebook_id], ["user_id", "notebook_id"]);
};
