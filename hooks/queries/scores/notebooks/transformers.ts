import {transformNotebookScorePartial, transformRanked} from "@/hooks/queries/scores/transformers";

import {NotebookScoreRow, RankedNotebookScoreRow} from "@/azure/cosmos/types";
import {NotebookScore, RankedNotebookScore} from "@/types/score";

export const transformNotebookScore = (row: NotebookScoreRow): NotebookScore => ({
    ...transformNotebookScorePartial(row),
    notebookName: row.notebook_name,
    authorId: row.author_id,
    authorUsername: row.author_username,
    authorVerified: row.author_verified,
    numNotes: parseInt(row.num_notes)
})

export const transformRankedNotebook = (row: RankedNotebookScoreRow): RankedNotebookScore => ({
    ...transformNotebookScore(row),
    ...transformRanked(row)
});