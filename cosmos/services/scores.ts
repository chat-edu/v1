import {add, del, find, get, update} from "@/cosmos/services/base";

import { SCORES_TABLE } from "@/cosmos/constants/tables";

import {Score, ScoreRow, ScoreRowInput} from "@/types/Score";

// Find Scores
export const findAllScores = async (): Promise<Score[]> => {
    const queryText = 'SELECT * FROM Scores;';
    return find<ScoreRow, Score>(queryText, [], transformScore);
};

// Add Score
export const addScore = async (score: ScoreRowInput): Promise<boolean> => {
    return add(SCORES_TABLE, score);
};

// Update Score
export const updateScore = async (userId: string, notebookId: number, newScore: number): Promise<boolean> => {
    return update(SCORES_TABLE, [userId, notebookId], {score: newScore});
};

// Get Score by User ID and Notebook ID
export const getScore = async (userId: string, notebookId: number): Promise<Score | null> => {
    const queryText = 'SELECT * FROM Scores WHERE user_id = $1 AND notebook_id = $2;';
    return get<ScoreRow, Score>(queryText, [userId, notebookId], transformScore);
};

// Delete Score
export const deleteScore = async (userId: string, notebookId: number): Promise<boolean> => {
    const queryText = 'DELETE FROM Scores WHERE user_id = $1 AND notebook_id = $2;';
    return del(queryText, [userId, notebookId]);
};

// Transform function to convert database rows to Score type
const transformScore = (row: ScoreRow): Score => ({
    id: row.id,
    userId: row.user_id,
    notebookId: row.notebook_id,
    score: row.score
});
