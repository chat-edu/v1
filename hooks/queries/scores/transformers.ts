import {UserScorePartialRow, NotebookScorePartialRow, ScoreRow, RankedRow} from "@/cosmosPostgres/types";
import {UserScorePartial, NotebookScorePartial, Score, Ranked} from "@/types/score";

export const transformUserScorePartial = (row: UserScorePartialRow): UserScorePartial => ({
    score: (typeof row.score === "string" ? parseInt(row.score) : row.score) || 0,
    userId: row.user_id
})

export const transformNotebookScorePartial = (row: NotebookScorePartialRow): NotebookScorePartial => ({
    score: (typeof row.score === "string" ? parseInt(row.score) : row.score) || 0,
    notebookId: row.notebook_id
});

export const transformScore = (row: ScoreRow): Score => ({
    ...transformUserScorePartial(row),
    ...transformNotebookScorePartial(row)
})

export const transformRanked = (row: RankedRow): Ranked => ({
    rank: parseInt(row.rank)
});