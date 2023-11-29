import {UserScorePartialRow, NotebookScorePartialRow, ScoreRow, RankedRow} from "@/azure/cosmos/types";
import {UserScorePartial, NotebookScorePartial, Score, Ranked} from "@/types/score";

export const transformUserScorePartial = (row: UserScorePartialRow): UserScorePartial => ({
    score: row.score,
    userId: row.user_id
})

export const transformNotebookScorePartial = (row: NotebookScorePartialRow): NotebookScorePartial => ({
    score: row.score,
    notebookId: row.notebook_id
});

export const transformScore = (row: ScoreRow): Score => ({
    ...transformUserScorePartial(row),
    ...transformNotebookScorePartial(row)
})

export const transformRanked = (row: RankedRow): Ranked => ({
    rank: parseInt(row.rank)
});