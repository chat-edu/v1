import { add, del, find, get, update } from "@/cosmosPostgres/services/base";

import { NOTEBOOK_SUMMARIES_TABLE } from "@/cosmosPostgres/constants/tables";

import {NotebookRow, NotebookSummaryRow} from "@/cosmosPostgres/types";

// CREATE

export const addNotebookSummary = async (summary: NotebookSummaryRow) => {
    return add<NotebookSummaryRow, NotebookSummaryRow>(NOTEBOOK_SUMMARIES_TABLE, summary);
};

// READ

export const getNotebookSummary = async (notebook_id: NotebookRow["id"]): Promise<NotebookSummaryRow | null> => {
    const query = `SELECT * FROM ${NOTEBOOK_SUMMARIES_TABLE} WHERE notebook_id = $1;`;
    return get(query, [notebook_id]);
};

// UPDATE

export const updateNotebookSummary = async (notebook_id: NotebookRow["id"], updatedFields: Partial<NotebookSummaryRow>): Promise<boolean> => {
    return update<Partial<NotebookSummaryRow>, NotebookSummaryRow>(NOTEBOOK_SUMMARIES_TABLE, [notebook_id], updatedFields, ["notebook_id"]);
};

// DELETE

export const deleteNotebookSummary = async (notebook_id: NotebookRow["id"]) => {
    return del(NOTEBOOK_SUMMARIES_TABLE, [notebook_id], ["notebook_id"]);
};
