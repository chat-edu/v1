import {NotebookRow, RankedNotebookRow} from "@/azure/cosmos/types/notebook";

import {Notebook, RankedNotebook} from "@/types/Notebook";

export const transformNotebook = (row: NotebookRow): Notebook => ({
    id: row.id,
    name: row.name,
    userId: row.user_id,
    username: row.username,
    numNotes: parseInt(row.num_notes),
    verified: row.verified,
});

export const transformRankedNotebook = (row: RankedNotebookRow): RankedNotebook => ({
    ...transformNotebook(row),
    totalScore: parseInt(row.total_score),
    rank: parseInt(row.rank),
});