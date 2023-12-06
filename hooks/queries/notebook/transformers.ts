import {NotebookRow} from "@/cosmosPostgres/types";

import {Notebook} from "@/types/Notebook";

export const transformNotebook = (row: NotebookRow): Notebook => ({
    id: row.id,
    name: row.name,
    userId: row.user_id,
    username: row.username,
    numNotes: parseInt(row.num_notes),
    verified: row.verified,
});