import {getPool} from "@/azure/cosmos/citus";
import {del, find, get} from "@/azure/cosmos/services/base";

import {Score, ScoreRow, UserScore, UserScoreRow} from "@/types/Score";

// Find Scores
export const findAllScores = async (): Promise<Score[]> => {
    const queryText = `SELECT * FROM Scores;`;
    return find(queryText, [], transformScore);
};

export const findScoresByNotebookId = async (notebookId: number): Promise<UserScore[]> => {
    const queryText = `
        SELECT Scores.*, Users.username
        FROM Scores
        INNER JOIN Users ON Scores.user_id = Users.id
        WHERE notebook_id = $1
        ORDER BY score DESC;
    `;
    return find(queryText, [notebookId], transformUserScore);
}

export const updateScore = async (userId: string, notebookId: number, incrementAmount: number): Promise<boolean> => {
    const client = await getPool().connect();
    try {
        const queryText = `
            INSERT INTO Scores (user_id, notebook_id, score)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, notebook_id)
            DO UPDATE SET score = Scores.score + EXCLUDED.score;
        `;
        await client.query(queryText, [userId, notebookId, incrementAmount]);
        return true;
    } catch (error) {
        console.error('Error in updateScore operation:', error);
        return false;
    } finally {
        client.release();
    }
};

// Get Score by User ID and Notebook ID
export const getScore = async (userId: string, notebookId: number): Promise<Score | null> => {
    const query = 'SELECT * FROM Scores WHERE user_id = $1 AND notebook_id = $2;';
    return get(query, [userId, notebookId], transformScore);
};

// Delete Score
export const deleteScore = async (userId: string, notebookId: number): Promise<boolean> => {
    const queryText = 'DELETE FROM Scores WHERE user_id = $1 AND notebook_id = $2;';
    return del(queryText, [userId, notebookId]);
};

// Transform function to convert database rows to Score type
const transformScore = (row: ScoreRow): Score => ({
    userId: row.user_id,
    notebookId: row.notebook_id,
    score: row.score
});

const transformUserScore = (row: UserScoreRow): UserScore => ({
    ...transformScore(row),
    username: row.username
})
